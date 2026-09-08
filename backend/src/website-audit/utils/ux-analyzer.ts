export interface UxCheck {
  status: 'PASS' | 'WARN' | 'FAIL';
  title: string;
  detail: string;
  recommendation?: string;
}

export interface UxAnalysisResult {
  score: number;
  checks: UxCheck[];
}

export function analyzeUxAndCro(html: string): UxAnalysisResult {
  const checks: UxCheck[] = [];
  let score = 100;
  const lowerHtml = html.toLowerCase();

  // Helper to extract text content inside tags
  const extractTagTexts = (tagName: string): string[] => {
    const regex = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
    const matches: string[] = [];
    let m;
    while ((m = regex.exec(html)) !== null) {
      const cleanText = m[1].replace(/<[^>]+>/g, '').trim();
      if (cleanText) matches.push(cleanText);
    }
    return matches;
  };

  // 1. CTA DETECTION
  const highIntentKeywords = [
    'get started', 'contact us', 'book demo', 'book a demo', 'schedule a call',
    'schedule demo', 'request a quote', 'request quote', 'sign up', 'try for free',
    'try free', 'buy now', 'start free trial', 'get a quote', 'book consultation',
    'start now', 'enquire now', 'inquire now', 'get in touch', 'submit application'
  ];

  const secondaryKeywords = [
    'learn more', 'explore services', 'view portfolio', 'see pricing', 'read more', 'submit'
  ];

  // Extract buttons, links, submit inputs
  const linkAndButtonTexts = [
    ...extractTagTexts('button'),
    ...extractTagTexts('a'),
  ];

  // Check input submit values
  const inputSubmitMatches = html.match(/<input\b[^>]*type=["'](?:submit|button)["'][^>]*value=["']([^"']+)["']/gi) || [];
  for (const inputTag of inputSubmitMatches) {
    const valMatch = inputTag.match(/value=["']([^"']+)["']/i);
    if (valMatch && valMatch[1]) {
      linkAndButtonTexts.push(valMatch[1].trim());
    }
  }

  let matchedHighIntentCta: string | null = null;
  let matchedSecondaryCta: string | null = null;

  for (const text of linkAndButtonTexts) {
    const lowerText = text.toLowerCase();
    for (const kw of highIntentKeywords) {
      if (lowerText.includes(kw)) {
        matchedHighIntentCta = text;
        break;
      }
    }
    if (matchedHighIntentCta) break;

    for (const kw of secondaryKeywords) {
      if (lowerText.includes(kw)) {
        matchedSecondaryCta = text;
        break;
      }
    }
  }

  if (matchedHighIntentCta) {
    checks.push({
      status: 'PASS',
      title: 'Actionable Conversion Call-to-Action (CTA)',
      detail: `Actionable high-intent CTA button/link detected: "${matchedHighIntentCta}".`,
    });
  } else if (matchedSecondaryCta || lowerHtml.includes('type="submit"')) {
    checks.push({
      status: 'WARN',
      title: 'Generic Action Link Present',
      detail: matchedSecondaryCta
        ? `Found action link ("${matchedSecondaryCta}"), but no direct high-intent conversion phrase (e.g., "Get Started", "Book Demo").`
        : 'Form submit button detected, but no primary high-intent CTA link phrase found.',
      recommendation: 'Incorporate direct high-intent action phrases ("Get Started", "Book Demo", "Contact Us") in key CTA buttons.',
    });
    score -= 15;
  } else {
    checks.push({
      status: 'FAIL',
      title: 'Missing Conversion Call-to-Action (CTA)',
      detail: 'No actionable CTA buttons or links with conversion intent detected in page HTML.',
      recommendation: 'Add prominent Call-to-Action buttons such as "Get Started", "Contact Us", or "Book Demo".',
    });
    score -= 25;
  }

  // 2. NAVIGATION
  const navBlocks = html.match(/<nav\b[^>]*>([\s\S]*?)<\/nav>/gi) || [];
  const navHrefs: string[] = [];

  for (const block of navBlocks) {
    const hrefMatches = block.match(/href=["']([^"']+)["']/gi) || [];
    for (const hm of hrefMatches) {
      const val = hm.match(/href=["']([^"']+)["']/i);
      if (val && val[1] && !val[1].startsWith('#') && !val[1].startsWith('javascript:')) {
        navHrefs.push(val[1].trim().toLowerCase());
      }
    }
  }
  const distinctNavLinkCount = new Set(navHrefs).size;

  if (navBlocks.length > 0 && distinctNavLinkCount >= 3) {
    checks.push({
      status: 'PASS',
      title: 'Structured Semantic Navigation',
      detail: `Semantic <nav> element found containing ${distinctNavLinkCount} distinct navigation links.`,
    });
  } else if (navBlocks.length > 0 || lowerHtml.includes('role="navigation"') || (lowerHtml.includes('<header') && lowerHtml.includes('<a'))) {
    checks.push({
      status: 'WARN',
      title: 'Minimal Header Navigation',
      detail: `Navigation elements found, but fewer than 3 distinct links (${distinctNavLinkCount} distinct found) were detected in semantic <nav> containers.`,
      recommendation: 'Ensure key site sections are clearly organized within semantic <nav> tags.',
    });
    score -= 10;
  } else {
    checks.push({
      status: 'FAIL',
      title: 'Missing Semantic Navigation Container',
      detail: 'No semantic <nav> element detected in page HTML.',
      recommendation: 'Use semantic <nav> containers to structure main header navigation links.',
    });
    score -= 20;
  }

  // 3. FORM / LEAD CAPTURE
  const formBlocks = html.match(/<form\b[^>]*>([\s\S]*?)<\/form>/gi) || [];
  let leadFormFound = false;
  let leadFormFieldCount = 0;
  let leadFormHasSubmit = false;

  for (const fBlock of formBlocks) {
    const lowerForm = fBlock.toLowerCase();
    // Skip search forms
    if (lowerForm.includes('role="search"') || (lowerForm.includes('action="') && lowerForm.includes('search'))) {
      continue;
    }

    const inputs = fBlock.match(/<(input|textarea|select)\b[^>]*>/gi) || [];
    // Filter out hidden, submit, csrf inputs
    const relevantInputs = inputs.filter(inp => {
      const lInp = inp.toLowerCase();
      return !lInp.includes('type="hidden"') && !lInp.includes('type="submit"') && !lInp.includes('type="button"');
    });

    if (relevantInputs.length > 0) {
      leadFormFound = true;
      leadFormFieldCount = relevantInputs.length;
      leadFormHasSubmit =
        /<button\b[^>]*type=["']submit["']/i.test(fBlock) ||
        /<input\b[^>]*type=["'](?:submit|button|image)["']/i.test(fBlock) ||
        /<button\b/i.test(fBlock);
      break;
    }
  }

  if (leadFormFound) {
    const submitSuffix = leadFormHasSubmit ? 'and verified submit control' : '(submit control not explicitly detected)';
    if (leadFormFieldCount <= 8) {
      checks.push({
        status: 'PASS',
        title: 'Lead Capture Form Available',
        detail: `Lead capture form detected containing ${leadFormFieldCount} relevant input fields ${submitSuffix}.`,
      });
    } else {
      checks.push({
        status: 'WARN',
        title: 'High Input Field Count in Lead Form',
        detail: `Lead form contains ${leadFormFieldCount} input fields ${submitSuffix}, which may increase user completion friction.`,
        recommendation: 'Streamline lead capture forms to 3–5 essential fields to reduce user effort.',
      });
      score -= 10;
    }
  } else {
    // Check if standalone inputs exist outside forms
    const standaloneInputs = (html.match(/<(input|textarea)\b[^>]*>/gi) || []).filter(inp => {
      const lInp = inp.toLowerCase();
      return !lInp.includes('type="hidden"') && !lInp.includes('type="submit"') && !lInp.includes('type="search"');
    });

    if (standaloneInputs.length > 0) {
      checks.push({
        status: 'WARN',
        title: 'Standalone Form Controls Detected',
        detail: `${standaloneInputs.length} input controls found outside of a semantic <form> tag.`,
        recommendation: 'Wrap lead capture input fields inside a semantic <form> container with a submit control.',
      });
      score -= 10;
    } else {
      checks.push({
        status: 'WARN',
        title: 'No Lead Capture Form Detected',
        detail: 'No interactive contact or lead generation form detected in page HTML.',
        recommendation: 'Incorporate a concise lead capture or contact form on the page.',
      });
      score -= 15;
    }
  }

  // 4. CONTACT / CONVERSION PATH
  const contactDetailsList: string[] = [];
  if (lowerHtml.includes('href="tel:') || lowerHtml.includes("href='tel:")) {
    contactDetailsList.push('tel: phone link');
  }
  if (lowerHtml.includes('href="mailto:') || lowerHtml.includes("href='mailto:")) {
    contactDetailsList.push('mailto: email link');
  }
  if (/[\w.-]+@[\w.-]+\.[a-z]{2,}/i.test(html) && !contactDetailsList.includes('mailto: email link')) {
    contactDetailsList.push('visible email address');
  }
  if (lowerHtml.includes('href="/contact') || lowerHtml.includes('href="contact') || lowerHtml.includes('href="/enquiry')) {
    contactDetailsList.push('dedicated contact page link');
  }

  if (contactDetailsList.length > 0) {
    checks.push({
      status: 'PASS',
      title: 'Direct Contact Channels Available',
      detail: `Contact channels detected: ${contactDetailsList.join(', ')}.`,
    });
  } else {
    checks.push({
      status: 'FAIL',
      title: 'Missing Direct Contact Details',
      detail: 'No tel: phone link, mailto: email link, email address, or contact page URL detected in page HTML.',
      recommendation: 'Provide clear contact methods (phone, email, contact link) in the header or footer.',
    });
    score -= 20;
  }

  // 5. HEADING / CONTENT HIERARCHY
  const h1Tags = extractTagTexts('h1');
  const h2Tags = extractTagTexts('h2');

  if (h1Tags.length === 1 && h2Tags.length >= 1) {
    checks.push({
      status: 'PASS',
      title: 'Structured Heading Hierarchy',
      detail: `Single H1 main headline ("${h1Tags[0].slice(0, 40)}${h1Tags[0].length > 40 ? '...' : ''}") and ${h2Tags.length} H2 section headings detected.`,
    });
  } else if (h1Tags.length === 1 && h2Tags.length === 0) {
    checks.push({
      status: 'WARN',
      title: 'Missing H2 Section Headings',
      detail: `Single H1 title found ("${h1Tags[0].slice(0, 40)}"), but no H2 section headings were detected.`,
      recommendation: 'Organize body content into logical sections using <h2> headings.',
    });
    score -= 10;
  } else if (h1Tags.length > 1) {
    checks.push({
      status: 'WARN',
      title: 'Multiple H1 Tags Detected',
      detail: `Found ${h1Tags.length} H1 heading tags in page HTML.`,
      recommendation: 'Reserve H1 for the primary page title and use H2/H3 for sub-sections.',
    });
    score -= 10;
  } else {
    checks.push({
      status: 'FAIL',
      title: 'Missing Primary Page Headline (H1)',
      detail: 'No H1 heading tag detected in page HTML.',
      recommendation: 'Add a primary H1 heading tag clearly stating the core value proposition.',
    });
    score -= 20;
  }

  // 6. TRUST SIGNALS & SOCIAL PROOF
  const detectedTrust: string[] = [];

  const hasPrivacyLink = lowerHtml.includes('/privacy') || lowerHtml.includes('privacy policy');
  const hasTermsLink = lowerHtml.includes('/terms') || lowerHtml.includes('terms of service');
  if (hasPrivacyLink) detectedTrust.push('Privacy Policy link');
  if (hasTermsLink) detectedTrust.push('Terms of Service link');

  const hasTestimonials = lowerHtml.includes('testimonial') || lowerHtml.includes('customer review') || lowerHtml.includes('client review') || lowerHtml.includes('what our clients say');
  if (hasTestimonials) detectedTrust.push('Client testimonials / reviews section');

  const hasCaseStudies = lowerHtml.includes('case-stud') || lowerHtml.includes('case studies') || lowerHtml.includes('client logo') || lowerHtml.includes('partner logo');
  if (hasCaseStudies) detectedTrust.push('Case studies / partner logos');

  if (detectedTrust.length >= 2) {
    checks.push({
      status: 'PASS',
      title: 'Trust & Credibility Signals Detected',
      detail: `Observed trust indicators: ${detectedTrust.join(', ')}.`,
    });
  } else if (detectedTrust.length === 1) {
    checks.push({
      status: 'WARN',
      title: 'Limited Social Proof Indicators',
      detail: `Observed trust indicator: ${detectedTrust[0]}.`,
      recommendation: 'Add client testimonials, case studies, or legal links to build visitor trust.',
    });
    score -= 10;
  } else {
    checks.push({
      status: 'FAIL',
      title: 'Missing Trust & Social Proof Signals',
      detail: 'No privacy policy link, terms link, customer testimonials, or case study sections detected in page HTML.',
      recommendation: 'Incorporate client reviews, testimonials, and legal compliance links.',
    });
    score -= 20;
  }

  // 7. CONVERSION FRICTION ALIGNMENT
  if ((matchedHighIntentCta || matchedSecondaryCta) && contactDetailsList.length === 0 && !leadFormFound) {
    checks.push({
      status: 'WARN',
      title: 'CTA Disconnected From Conversion Path',
      detail: 'Call-to-action text detected, but no direct form, mailto:, or tel: link was found in page HTML.',
      recommendation: 'Ensure CTA links navigate directly to an active lead form or contact page.',
    });
    score -= 10;
  } else {
    checks.push({
      status: 'PASS',
      title: 'Conversion Path Alignment',
      detail: 'Call-to-action intent aligns with available contact or form mechanisms.',
    });
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    checks,
  };
}
