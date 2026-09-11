import * as fs from 'fs';
import * as chromeLauncher from 'chrome-launcher';
import { validateUrlSsrf } from './ssrf-validator';
import { Logger } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const WS = require('ws');

const logger = new Logger('CdpPerformanceRunner');

export interface CdpMetricResult {
  isMeasured: boolean;
  status: 'SUCCESS' | 'UNAVAILABLE' | 'FAILED';
  strategy: 'mobile' | 'desktop';
  score: number | null;
  accessibilityScore: number | null;
  seoScore?: number | null;
  bestPracticesScore?: number | null;
  fcp: string | null;
  lcp: string | null;
  tbt: string | null; // Total Blocking Time (Load Window)
  cls: string | null;
  ttfb: string | null;
  domInteractive: string | null;
  loadEvent: string | null;
  methodologyNote?: string;
  navigationTiming?: {
    dnsMs: number | null;
    connectMs: number | null;
    ttfbMs: number | null;
    domInteractiveMs: number | null;
    domContentLoadedMs: number | null;
    loadEventMs: number | null;
  };
  error?: string;
}

export class CdpClient {
  private ws: any;
  private id = 0;
  private callbacks = new Map<number, { resolve: (val: any) => void; reject: (err: any) => void }>();
  private eventListeners = new Map<string, Array<(params: any) => void>>();

  constructor(wsUrl: string) {
    this.ws = new WS(wsUrl);
  }

  async connect(timeoutMs = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`WebSocket connection timeout to ${this.ws.url}`));
      }, timeoutMs);

      this.ws.on('open', () => {
        clearTimeout(timer);
        resolve();
      });

      this.ws.on('error', (err: any) => {
        clearTimeout(timer);
        reject(err);
      });

      this.ws.on('message', (data: any) => {
        try {
          const msg = JSON.parse(data.toString());
          if (msg.id !== undefined && this.callbacks.has(msg.id)) {
            const { resolve, reject } = this.callbacks.get(msg.id)!;
            this.callbacks.delete(msg.id);
            if (msg.error) {
              reject(new Error(msg.error.message || 'CDP Command Error'));
            } else {
              resolve(msg.result);
            }
          } else if (msg.method) {
            const listeners = this.eventListeners.get(msg.method) || [];
            for (const listener of listeners) {
              listener(msg.params);
            }
          }
        } catch {}
      });
    });
  }

  send(method: string, params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqId = ++this.id;
      this.callbacks.set(reqId, { resolve, reject });
      if (this.ws.readyState !== WS.OPEN) {
        this.callbacks.delete(reqId);
        return reject(new Error('WebSocket is not open'));
      }
      this.ws.send(JSON.stringify({ id: reqId, method, params }));
    });
  }

  on(event: string, listener: (params: any) => void) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(listener);
  }

  close(): Promise<void> {
    return new Promise((resolve) => {
      if (this.ws.readyState === WS.CLOSED || this.ws.readyState === WS.CLOSING) {
        return resolve();
      }
      this.ws.on('close', () => resolve());
      this.ws.close();
    });
  }
}

