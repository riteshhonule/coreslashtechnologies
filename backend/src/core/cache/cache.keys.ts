/**
 * Centralized Cache Keys Factory.
 * Ensures predictable namespaces and prevents accidental key collisions.
 */
export const CACHE_KEYS = {
  USER: (id: number | string): string => `coreslash:cache:user:${id}`,
  PERMISSION_ROLE: (role: string): string => `coreslash:cache:permission:${role}`,
  PERMISSION_PATTERN: 'coreslash:cache:permission:*',

  // Media
  MEDIA: (id: number | string): string => `coreslash:cache:media:${id}`,
  MEDIA_LIST: (query: string): string => `coreslash:cache:media:list:${query}`,
  MEDIA_PATTERN: 'coreslash:cache:media:*',

  // Settings
  WEBSITE_SETTINGS: 'coreslash:cache:settings:website',
  SYSTEM_SETTINGS: 'coreslash:cache:settings:system',
  SETTINGS_PATTERN: 'coreslash:cache:settings:*',

  // Services
  SERVICE: (idOrSlug: number | string): string => `coreslash:cache:service:${idOrSlug}`,
  SERVICES_LIST: (query: string): string => `coreslash:cache:services:list:${query}`,
  SERVICES_PATTERN: 'coreslash:cache:service:*',

  // Blogs
  BLOG: (idOrSlug: number | string): string => `coreslash:cache:blog:${idOrSlug}`,
  BLOGS_LIST: (query: string): string => `coreslash:cache:blogs:list:${query}`,
  BLOG_CATEGORIES: 'coreslash:cache:blog:categories',
  BLOG_TAGS: 'coreslash:cache:blog:tags',
  BLOG_PATTERN: 'coreslash:cache:blog:*',

  // Portfolio
  PORTFOLIO: (idOrSlug: number | string): string => `coreslash:cache:portfolio:${idOrSlug}`,
  PORTFOLIOS_LIST: (query: string): string => `coreslash:cache:portfolios:list:${query}`,
  PORTFOLIO_CATEGORIES: 'coreslash:cache:portfolio:categories',
  PORTFOLIO_PATTERN: 'coreslash:cache:portfolio:*',

  // FAQ
  FAQ: (id: number | string): string => `coreslash:cache:faq:${id}`,
  FAQS_LIST: (query: string): string => `coreslash:cache:faqs:list:${query}`,
  FAQ_PATTERN: 'coreslash:cache:faq:*',

  // Careers
  CAREER: (idOrSlug: number | string): string => `coreslash:cache:career:${idOrSlug}`,
  CAREERS_LIST: (query: string): string => `coreslash:cache:careers:list:${query}`,
  CAREER_PATTERN: 'coreslash:cache:career:*',

  // SEO
  SEO_PAGE: (page: string): string => `coreslash:cache:seo:${page}`,
  SEO_PATTERN: 'coreslash:cache:seo:*',

  // Dashboard
  DASHBOARD_STATS: 'coreslash:cache:dashboard:stats',
} as const;
