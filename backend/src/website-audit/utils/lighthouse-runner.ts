import { runCdpPerformanceAuditPair, CdpMetricResult } from './cdp-runner';

export type LighthouseMetricResult = CdpMetricResult;

export async function runLocalLighthouseAudit(
  url: string,
  strategy: 'mobile' | 'desktop'
): Promise<LighthouseMetricResult> {
  const result = await runCdpPerformanceAuditPair(url);
  return strategy === 'mobile' ? result.mobile : result.desktop;
}