function getChromiumExecutablePath(): string | undefined {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  if (process.env.CHROME_BIN && fs.existsSync(process.env.CHROME_BIN)) {
    return process.env.CHROME_BIN;
  }
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const candidates = [
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/lib/chromium/chromium',
    '/usr/lib/chromium-browser/chromium-browser',
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

/**
 * Standard Error Function (erf) approximation (Abramowitz & Stegun formula 7.1.26)
 */
function erf(x: number): number {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

  return sign * y;
}

function normalCdf(x: number, mean: number, stdDev: number): number {
  return 0.5 * (1 + erf((x - mean) / (stdDev * Math.sqrt(2))));
}

/**
 * Log-Normal scoring function based on standard web-performance methodology:
 * - p10 (Good threshold): score = 90
 * - p50 (Median threshold): score = 50
 * Curve parameters: mu = ln(p50), sigma = -ln(p10/p50) / 1.2815515655446004
 */
function scoreLogNormalMetric(val: number | null, p10: number, p50: number): number | null {
  if (val === null || val === undefined || isNaN(val) || val < 0) return null;
  if (val === 0) return 100;

  const mu = Math.log(p50);
  const sigma = -Math.log(p10 / p50) / 1.2815515655446004;

  if (sigma <= 0) return null;

  const cdfVal = normalCdf(Math.log(val), mu, sigma);
  const score = Math.round(100 * (1 - cdfVal));
  return Math.min(100, Math.max(0, score));
}

/**
 * CoreSlash Performance Score — Lighthouse-style log-normal methodology:
 * - LCP: 30% weight (p10 = 2500ms, p50 = 4000ms)
 * - Total Blocking Time (Load Window): 30% weight (p10 = 200ms, p50 = 600ms)
 * - FCP: 15% weight (p10 = 1800ms, p50 = 3000ms)
 * - CLS (Session Window): 15% weight (p10 = 0.10, p50 = 0.25)
 * - TTFB: 10% weight (p10 = 800ms, p50 = 1800ms)
 */
function calculateCoreWebPerformanceScore(metrics: {
  lcpMs: number | null;
  tbtMs: number | null;
  fcpMs: number | null;
  cls: number | null;
  ttfbMs: number | null;
}): number | null {
  const scores = [
    { weight: 0.30, score: scoreLogNormalMetric(metrics.lcpMs, 2500, 4000) },
    { weight: 0.30, score: scoreLogNormalMetric(metrics.tbtMs, 200, 600) },
    { weight: 0.15, score: scoreLogNormalMetric(metrics.fcpMs, 1800, 3000) },
    { weight: 0.15, score: scoreLogNormalMetric(metrics.cls, 0.10, 0.25) },
    { weight: 0.10, score: scoreLogNormalMetric(metrics.ttfbMs, 800, 1800) },
  ];

  let totalWeight = 0;
  let weightedSum = 0;

  for (const item of scores) {
    if (item.score !== null) {
      totalWeight += item.weight;
      weightedSum += item.score * item.weight;
    }
  }

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : null;
}

export async function runCdpPerformanceAuditPair(url: string): Promise<{
  mobile: CdpMetricResult;
  desktop: CdpMetricResult;
  mobileTimeMs: number;
  desktopTimeMs: number;
}> {
  const createFailResult = (strategy: 'mobile' | 'desktop', errorMsg: string): CdpMetricResult => ({
    isMeasured: false,
    status: 'FAILED',
    strategy,
    score: null,
    accessibilityScore: null,
    fcp: null,
    lcp: null,
    tbt: null,
    cls: null,
    ttfb: null,
    domInteractive: null,
    loadEvent: null,
    error: errorMsg,
  });

  const ssrfCheck = await validateUrlSsrf(url);
  if (!ssrfCheck.isValid || !ssrfCheck.normalizedUrl) {
    return {
      mobile: createFailResult('mobile', `SSRF validation failed: ${ssrfCheck.error}`),
      desktop: createFailResult('desktop', `SSRF validation failed: ${ssrfCheck.error}`),
      mobileTimeMs: 0,
      desktopTimeMs: 0,
    };
  }

  const targetUrl = ssrfCheck.normalizedUrl;
  const chromePath = getChromiumExecutablePath();
  if (!chromePath) {
    return {
      mobile: createFailResult('mobile', 'Chromium executable not found on host system.'),
      desktop: createFailResult('desktop', 'Chromium executable not found on host system.'),
      mobileTimeMs: 0,
      desktopTimeMs: 0,
    };
  }

  let chrome: chromeLauncher.LaunchedChrome | undefined;
  let browserClient: CdpClient | undefined;

  try {
    logger.log(`Launching Chromium (${chromePath}) for CDP measurement...`);
    chrome = await chromeLauncher.launch({
      chromePath,
      chromeFlags: [
        '--headless=new',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-extensions',
        '--disable-default-apps',
        '--mute-audio',
        '--no-first-run',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-component-update',
        '--disable-sync',
        '--metrics-recording-only',
      ],
    });

    const port = chrome.port;
    const versionRes = await fetch(`http://127.0.0.1:${port}/json/version`);
    const versionData: any = await versionRes.json();
    const browserWsUrl = versionData.webSocketDebuggerUrl;

    browserClient = new CdpClient(browserWsUrl);
    await browserClient.connect(5000);

    // 1. Mobile Strategy
    const mStart = Date.now();
    const mobile = await runSingleStrategyCdp(browserClient, port, targetUrl, 'mobile');
    const mobileTimeMs = Date.now() - mStart;

    // 2. Desktop Strategy
    const dStart = Date.now();
    const desktop = await runSingleStrategyCdp(browserClient, port, targetUrl, 'desktop');
    const desktopTimeMs = Date.now() - dStart;

    return { mobile, desktop, mobileTimeMs, desktopTimeMs };
  } catch (err: any) {
    logger.error(`CDP measurement error: ${err.message}`, err.stack);
    return {
      mobile: createFailResult('mobile', err.message || 'CDP browser measurement failed.'),
      desktop: createFailResult('desktop', err.message || 'CDP browser measurement failed.'),
      mobileTimeMs: 0,
      desktopTimeMs: 0,
    };
  } finally {
    if (browserClient) {
      try { await browserClient.close(); } catch {}
    }
    if (chrome) {
      try {
        logger.log('Cleaning up Chromium process...');
        await chrome.kill();
      } catch (killErr: any) {
        logger.debug(`Chrome process cleanup notice: ${killErr.message}`);
      }
    }
  }
}

async function runSingleStrategyCdp(
  browserClient: CdpClient,
  port: number,
  targetUrl: string,
  strategy: 'mobile' | 'desktop'
): Promise<CdpMetricResult> {
  let targetId: string | undefined;
  let pageClient: CdpClient | undefined;

  try {
    const createRes = await browserClient.send('Target.createTarget', { url: 'about:blank' });
    targetId = createRes.targetId;

    const pageWsUrl = `ws://127.0.0.1:${port}/devtools/page/${targetId}`;
    pageClient = new CdpClient(pageWsUrl);
    await pageClient.connect(5000);

    await pageClient.send('Page.enable');
    await pageClient.send('Network.enable');
    await pageClient.send('Performance.enable');

    if (strategy === 'mobile') {
      await pageClient.send('Emulation.setDeviceMetricsOverride', {
        width: 412,
        height: 823,
        deviceScaleFactor: 1.75,
        mobile: true,
      });
      await pageClient.send('Emulation.setUserAgentOverride', {
        userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      });
    } else {
      await pageClient.send('Emulation.setDeviceMetricsOverride', {
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await pageClient.send('Emulation.setUserAgentOverride', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      });
    }

    // Pre-load PerformanceObservers before navigating
    const injectionScript = `
      window.__cdpPerf = {
        fcp: null,
        lcp: null,
        layoutShifts: [],
        longTasks: []
      };

      try {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              window.__cdpPerf.fcp = entry.startTime;
            }
          }
        }).observe({ type: 'paint', buffered: true });
      } catch (e) {}

      try {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            window.__cdpPerf.lcp = entry.startTime;
          }
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {}

      try {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              window.__cdpPerf.layoutShifts.push({
                score: entry.value,
                startTime: entry.startTime
              });
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
      } catch (e) {}

      try {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.duration > 50) {
              window.__cdpPerf.longTasks.push({
                duration: entry.duration,
                startTime: entry.startTime
              });
            }
          }
        }).observe({ type: 'longtask', buffered: true });
      } catch (e) {}
    `;

    await pageClient.send('Page.addScriptToEvaluateOnNewDocument', { source: injectionScript });

    let loaded = false;
    pageClient.on('Page.loadEventFired', () => {
      loaded = true;
    });

    await pageClient.send('Page.navigate', { url: targetUrl });

    // Bounded navigation wait (max 4000ms load wait + 1500ms stabilization window for LCP/layout shifts)
    const startTime = Date.now();
    while (!loaded && Date.now() - startTime < 4000) {
      await new Promise((r) => setTimeout(r, 100));
    }

    // 1500ms stabilization window to allow LCP candidates and layout shifts to settle
    await new Promise((r) => setTimeout(r, 1500));

    const evalResult = await pageClient.send('Runtime.evaluate', {
      expression: `
        (() => {
          const perf = window.__cdpPerf || {};
          const nav = performance.getEntriesByType('navigation')[0] || {};
          const timing = performance.timing || {};

          let fcpMs = perf.fcp;
          if (fcpMs === null || fcpMs === undefined) {
            const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
            if (fcpEntry) fcpMs = fcpEntry.startTime;
          }

          let lcpMs = perf.lcp;
          if (lcpMs === null || lcpMs === undefined) {
            const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
            if (lcpEntries && lcpEntries.length > 0) {
              lcpMs = lcpEntries[lcpEntries.length - 1].startTime;
            }
          }

          const dns = (nav.domainLookupEnd && nav.domainLookupStart && nav.domainLookupEnd > nav.domainLookupStart)
            ? (nav.domainLookupEnd - nav.domainLookupStart)
            : (timing.domainLookupEnd && timing.domainLookupStart && timing.domainLookupEnd > timing.domainLookupStart ? timing.domainLookupEnd - timing.domainLookupStart : null);

          const connect = (nav.connectEnd && nav.connectStart && nav.connectEnd > nav.connectStart)
            ? (nav.connectEnd - nav.connectStart)
            : (timing.connectEnd && timing.connectStart && timing.connectEnd > timing.connectStart ? timing.connectEnd - timing.connectStart : null);

          const ttfb = (nav.responseStart && nav.requestStart && nav.responseStart > nav.requestStart)
            ? (nav.responseStart - nav.requestStart)
            : (timing.responseStart && timing.requestStart && timing.responseStart > timing.requestStart ? timing.responseStart - timing.requestStart : null);

          const domInteractive = nav.domInteractive
            ? nav.domInteractive
            : (timing.domInteractive && timing.navigationStart ? timing.domInteractive - timing.navigationStart : null);

          const domContentLoaded = nav.domContentLoadedEventEnd
            ? nav.domContentLoadedEventEnd
            : (timing.domContentLoadedEventEnd && timing.navigationStart ? timing.domContentLoadedEventEnd - timing.navigationStart : null);

          const loadEvent = nav.loadEventEnd
            ? nav.loadEventEnd
            : (timing.loadEventEnd && timing.navigationStart ? timing.loadEventEnd - timing.navigationStart : null);

          // W3C CLS Session Window calculation (max gap 1s, max session 5s, take max window score)
          let maxClsSessionScore = 0;
          let sessionValue = 0;
          let sessionStart = 0;
          let previousStart = 0;

          for (const entry of (perf.layoutShifts || [])) {
            if (sessionStart && (entry.startTime - previousStart < 1000) && (entry.startTime - sessionStart < 5000)) {
              sessionValue += entry.score;
            } else {
              sessionStart = entry.startTime;
              sessionValue = entry.score;
            }
            previousStart = entry.startTime;
            if (sessionValue > maxClsSessionScore) {
              maxClsSessionScore = sessionValue;
            }
          }

          // Total Blocking Time (Load Window): Sum duration-50 for longtasks occurring between FCP and Load Event
          const fcpBoundary = typeof fcpMs === 'number' ? fcpMs : 0;
          const loadBoundary = typeof loadEvent === 'number' ? loadEvent : performance.now();
          let tbtLoadWindowMs = 0;
          let longTasksCount = 0;

          for (const task of (perf.longTasks || [])) {
            if (task.startTime >= fcpBoundary && task.startTime <= loadBoundary) {
              if (task.duration > 50) {
                tbtLoadWindowMs += (task.duration - 50);
                longTasksCount++;
              }
            }
          }

          return JSON.stringify({
            fcpMs,
            lcpMs,
            cls: perf.layoutShifts && perf.layoutShifts.length > 0 ? Math.round(maxClsSessionScore * 1000) / 1000 : 0,
            tbtMs: tbtLoadWindowMs,
            longTasksCount,
            dnsMs: dns,
            connectMs: connect,
            ttfbMs: ttfb,
            domInteractiveMs: domInteractive,
            domContentLoadedMs: domContentLoaded,
            loadEventMs: loadEvent,
          });
        })()
      `,
      returnByValue: true,
    });

    const parsed = JSON.parse(evalResult.result?.value || '{}');

    const fcpMs = typeof parsed.fcpMs === 'number' ? parsed.fcpMs : null;
    const lcpMs = typeof parsed.lcpMs === 'number' ? parsed.lcpMs : null;
    const tbtMs = typeof parsed.tbtMs === 'number' ? parsed.tbtMs : null;
    const cls = typeof parsed.cls === 'number' ? Math.round(parsed.cls * 1000) / 1000 : null;
    const ttfbMs = typeof parsed.ttfbMs === 'number' ? parsed.ttfbMs : null;

    const perfScore = calculateCoreWebPerformanceScore({ lcpMs, tbtMs, fcpMs, cls, ttfbMs });

    const formatMs = (val: number | null): string | null => {
      if (val === null || val === undefined || isNaN(val)) return null;
      if (val >= 1000) return `${(val / 1000).toFixed(1)} s`;
      return `${Math.round(val)} ms`;
    };

    const methodologyNote = strategy === 'mobile'
      ? 'Performance metrics measured in Chromium via CDP using mobile viewport (412x823) and mobile User-Agent emulation without CPU/network throttling. Scores use CoreSlash log-normal methodology.'
      : 'Performance metrics measured in Chromium via CDP using desktop viewport (1350x940) without CPU/network throttling. Scores use CoreSlash log-normal methodology.';

    return {
      isMeasured: true,
      status: 'SUCCESS',
      strategy,
      score: perfScore,
      accessibilityScore: null,
      seoScore: null,
      bestPracticesScore: null,
      fcp: formatMs(fcpMs),
      lcp: formatMs(lcpMs),
      tbt: tbtMs !== null ? `${Math.round(tbtMs)} ms` : null,
      cls: cls !== null ? cls.toString() : null,
      ttfb: formatMs(ttfbMs),
      domInteractive: formatMs(parsed.domInteractiveMs),
      loadEvent: formatMs(parsed.loadEventMs),
      methodologyNote,
      navigationTiming: {
        dnsMs: parsed.dnsMs ? Math.round(parsed.dnsMs) : null,
        connectMs: parsed.connectMs ? Math.round(parsed.connectMs) : null,
        ttfbMs: parsed.ttfbMs ? Math.round(parsed.ttfbMs) : null,
        domInteractiveMs: parsed.domInteractiveMs ? Math.round(parsed.domInteractiveMs) : null,
        domContentLoadedMs: parsed.domContentLoadedMs ? Math.round(parsed.domContentLoadedMs) : null,
        loadEventMs: parsed.loadEventMs ? Math.round(parsed.loadEventMs) : null,
      },
    };
  } catch (err: any) {
    logger.warn(`Strategy ${strategy} failed: ${err.message}`);
    return {
      isMeasured: false,
      status: 'FAILED',
      strategy,
      score: null,
      accessibilityScore: null,
      fcp: null,
      lcp: null,
      tbt: null,
      cls: null,
      ttfb: null,
      domInteractive: null,
      loadEvent: null,
      error: err.message || `${strategy} measurement failed.`,
    };
  } finally {
    if (pageClient) {
      try { await pageClient.close(); } catch {}
    }
    if (targetId && browserClient) {
      try { await browserClient.send('Target.closeTarget', { targetId }); } catch {}
    }
  }
}

