import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { validateUrlSsrf, fetchSafeWithSsrfRedirects } from './utils/ssrf-validator';
import { detectTechnologies } from './utils/tech-detector';
import { analyzeUxAndCro } from './utils/ux-analyzer';
import { generateAuditPdf } from './utils/pdf-generator';
import { AuditStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

import { runLocalLighthouseAudit, LighthouseMetricResult } from './utils/lighthouse-runner';

export type PageSpeedMetricResult = LighthouseMetricResult;

@Injectable()
export class WebsiteAuditService {
  private readonly logger = new Logger(WebsiteAuditService.name);

  constructor(private prisma: PrismaService) {}

  async createAudit(dto: CreateAuditDto) {
    // 1. SSRF Validation for Main URL
    const targetSsrf = await validateUrlSsrf(dto.url);
    if (!targetSsrf.isValid || !targetSsrf.normalizedUrl) {
      throw new BadRequestException(targetSsrf.error || 'Invalid target website URL.');
    }

    // 2. SSRF Validation for Competitor URL if supplied
    let normalizedCompetitorUrl: string | undefined = undefined;
    if (dto.competitorUrl && dto.competitorUrl.trim().length > 0) {
      const compSsrf = await validateUrlSsrf(dto.competitorUrl);
      if (!compSsrf.isValid || !compSsrf.normalizedUrl) {
        throw new BadRequestException(`Competitor URL error: ${compSsrf.error}`);
      }
      normalizedCompetitorUrl = compSsrf.normalizedUrl;
    }

    const auditId = `audit_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
    const targetUrl = targetSsrf.normalizedUrl;

    const record = await this.prisma.websiteAudit.create({
      data: {
        auditId,
        url: targetUrl,
        competitorUrl: normalizedCompetitorUrl,
        email: dto.email || null,
        status: AuditStatus.PENDING,
      },
    });

    // Run audit asynchronously in background
    this.processAudit(auditId, targetUrl, normalizedCompetitorUrl).catch(err => {
      this.logger.error(`Audit processing failed for ${auditId}: ${err.message}`, err.stack);
    });

    return {
      auditId: record.auditId,
      url: record.url,
      competitorUrl: record.competitorUrl,
      status: record.status,
      message: 'Audit initiated successfully. Poll /api/website-audit/:auditId for real-time progress.',
    };
  }

  async getAuditStatus(auditId: string) {
    const record = await this.prisma.websiteAudit.findUnique({
      where: { auditId },
    });

    if (!record) {
      throw new NotFoundException(`Audit with ID ${auditId} not found.`);
    }

    return {
      auditId: record.auditId,
      url: record.url,
      competitorUrl: record.competitorUrl,
      status: record.status,
      overallScore: record.overallScore,
      grade: record.grade,
      report: record.reportJson,
      errorMessage: record.errorMessage,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      completedAt: record.completedAt,
    };
  }

  async getAuditPdf(auditId: string): Promise<Buffer> {
    const record = await this.prisma.websiteAudit.findUnique({
      where: { auditId },
    });

    if (!record || record.status !== AuditStatus.COMPLETED || !record.reportJson) {
      throw new BadRequestException('Audit report is not ready or failed to complete.');
    }

    return generateAuditPdf(record.reportJson);
  }

  private async updateStatus(auditId: string, status: AuditStatus) {
    await this.prisma.websiteAudit.update({
      where: { auditId },
      data: { status },
    });
  }

  private async processAudit(auditId: string, url: string, competitorUrl?: string) {
    this.logger.log(`[Audit ${auditId}] Background audit process started for target: ${url}`);
    try {
      // Stage 1: FETCHING_WEBSITE with redirect-safe SSRF validation
      this.logger.log(`[Audit ${auditId}] Stage 1: Fetching website structure & checking SSRF...`);
      await this.updateStatus(auditId, AuditStatus.FETCHING_WEBSITE);
      const mainFetch = await fetchSafeWithSsrfRedirects(url, { timeoutMs: 12000, maxRedirects: 5 });

      // Stage 2: PERFORMANCE_ANALYSIS (Mobile & Desktop Lighthouse)
      await this.updateStatus(auditId, AuditStatus.PERFORMANCE_ANALYSIS);

      this.logger.log(`[Audit ${auditId}] Stage 2: Lighthouse mobile started...`);
      const mobilePerf = await this.runPageSpeedAudit(mainFetch.finalUrl, 'mobile');
      if (mobilePerf.status === 'SUCCESS') {
        this.logger.log(`[Audit ${auditId}] Stage 2: Lighthouse mobile completed (Score: ${mobilePerf.score})`);
      } else {
        this.logger.warn(`[Audit ${auditId}] Stage 2: Lighthouse mobile failed: ${mobilePerf.error}`);
      }

      this.logger.log(`[Audit ${auditId}] Stage 2: Lighthouse desktop started...`);
      const desktopPerf = await this.runPageSpeedAudit(mainFetch.finalUrl, 'desktop');
      if (desktopPerf.status === 'SUCCESS') {
        this.logger.log(`[Audit ${auditId}] Stage 2: Lighthouse desktop completed (Score: ${desktopPerf.score})`);
      } else {
        this.logger.warn(`[Audit ${auditId}] Stage 2: Lighthouse desktop failed: ${desktopPerf.error}`);
      }

      const targetPerfScore = this.calculatePerformanceCategoryScore(mobilePerf.score, desktopPerf.score);

      // Stage 3: SEO_ANALYSIS
      this.logger.log(`[Audit ${auditId}] Stage 3: SEO analysis started...`);
      await this.updateStatus(auditId, AuditStatus.SEO_ANALYSIS);
      const seoResult = await this.analyzeSeo(mainFetch.html, mainFetch.headers, mainFetch.finalUrl);

      // Stage 4: MOBILE_ANALYSIS
      this.logger.log(`[Audit ${auditId}] Stage 4: Mobile analysis started...`);
      await this.updateStatus(auditId, AuditStatus.MOBILE_ANALYSIS);
      const mobileResult = this.analyzeMobile(mainFetch.html, mobilePerf);

      // Stage 5: ACCESSIBILITY_ANALYSIS
      this.logger.log(`[Audit ${auditId}] Stage 5: Accessibility analysis started...`);
      await this.updateStatus(auditId, AuditStatus.ACCESSIBILITY_ANALYSIS);
      const accessibilityResult = this.analyzeAccessibility(mainFetch.html);
      const targetAccessibilityScore = this.calculateAccessibilityCategoryScore(
        mobilePerf.accessibilityScore,
        desktopPerf.accessibilityScore
      );

      // Stage 6: SECURITY_ANALYSIS
      this.logger.log(`[Audit ${auditId}] Stage 6: Security analysis started...`);
      await this.updateStatus(auditId, AuditStatus.SECURITY_ANALYSIS);
      const securityResult = this.analyzeSecurity(mainFetch.finalUrl, mainFetch.headers);

      // Stage 7: TECH_STACK_DETECTION
      this.logger.log(`[Audit ${auditId}] Stage 7: Technology stack detection started...`);
      await this.updateStatus(auditId, AuditStatus.TECH_STACK_DETECTION);
      const detectedTech = detectTechnologies(mainFetch.html, mainFetch.headers);

      // Stage 8: AI_READINESS_ANALYSIS
      this.logger.log(`[Audit ${auditId}] Stage 8: AI readiness analysis started...`);
      await this.updateStatus(auditId, AuditStatus.AI_READINESS_ANALYSIS);
      const aiReadinessResult = await this.analyzeAiReadiness(mainFetch.finalUrl, mainFetch.html);

      // Stage 9: AUTOMATED UX & CRO ANALYSIS
      const uxResult = analyzeUxAndCro(mainFetch.html);

      // Stage 10: COMPETITOR_ANALYSIS (if supplied)
      let competitorReport: any = null;
      if (competitorUrl) {
        this.logger.log(`[Audit ${auditId}] Stage 10: Competitor analysis started for ${competitorUrl}...`);
        await this.updateStatus(auditId, AuditStatus.COMPETITOR_ANALYSIS);
        try {
          const compFetch = await fetchSafeWithSsrfRedirects(competitorUrl, { timeoutMs: 12000, maxRedirects: 5 });
          const compMobilePerf = await this.runPageSpeedAudit(compFetch.finalUrl, 'mobile');
          const compDesktopPerf = await this.runPageSpeedAudit(compFetch.finalUrl, 'desktop');
          const compSeo = await this.analyzeSeo(compFetch.html, compFetch.headers, compFetch.finalUrl);
          const compMobile = this.analyzeMobile(compFetch.html, compMobilePerf);
          const compSec = this.analyzeSecurity(compFetch.finalUrl, compFetch.headers);
          const compAi = await this.analyzeAiReadiness(compFetch.finalUrl, compFetch.html);
          const compUx = analyzeUxAndCro(compFetch.html);

          const compPerfScore = this.calculatePerformanceCategoryScore(compMobilePerf.score, compDesktopPerf.score);
          const compAccessibilityScore = this.calculateAccessibilityCategoryScore(
            compMobilePerf.accessibilityScore,
            compDesktopPerf.accessibilityScore
          );

          const compCategoryScores = {
            performanceMobile: compMobilePerf.score,
            performanceDesktop: compDesktopPerf.score,
            performance: compPerfScore,
            seo: compSeo.score,
            mobile: compMobile.score,
            ux: compUx.score,
            security: compSec.score,
            accessibility: compAccessibilityScore,
            aiReadiness: compAi.score,
          };

          const compOverall = this.calculateOverallScore(compCategoryScores);

          competitorReport = {
            url: competitorUrl,
            status: 'COMPLETED',
            overallScore: compOverall.score,
            grade: compOverall.grade,
            categories: compCategoryScores,
            performance: {
              mobile: compMobilePerf,
              desktop: compDesktopPerf,
            },
            ux: compUx,
          };
        } catch (err: any) {
          this.logger.warn(`[Audit ${auditId}] Competitor analysis failed for ${competitorUrl}: ${err.message}`);
          competitorReport = {
            url: competitorUrl,
            status: 'UNAVAILABLE',
            reason: `Competitor site was unavailable or blocked automated measurement (${err.message})`,
          };
        }
      }

      // Stage 11: GENERATING_REPORT
      this.logger.log(`[Audit ${auditId}] Stage 11: Report generation started...`);
      await this.updateStatus(auditId, AuditStatus.GENERATING_REPORT);

      const categoryScores = {
        performanceMobile: mobilePerf.score,
        performanceDesktop: desktopPerf.score,
        performance: targetPerfScore,
        seo: seoResult.score,
        mobile: mobileResult.score,
        ux: uxResult.score,
        security: securityResult.score,
        accessibility: targetAccessibilityScore,
        aiReadiness: aiReadinessResult.score,
      };

      const overall = this.calculateOverallScore(categoryScores);

      const allChecks = [
        ...seoResult.checks,
        ...mobileResult.checks,
        ...securityResult.checks,
        ...aiReadinessResult.checks,
        ...uxResult.checks,
        ...accessibilityResult.checks,
      ];

      const failedChecks = allChecks.filter(c => c.status === 'FAIL');
      const warningChecks = allChecks.filter(c => c.status === 'WARN');

      const recommendations = [
        ...failedChecks.map(c => ({ severity: 'HIGH', title: c.title, fix: c.recommendation || c.detail })),
        ...warningChecks.map(c => ({ severity: 'MEDIUM', title: c.title, fix: c.recommendation || c.detail })),
      ].slice(0, 5);

      const reportJson = {
        auditId,
        url: mainFetch.finalUrl,
        competitorUrl,
        timestamp: new Date().toISOString(),
        overallScore: overall.score,
        grade: overall.grade,
        categories: categoryScores,
        performance: {
          mobile: mobilePerf,
          desktop: desktopPerf,
        },
        seo: seoResult,
        mobile: mobileResult,
        security: securityResult,
        accessibility: {
          score: targetAccessibilityScore,
          isMeasured: targetAccessibilityScore !== null,
          checks: accessibilityResult.checks,
        },
        aiReadiness: aiReadinessResult,
        ux: uxResult,
        technologyStack: detectedTech,
        checks: allChecks,
        recommendations,
        competitorComparison: competitorReport
          ? {
              targetScore: overall.score,
              competitorScore: competitorReport.overallScore ?? null,
              delta: competitorReport.overallScore !== null && overall.score !== null ? overall.score - competitorReport.overallScore : null,
              details: competitorReport,
            }
          : null,
      };

      this.logger.log(`[Audit ${auditId}] Stage 12: Database completion - Audit ${auditId} COMPLETED successfully.`);
      await this.prisma.websiteAudit.update({
        where: { auditId },
        data: {
          status: AuditStatus.COMPLETED,
          overallScore: overall.score,
          grade: overall.grade,
          reportJson: reportJson as any,
          completedAt: new Date(),
        },
      });
    } catch (err: any) {
      const errorMsg = err.message || 'Audit encountered an unexpected failure.';
      this.logger.error(`[Audit ${auditId}] Audit FAILED: ${errorMsg}`, err.stack);
      try {
        await this.prisma.websiteAudit.update({
          where: { auditId },
          data: {
            status: AuditStatus.FAILED,
            errorMessage: errorMsg,
          },
        });
      } catch (dbErr: any) {
        this.logger.error(`[Audit ${auditId}] Failed to set FAILED status in DB: ${dbErr.message}`);
      }
    }
  }

  private calculatePerformanceCategoryScore(mobileScore: number | null, desktopScore: number | null): number | null {
    if (mobileScore !== null && desktopScore !== null) {
      return Math.round((mobileScore + desktopScore) / 2);
    }
    if (mobileScore !== null) return mobileScore;
    if (desktopScore !== null) return desktopScore;
    return null;
  }

  private calculateAccessibilityCategoryScore(mobileAccessScore: number | null, desktopAccessScore: number | null): number | null {
    if (mobileAccessScore !== null && desktopAccessScore !== null) {
      return Math.round((mobileAccessScore + desktopAccessScore) / 2);
    }
    if (mobileAccessScore !== null) return mobileAccessScore;
    if (desktopAccessScore !== null) return desktopAccessScore;
    return null;
  }

  private async runPageSpeedAudit(url: string, strategy: 'mobile' | 'desktop'): Promise<PageSpeedMetricResult> {
    return runLocalLighthouseAudit(url, strategy);
  }

  private async analyzeSeo(html: string, headers: Record<string, string>, url: string) {
    const checks: any[] = [];
    let score = 100;

    // 1. Title Tag & Length
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;
    if (!title) {
      checks.push({ status: 'FAIL', title: 'Missing Title Tag', recommendation: 'Add a descriptive <title> tag between 30-60 characters.' });
      score -= 20;
    } else if (title.length < 10 || title.length > 70) {
      checks.push({ status: 'WARN', title: 'Suboptimal Title Length', detail: `Length: ${title.length} chars`, recommendation: 'Keep title tag length between 30-60 characters for optimal search display.' });
      score -= 5;
    } else {
      checks.push({ status: 'PASS', title: 'Title Tag Configured', detail: `Title: "${title}" (${title.length} chars)` });
    }

    // 2. Meta Description Tag & Length
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
    const metaDesc = descMatch ? descMatch[1].trim() : null;
    if (!metaDesc) {
      checks.push({ status: 'FAIL', title: 'Missing Meta Description', recommendation: 'Add a compelling meta description between 120-160 characters.' });
      score -= 20;
    } else if (metaDesc.length < 50 || metaDesc.length > 160) {
      checks.push({ status: 'WARN', title: 'Suboptimal Meta Description Length', detail: `Length: ${metaDesc.length} chars`, recommendation: 'Keep meta description length between 120-160 characters.' });
      score -= 5;
    } else {
      checks.push({ status: 'PASS', title: 'Meta Description Configured', detail: `${metaDesc.length} chars` });
    }

    // 3. H1 Heading & Hierarchy
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const h2Matches = html.match(/<h2[^>]*>/gi) || [];
    if (h1Matches.length === 0) {
      checks.push({ status: 'FAIL', title: 'Missing H1 Heading Tag', recommendation: 'Include exactly one primary <h1> heading tag on the page.' });
      score -= 15;
    } else if (h1Matches.length > 1) {
      checks.push({ status: 'WARN', title: 'Multiple H1 Heading Tags', detail: `Found ${h1Matches.length} H1 tags.`, recommendation: 'Use a single <h1> for main page headline and <h2>/<h3> for sub-sections.' });
      score -= 5;
    } else {
      checks.push({ status: 'PASS', title: 'Single H1 Heading Tag Present', detail: `Heading hierarchy includes 1 H1 tag and ${h2Matches.length} H2 tags.` });
    }

    // 4. Canonical Tag & URL Validity
    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || html.match(/<link\s+href="([^"]*)"\s+rel="canonical"/i);
    if (!canonicalMatch) {
      checks.push({ status: 'WARN', title: 'Missing Canonical Tag', recommendation: 'Add <link rel="canonical" href="..."> to prevent duplicate content indexing.' });
      score -= 10;
    } else {
      const canonicalUrlStr = canonicalMatch[1].trim();
      let isValidUrl = false;
      try {
        new URL(canonicalUrlStr, url);
        isValidUrl = true;
      } catch {}
      if (isValidUrl) {
        checks.push({ status: 'PASS', title: 'Canonical Tag Present', detail: `Canonical URL: "${canonicalUrlStr}"` });
      } else {
        checks.push({ status: 'WARN', title: 'Invalid Canonical URL Syntax', detail: `Href: "${canonicalUrlStr}"`, recommendation: 'Provide a valid absolute URL for the canonical tag.' });
        score -= 5;
      }
    }

    // 5. Robots Meta / Noindex Signals
    const robotsMeta = html.match(/<meta\s+name="(robots|googlebot)"\s+content="([^"]*)"/i);
    if (robotsMeta && (robotsMeta[2].toLowerCase().includes('noindex') || robotsMeta[2].toLowerCase().includes('none'))) {
      checks.push({ status: 'WARN', title: 'Search Indexing Prohibited (noindex)', detail: `Robots meta: "${robotsMeta[2]}"`, recommendation: 'Remove noindex directive if page should be indexed by search engines.' });
      score -= 15;
    } else {
      checks.push({ status: 'PASS', title: 'Search Engine Indexing Allowed', detail: 'No restrictive noindex meta tags detected.' });
    }

    // 6. Image Alt Coverage
    const imgTags = html.match(/<img\s+[^>]*>/gi) || [];
    if (imgTags.length > 0) {
      const withAlt = imgTags.filter(img => /alt=["'][^"']+["']/i.test(img));
      const altRatio = withAlt.length / imgTags.length;
      if (altRatio === 1) {
        checks.push({ status: 'PASS', title: 'Complete Image Alt Coverage', detail: `All ${imgTags.length} images contain descriptive alt text.` });
      } else if (altRatio >= 0.5) {
        checks.push({ status: 'WARN', title: 'Incomplete Image Alt Coverage', detail: `${withAlt.length}/${imgTags.length} images have alt text.`, recommendation: 'Add alt attributes to remaining images for SEO and accessibility.' });
        score -= 5;
      } else {
        checks.push({ status: 'WARN', title: 'Low Image Alt Coverage', detail: `Only ${withAlt.length}/${imgTags.length} images have alt text.`, recommendation: 'Add descriptive alt text to images.' });
        score -= 10;
      }
    }

    // 7. Open Graph Metadata Completeness
    const hasOgTitle = /property=["']og:title["']/i.test(html) || /name=["']og:title["']/i.test(html);
    const hasOgDesc = /property=["']og:description["']/i.test(html) || /name=["']og:description["']/i.test(html);
    const hasOgImage = /property=["']og:image["']/i.test(html) || /name=["']og:image["']/i.test(html);
    if (hasOgTitle && hasOgDesc && hasOgImage) {
      checks.push({ status: 'PASS', title: 'Complete Open Graph Social Tags', detail: 'og:title, og:description, and og:image tags present.' });
    } else if (hasOgTitle || hasOgImage) {
      checks.push({ status: 'WARN', title: 'Partial Open Graph Social Tags', detail: `Title: ${hasOgTitle}, Desc: ${hasOgDesc}, Image: ${hasOgImage}`, recommendation: 'Include complete og:title, og:description, and og:image tags.' });
      score -= 5;
    } else {
      checks.push({ status: 'WARN', title: 'Missing Open Graph Social Tags', recommendation: 'Add Open Graph metadata (og:title, og:image) for rich social sharing.' });
      score -= 10;
    }

    // 8. JSON-LD / Structured Data Presence
    if (/application\/ld\+json/i.test(html)) {
      checks.push({ status: 'PASS', title: 'Structured Data (JSON-LD) Detected' });
    } else {
      checks.push({ status: 'WARN', title: 'Missing JSON-LD Structured Data', recommendation: 'Add Schema.org JSON-LD structured data to help search engines understand page entity.' });
      score -= 10;
    }

    // 9. robots.txt Availability (SSRF-safe check)
    try {
      const robotsUrl = new URL('/robots.txt', url).toString();
      const safeRobotsFetch = await fetchSafeWithSsrfRedirects(robotsUrl, { timeoutMs: 4000, maxRedirects: 3 });
      if (safeRobotsFetch.status === 200) {
        checks.push({ status: 'PASS', title: 'Observed robots.txt Crawl Control File', detail: 'Publicly accessible /robots.txt file detected.' });
      } else {
        checks.push({ status: 'WARN', title: 'robots.txt File Not Accessible', detail: `Server returned HTTP ${safeRobotsFetch.status} for /robots.txt.`, recommendation: 'Consider publishing a /robots.txt file to guide search engine crawlers.' });
      }
    } catch (err: any) {
      checks.push({ status: 'WARN', title: 'robots.txt File Not Accessible', detail: `Unable to fetch /robots.txt (${err.message}).`, recommendation: 'Consider publishing a /robots.txt file to guide search engine crawlers.' });
    }

    // 10. sitemap.xml Availability (SSRF-safe check)
    try {
      const sitemapUrl = new URL('/sitemap.xml', url).toString();
      const safeSitemapFetch = await fetchSafeWithSsrfRedirects(sitemapUrl, { timeoutMs: 4000, maxRedirects: 3 });
      if (safeSitemapFetch.status === 200) {
        checks.push({ status: 'PASS', title: 'Observed sitemap.xml Manifest File', detail: 'Publicly accessible /sitemap.xml file detected.' });
      } else {
        checks.push({ status: 'WARN', title: 'sitemap.xml File Not Accessible', detail: `Server returned HTTP ${safeSitemapFetch.status} for /sitemap.xml.`, recommendation: 'Publish an XML sitemap to help search engines index page URLs efficiently.' });
      }
    } catch (err: any) {
      checks.push({ status: 'WARN', title: 'sitemap.xml File Not Accessible', detail: `Unable to fetch /sitemap.xml (${err.message}).`, recommendation: 'Publish an XML sitemap to help search engines index page URLs efficiently.' });
    }

    return { score: Math.max(score, 0), title, metaDesc, checks };
  }

  private analyzeMobile(html: string, mobilePerf: PageSpeedMetricResult) {
    const checks: any[] = [];
    let score = 100;

    // 1. Viewport Meta Tag Presence & Configuration Quality
    const viewportMatch = html.match(/<meta\s+name="viewport"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="viewport"/i);
    if (!viewportMatch) {
      checks.push({ status: 'FAIL', title: 'Missing Mobile Viewport Meta Tag (Heuristic HTML Check)', recommendation: 'Include <meta name="viewport" content="width=device-width, initial-scale=1.0"> tag.' });
      score -= 40;
    } else {
      const contentStr = viewportMatch[1].toLowerCase();
      const hasDeviceWidth = contentStr.includes('width=device-width');
      const hasInitialScale = contentStr.includes('initial-scale=1');
      const disablesZoom = contentStr.includes('user-scalable=no') || contentStr.includes('maximum-scale=1.0');

      if (hasDeviceWidth && hasInitialScale && !disablesZoom) {
        checks.push({ status: 'PASS', title: 'Optimal Mobile Viewport Configured (Heuristic HTML Check)', detail: `Viewport content: "${viewportMatch[1]}"` });
      } else if (disablesZoom) {
        checks.push({ status: 'WARN', title: 'Viewport Disables User Zooming (Heuristic HTML Check)', detail: 'Contains user-scalable=no or maximum-scale=1.0 which restricts user zoom.', recommendation: 'Allow pinch-to-zoom to improve accessibility for visually impaired mobile visitors.' });
        score -= 10;
      } else {
        checks.push({ status: 'PASS', title: 'Mobile Viewport Present (Heuristic HTML Check)', detail: `Viewport: "${viewportMatch[1]}"` });
      }
    }

    // 2. Fixed-Width Layout Indicators Detection
    const fixedWidthMatches = html.match(/(?:width|min-width)\s*:\s*([9]\d{2}|[1-9]\d{3,})px/gi);
    if (fixedWidthMatches && fixedWidthMatches.length > 0) {
      checks.push({ status: 'WARN', title: 'Fixed-Width Layout Indicators Detected (Heuristic HTML Check)', detail: `Detected fixed width declarations: ${fixedWidthMatches.slice(0, 3).join(', ')}`, recommendation: 'Use responsive CSS percentage/flex/grid units instead of hardcoded wide pixel values.' });
      score -= 15;
    } else {
      checks.push({ status: 'PASS', title: 'No Fixed-Width Obstacles Detected (Heuristic HTML Check)' });
    }

    // 3. Image Dimension Attributes Coverage (Prevents Layout Shifts)
    const imgTags = html.match(/<img\s+[^>]*>/gi) || [];
    if (imgTags.length > 0) {
      const withDims = imgTags.filter(img => /width=["']\d+["']/i.test(img) && /height=["']\d+["']/i.test(img));
      if (withDims.length === imgTags.length) {
        checks.push({ status: 'PASS', title: 'Image Dimensions Specified (Heuristic HTML Check)', detail: `All ${imgTags.length} images have explicit width & height attributes.` });
      } else {
        checks.push({ status: 'WARN', title: 'Incomplete Image Dimension Attributes (Heuristic HTML Check)', detail: `${withDims.length}/${imgTags.length} images have explicit width/height attributes.`, recommendation: 'Set width and height attributes on images to reduce Cumulative Layout Shift (CLS).' });
        score -= 10;
      }
    }

    // 4. Mobile PageSpeed Insights Status Signal
    if (mobilePerf.isMeasured && mobilePerf.score !== null) {
      checks.push({ status: mobilePerf.score >= 70 ? 'PASS' : mobilePerf.score >= 50 ? 'WARN' : 'FAIL', title: 'Google Mobile PageSpeed Insights Score', detail: `Measured mobile performance score: ${mobilePerf.score}/100.` });
    } else {
      checks.push({ status: 'WARN', title: 'Google Mobile PageSpeed Insights Status', detail: 'Real mobile PageSpeed API score was unavailable for this audit run.' });
    }

    // 5. Layout Shift Signal from Measured PageSpeed
    if (mobilePerf.cls) {
      const clsVal = parseFloat(mobilePerf.cls);
      if (clsVal > 0.1) {
        checks.push({ status: 'WARN', title: 'High Measured Mobile Layout Shift (CLS)', detail: `CLS: ${mobilePerf.cls}`, recommendation: 'Set explicit height and width attributes on media elements.' });
      } else {
        checks.push({ status: 'PASS', title: 'Stable Mobile Layout Shift (CLS)', detail: `CLS: ${mobilePerf.cls}` });
      }
    }

    return { score: Math.max(score, 0), checks };
  }

  private analyzeAccessibility(html: string) {
    const checks: any[] = [];

    const imgTags = html.match(/<img\s+[^>]*>/gi) || [];
    const missingAlt = imgTags.filter(img => !/alt=["'][^"']*["']/i.test(img));

    if (missingAlt.length > 0) {
      checks.push({ status: 'WARN', title: `${missingAlt.length} Images Missing Alt Text (Heuristic HTML Check)`, recommendation: 'Add descriptive alt text to all informative images.' });
    } else if (imgTags.length > 0) {
      checks.push({ status: 'PASS', title: 'Image Alt Attributes Configured (Heuristic HTML Check)' });
    }

    if (!/<html[^>]*lang=["'][^"']+["']/i.test(html)) {
      checks.push({ status: 'WARN', title: 'Missing HTML lang Attribute (Heuristic HTML Check)', recommendation: 'Add lang="en" attribute to the <html> root tag.' });
    } else {
      checks.push({ status: 'PASS', title: 'HTML Root Language Specified (Heuristic HTML Check)' });
    }

    const formLabels = html.match(/<label\b[^>]*>/gi) || [];
    if (formLabels.length > 0) {
      checks.push({ status: 'PASS', title: 'Form Input Labels Detected (Heuristic HTML Check)' });
    }

    return { checks };
  }

  private analyzeSecurity(url: string, headers: Record<string, string>) {
    const checks: any[] = [];
    let score = 100;

    // 1. HTTPS Protocol Check
    const isHttps = url.toLowerCase().startsWith('https://');
    if (!isHttps) {
      checks.push({ status: 'FAIL', title: 'Insecure HTTP Protocol (Security Header Review)', recommendation: 'Migrate site to HTTPS with an active SSL/TLS certificate.' });
      score -= 40;
    } else {
      checks.push({ status: 'PASS', title: 'HTTPS Encryption Active (Security Header Review)' });
    }

    // 2. Strict-Transport-Security (HSTS)
    if (!headers['strict-transport-security']) {
      checks.push({ status: 'WARN', title: 'Missing HSTS Security Header (Security Header Review)', recommendation: 'Enable Strict-Transport-Security header to enforce secure connections.' });
      score -= 15;
    } else {
      checks.push({ status: 'PASS', title: 'HSTS Security Header Active (Security Header Review)' });
    }

    // 3. X-Content-Type-Options
    if (!headers['x-content-type-options']) {
      checks.push({ status: 'WARN', title: 'Missing X-Content-Type-Options Header (Security Header Review)', recommendation: 'Set X-Content-Type-Options: nosniff.' });
      score -= 10;
    } else {
      checks.push({ status: 'PASS', title: 'X-Content-Type-Options Header Active (Security Header Review)' });
    }

    // 4. Clickjacking Protection (X-Frame-Options / CSP frame-ancestors)
    const hasFrameOptions = !!headers['x-frame-options'];
    const hasCspFrameAncestors = headers['content-security-policy']?.includes('frame-ancestors');
    if (!hasFrameOptions && !hasCspFrameAncestors) {
      checks.push({ status: 'WARN', title: 'Missing Clickjacking Protection (Security Header Review)', recommendation: 'Configure X-Frame-Options or CSP frame-ancestors header.' });
      score -= 10;
    } else {
      checks.push({ status: 'PASS', title: 'Clickjacking Protection Configured (Security Header Review)' });
    }

    // 5. Content-Security-Policy (CSP)
    if (!headers['content-security-policy']) {
      checks.push({ status: 'WARN', title: 'Missing Content-Security-Policy (CSP) Header (Security Header Review)', recommendation: 'Deploy a Content-Security-Policy header to restrict unauthorized scripts.' });
      score -= 10;
    } else {
      checks.push({ status: 'PASS', title: 'Content-Security-Policy Header Active (Security Header Review)' });
    }

    // 6. Referrer-Policy
    if (!headers['referrer-policy']) {
      checks.push({ status: 'WARN', title: 'Missing Referrer-Policy Header (Security Header Review)', recommendation: 'Set Referrer-Policy: strict-origin-when-cross-origin.' });
      score -= 5;
    } else {
      checks.push({ status: 'PASS', title: 'Referrer-Policy Header Active (Security Header Review)' });
    }

    // 7. Permissions-Policy
    if (!headers['permissions-policy'] && !headers['feature-policy']) {
      checks.push({ status: 'WARN', title: 'Missing Permissions-Policy Header (Security Header Review)', recommendation: 'Configure Permissions-Policy header to restrict camera/geolocation features.' });
      score -= 5;
    } else {
      checks.push({ status: 'PASS', title: 'Permissions-Policy Header Active (Security Header Review)' });
    }

    // 8. Cross-Origin-Opener-Policy (COOP)
    if (!headers['cross-origin-opener-policy']) {
      checks.push({ status: 'WARN', title: 'Missing Cross-Origin-Opener-Policy Header (Security Header Review)', recommendation: 'Consider setting Cross-Origin-Opener-Policy: same-origin.' });
      score -= 5;
    } else {
      checks.push({ status: 'PASS', title: 'Cross-Origin-Opener-Policy Header Active (Security Header Review)' });
    }

    // 9. Cross-Origin-Resource-Policy (CORP)
    if (!headers['cross-origin-resource-policy']) {
      checks.push({ status: 'WARN', title: 'Missing Cross-Origin-Resource-Policy Header (Security Header Review)', recommendation: 'Consider setting Cross-Origin-Resource-Policy header.' });
      score -= 5;
    } else {
      checks.push({ status: 'PASS', title: 'Cross-Origin-Resource-Policy Header Active (Security Header Review)' });
    }

    return { score: Math.max(score, 0), checks };
  }

  private async analyzeAiReadiness(url: string, html: string) {
    const checks: any[] = [];
    let score = 100;

    // 1. JSON-LD Detection & Safe Parsing
    const jsonLdBlocks = html.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    let parsedCount = 0;
    let malformedCount = 0;
    const detectedTypes: string[] = [];
    let hasOrgType = false;

    for (const block of jsonLdBlocks) {
      const matchContent = block.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
      if (matchContent && matchContent[1]) {
        try {
          const parsed = JSON.parse(matchContent[1].trim());
          parsedCount++;
          const items = Array.isArray(parsed) ? parsed : [parsed];
          for (const item of items) {
            if (item && item['@type']) {
              const typeStr = Array.isArray(item['@type']) ? item['@type'].join(', ') : item['@type'];
              detectedTypes.push(typeStr);
              if (/Organization|Corporation|LocalBusiness/i.test(typeStr)) {
                hasOrgType = true;
              }
            }
          }
        } catch {
          malformedCount++;
        }
      }
    }

    if (parsedCount > 0) {
      checks.push({ status: 'PASS', title: 'Valid JSON-LD Structured Data Blocks', detail: `Found ${parsedCount} valid JSON-LD schema block(s). Types: ${detectedTypes.slice(0, 3).join(', ')}` });
    } else if (malformedCount > 0) {
      checks.push({ status: 'WARN', title: 'Malformed JSON-LD Structured Data Syntax', detail: `${malformedCount} JSON-LD script block(s) could not be parsed.`, recommendation: 'Fix JSON syntax errors in schema.org script tags.' });
      score -= 15;
    } else {
      checks.push({ status: 'WARN', title: 'Missing JSON-LD Structured Data', recommendation: 'Add Schema.org JSON-LD blocks to provide entity context for AI search engines.' });
      score -= 25;
    }

    // 2. Organization / Entity Signals
    if (hasOrgType) {
      checks.push({ status: 'PASS', title: 'Organization Entity Structured Data', detail: 'Schema.org Organization / Corporation / LocalBusiness type detected.' });
    } else {
      checks.push({ status: 'WARN', title: 'Missing Organization Entity Markup', recommendation: 'Include Schema.org Organization markup to establish business brand identity for AI indexers.' });
      score -= 10;
    }

    // 3. Semantic HTML Structure
    const hasSemanticTags = /<(main|article|header|nav|footer)\b/i.test(html);
    if (!hasSemanticTags) {
      checks.push({ status: 'WARN', title: 'Low Semantic Content Structure', recommendation: 'Use semantic HTML5 tags (<main>, <article>, <section>) to structure content for LLMs.' });
      score -= 15;
    } else {
      checks.push({ status: 'PASS', title: 'Semantic Content Layout Detected' });
    }

    // 4. Open Graph Completeness
    const hasOgTitle = /property=["']og:title["']/i.test(html) || /name=["']og:title["']/i.test(html);
    const hasOgDesc = /property=["']og:description["']/i.test(html) || /name=["']og:description["']/i.test(html);
    if (hasOgTitle && hasOgDesc) {
      checks.push({ status: 'PASS', title: 'Machine-Readable Open Graph Metadata' });
    } else {
      checks.push({ status: 'WARN', title: 'Incomplete Social Metadata', recommendation: 'Include og:title and og:description for automated AI agents and previews.' });
      score -= 10;
    }

    // 5. Indexing / Crawler Signals
    const isNoindex = /<meta\s+name="(robots|googlebot)"\s+content="[^"]*noindex[^"]*"/i.test(html);
    if (isNoindex) {
      checks.push({ status: 'WARN', title: 'AI Crawler Indexing Restricted (noindex)', recommendation: 'Remove noindex directive if AI agent indexing is desired.' });
      score -= 15;
    } else {
      checks.push({ status: 'PASS', title: 'AI Crawler Indexing Allowed' });
    }

    // 6. Organization & Contact Signals in Content
    const lowerHtml = html.toLowerCase();
    const hasContactSignal = lowerHtml.includes('/contact') || lowerHtml.includes('/about') || /mailto:|tel:/i.test(html);
    if (hasContactSignal) {
      checks.push({ status: 'PASS', title: 'Clear Organization Contact Signals' });
    } else {
      checks.push({ status: 'WARN', title: 'Limited Contact & About Signals', recommendation: 'Provide clear contact and about information for machine readability.' });
      score -= 10;
    }

    // 7. Redirect-Safe Check for /llms.txt (AI Discoverability Signal)
    try {
      const llmsUrl = new URL('/llms.txt', url).toString();
      const safeLlmsFetch = await fetchSafeWithSsrfRedirects(llmsUrl, { timeoutMs: 4000, maxRedirects: 3 });

      if (safeLlmsFetch.status === 200) {
        checks.push({ status: 'PASS', title: 'Observed Machine-Readable /llms.txt Manifest', detail: 'Active /llms.txt discoverability file found.' });
      } else {
        checks.push({ status: 'WARN', title: 'No /llms.txt Manifest Found', recommendation: 'Consider adding an /llms.txt file to provide structured text context for AI agents.' });
        score -= 10;
      }
    } catch {
      checks.push({ status: 'WARN', title: 'No /llms.txt Manifest Found', recommendation: 'Consider adding an /llms.txt file to provide structured text context for AI agents.' });
      score -= 10;
    }

    return { score: Math.max(score, 0), checks };
  }

  private calculateOverallScore(cats: Record<string, number | null>) {
    const weights: Record<string, number> = {
      performance: 0.20,
      seo: 0.20,
      mobile: 0.15,
      ux: 0.15,
      security: 0.10,
      accessibility: 0.10,
      aiReadiness: 0.10,
    };

    let totalWeight = 0;
    let weightedSum = 0;

    for (const key of Object.keys(weights)) {
      const catVal = cats[key];
      if (typeof catVal === 'number' && !isNaN(catVal)) {
        totalWeight += weights[key];
        weightedSum += catVal * weights[key];
      }
    }

    if (totalWeight === 0) {
      return { score: null, grade: 'N/A' };
    }

    const finalScore = Math.round(weightedSum / totalWeight);

    let grade = 'C';
    if (finalScore >= 90) grade = 'A+';
    else if (finalScore >= 80) grade = 'A';
    else if (finalScore >= 70) grade = 'B';
    else if (finalScore >= 60) grade = 'C';
    else if (finalScore >= 50) grade = 'D';
    else grade = 'F';

    return { score: finalScore, grade };
  }
}
