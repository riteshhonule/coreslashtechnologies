/**
 * Centralized Cache Keys Factory.
 * Ensures predictable namespaces and prevents accidental key collisions.
 */
export const CACHE_KEYS = {
  USER: (id: number | string): string => `coreslash:cache:user:${id}`,
  PERMISSION_ROLE: (role: string): string => `coreslash:cache:permission:${role}`,
  SETTINGS: 'coreslash:cache:settings',
  BLOG: (id: number | string): string => `coreslash:cache:blog:${id}`,
  PERMISSION_PATTERN: 'coreslash:cache:permission:*',
} as const;
