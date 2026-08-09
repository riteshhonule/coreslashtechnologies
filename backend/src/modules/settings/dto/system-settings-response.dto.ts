export function sanitizeSystemSettings(settings: any) {
  if (!settings) {
    return null;
  }
  const { smtpPassword, ...safeSettings } = settings;
  return {
    ...safeSettings,
    isSmtpConfigured: Boolean(settings.smtpHost && settings.smtpUsername),
  };
}
