import * as fs from 'fs';
import * as chromeLauncher from 'chrome-launcher';
import { validateUrlSsrf } from './ssrf-validator';
import { Logger } from '@nestjs/common';

const logger = new Logger('LighthouseRunner');

export interface LighthouseMetricResult {
  isMeasured: boolean;
  status: 'SUCCESS' | 'UNAVAILABLE';
  strategy: 'mobile' | 'desktop';
  score: number | null;
  accessibilityScore: number | null;
  seoScore?: number | null;
  bestPracticesScore?: number | null;
  fcp: string | null;
  lcp: string | null;
  tbt: string | null;
  cls: string | null;
  speedIndex: string | null;
  tti?: string | null;
  error?: string;
}

// In-process async mutex to ensure MAX 1 Lighthouse execution at a time with guaranteed lock release
let executionLock: Promise<void> = Promise.resolve();

function withMutex<T>(fn: () => Promise<T>): Promise<T> {
  let releaseLock: () => void = () => {};
  const lockPromise = new Promise<void>((resolve) => {
    releaseLock = resolve;
  });

  const currentLock = executionLock;
  executionLock = executionLock.then(
    () => lockPromise,
    () => lockPromise
  );

  return currentLock.then(async () => {
    try {
      return await fn();
    } finally {
      releaseLock();
    }
  });
}

function getChromiumExecutablePath(): string | undefined {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  const candidates = [
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  try {
    return chromeLauncher.Launcher.getFirstInstallation();
  } catch {
    return undefined;
  }
}

export async function runLocalLighthouseAudit(
  url: string,
  strategy: 'mobile' | 'desktop'
): Promise<LighthouseMetricResult> {
  // 1. Re-verify SSRF security before passing URL to Chromium
  const ssrfCheck = await validateUrlSsrf(url);
  if (!ssrfCheck.isValid || !ssrfCheck.normalizedUrl) {
    logger.warn(`SSRF validation blocked Lighthouse run for ${url}: ${ssrfCheck.error}`);
    return {
      isMeasured: false,
      status: 'UNAVAILABLE',
      strategy,
      score: null,
      accessibilityScore: null,
      seoScore: null,
      bestPracticesScore: null,
      fcp: null,
      lcp: null,
      tbt: null,
      cls: null,
      speedIndex: null,
      tti: null,
      error: `SSRF validation failed: ${ssrfCheck.error}`,
    };
  }

  const targetUrl = ssrfCheck.normalizedUrl;

  // 2. Execute via Concurrency Mutex (MAX 1 concurrent run)
  return withMutex(async () => {
    let chrome: chromeLauncher.LaunchedChrome | undefined;
    let timeoutTimer: NodeJS.Timeout | undefined;

    logger.log(`[Lighthouse] Starting ${strategy} audit for target: ${targetUrl}`);

    try {
      // Wrap launch, dynamic import, and execution in a hard 60-second global timeout
      const auditPromise = (async () => {
        const chromePath = getChromiumExecutablePath();
        if (!chromePath) {
          throw new Error('Chromium/Chrome executable not found on host system.');
        }

        logger.log(`[Lighthouse] Launching Chromium (${chromePath}) for ${strategy}...`);

        chrome = await chromeLauncher.launch({
          chromePath,
          chromeFlags: [
            '--headless=new',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
          ],
        });

        logger.log(`[Lighthouse] Chromium launched on port ${chrome.port}. Importing Lighthouse ESM module...`);

        const lighthouse = (await import('lighthouse')).default;

        const options: any = {
          port: chrome.port,
          logLevel: 'error',
          output: 'json',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        };

        let config: any = undefined;
        if (strategy === 'desktop') {
          config = {
            extends: 'lighthouse:default',
            settings: {
              formFactor: 'desktop',
              screenEmulation: {
                mobile: false,
                width: 1350,
                height: 940,
                deviceScaleFactor: 1,
                disabled: false,
              },
              throttling: {
                rttMs: 40,
                throughputKbps: 10240,
                cpuSlowdownMultiplier: 1,
                requestKeyable: true,
              },
            },
          };
        }

        logger.log(`[Lighthouse] Executing Lighthouse audit runner for ${targetUrl} (${strategy})...`);
        const runnerResult = await lighthouse(targetUrl, options, config);

        if (!runnerResult || !runnerResult.lhr) {
          throw new Error('Lighthouse payload incomplete or missing categories.');
        }

        return runnerResult.lhr;
      })();

      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutTimer = setTimeout(() => {
          reject(new Error(`Lighthouse audit hard timeout after 60 seconds for ${targetUrl}`));
        }, 60000);
      });

      const result = await Promise.race([auditPromise, timeoutPromise]);

      const categories = result.categories || {};
      const audits = result.audits || {};

      const perfScoreRaw = categories.performance?.score;
      const perfScore = typeof perfScoreRaw === 'number' ? Math.round(perfScoreRaw * 100) : null;

      const accessScoreRaw = categories.accessibility?.score;
      const accessScore = typeof accessScoreRaw === 'number' ? Math.round(accessScoreRaw * 100) : null;

      const seoScoreRaw = categories.seo?.score;
      const seoScore = typeof seoScoreRaw === 'number' ? Math.round(seoScoreRaw * 100) : null;

      const bpScoreRaw = categories['best-practices']?.score;
      const bpScore = typeof bpScoreRaw === 'number' ? Math.round(bpScoreRaw * 100) : null;

      logger.log(`[Lighthouse] ${strategy} audit completed successfully for ${targetUrl} (Perf: ${perfScore}, Access: ${accessScore})`);

      return {
        isMeasured: true,
        status: 'SUCCESS',
        strategy,
        score: perfScore,
        accessibilityScore: accessScore,
        seoScore,
        bestPracticesScore: bpScore,
        fcp: audits['first-contentful-paint']?.displayValue || null,
        lcp: audits['largest-contentful-paint']?.displayValue || null,
        tbt: audits['total-blocking-time']?.displayValue || null,
        cls: audits['cumulative-layout-shift']?.displayValue || null,
        speedIndex: audits['speed-index']?.displayValue || null,
        tti: audits['interactive']?.displayValue || null,
      };
    } catch (err: any) {
      const errorMsg = err.message || 'Lighthouse execution failed.';
      logger.warn(`[Lighthouse] ${strategy} audit failed for ${targetUrl}: ${errorMsg}`);
      return {
        isMeasured: false,
        status: 'UNAVAILABLE',
        strategy,
        score: null,
        accessibilityScore: null,
        seoScore: null,
        bestPracticesScore: null,
        fcp: null,
        lcp: null,
        tbt: null,
        cls: null,
        speedIndex: null,
        tti: null,
        error: errorMsg,
      };
    } finally {
      if (timeoutTimer) {
        clearTimeout(timeoutTimer);
      }
      if (chrome) {
        try {
          logger.log(`[Lighthouse] Cleaning up Chromium process for ${targetUrl}...`);
          await chrome.kill();
        } catch (killErr: any) {
          logger.debug(`[Lighthouse] Chrome process cleanup notice: ${killErr.message}`);
        }
      }
    }
  });
}
