/**
 * Centralized Cache TTL Constants (in seconds).
 */
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 1800, // 30 minutes
  VERY_LONG: 3600, // 1 hour
} as const;

/**
 * Cache Namespace Prefix
 */
export const CACHE_NAMESPACE = 'coreslash:cache:';
