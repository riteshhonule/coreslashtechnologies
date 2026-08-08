export const AUTH_CONSTANTS = {
  BCRYPT_SALT_ROUNDS: 10,
  IS_PUBLIC_KEY: 'isPublic',
  ROLES_KEY: 'roles',
  PERMISSIONS_KEY: 'permissions',
  PERMISSION_CACHE_TTL_MS: 300000, // 5 minutes in-memory cache
} as const;

export const DEFAULT_PERMISSIONS = [
  { slug: 'users.read', name: 'Read Users', description: 'View user details and list users' },
  { slug: 'users.create', name: 'Create Users', description: 'Create new user accounts' },
  { slug: 'users.update', name: 'Update Users', description: 'Update existing user accounts' },
  { slug: 'users.delete', name: 'Delete Users', description: 'Soft delete user accounts' },

  { slug: 'blogs.read', name: 'Read Blogs', description: 'View blog posts' },
  { slug: 'blogs.create', name: 'Create Blogs', description: 'Create new blog posts' },
  { slug: 'blogs.update', name: 'Update Blogs', description: 'Edit existing blog posts' },
  { slug: 'blogs.delete', name: 'Delete Blogs', description: 'Delete blog posts' },
  { slug: 'blogs.publish', name: 'Publish Blogs', description: 'Publish blog posts' },

  { slug: 'services.read', name: 'Read Services', description: 'View services' },
  { slug: 'services.create', name: 'Create Services', description: 'Create new service' },
  { slug: 'services.update', name: 'Update Services', description: 'Update existing service' },
  { slug: 'services.delete', name: 'Delete Services', description: 'Delete service' },

  { slug: 'portfolio.read', name: 'Read Portfolio', description: 'View portfolio projects' },
  { slug: 'portfolio.create', name: 'Create Portfolio', description: 'Create portfolio project' },
  { slug: 'portfolio.update', name: 'Update Portfolio', description: 'Update portfolio project' },
  { slug: 'portfolio.delete', name: 'Delete Portfolio', description: 'Delete portfolio project' },

  { slug: 'careers.read', name: 'Read Careers', description: 'View job postings' },
  { slug: 'careers.create', name: 'Create Careers', description: 'Create job posting' },
  { slug: 'careers.update', name: 'Update Careers', description: 'Update job posting' },
  { slug: 'careers.delete', name: 'Delete Careers', description: 'Delete job posting' },

  { slug: 'contact.read', name: 'Read Inquiries', description: 'View contact inquiries' },
  { slug: 'contact.update', name: 'Update Inquiries', description: 'Update contact inquiry status' },
  { slug: 'contact.delete', name: 'Delete Inquiries', description: 'Delete contact inquiries' },

  { slug: 'newsletter.read', name: 'Read Newsletter Subscribers', description: 'View newsletter subscribers' },
  { slug: 'newsletter.delete', name: 'Delete Newsletter Subscribers', description: 'Remove newsletter subscribers' },

  { slug: 'faq.read', name: 'Read FAQs', description: 'View FAQs' },
  { slug: 'faq.create', name: 'Create FAQs', description: 'Create FAQ item' },
  { slug: 'faq.update', name: 'Update FAQs', description: 'Update FAQ item' },
  { slug: 'faq.delete', name: 'Delete FAQs', description: 'Delete FAQ item' },

  { slug: 'seo.read', name: 'Read SEO Meta', description: 'View SEO meta configuration' },
  { slug: 'seo.create', name: 'Create SEO Meta', description: 'Create SEO meta entries' },
  { slug: 'seo.update', name: 'Update SEO Meta', description: 'Update SEO meta entries' },
  { slug: 'seo.delete', name: 'Delete SEO Meta', description: 'Delete SEO meta entries' },

  { slug: 'media.read', name: 'Read Media', description: 'View media library' },
  { slug: 'media.upload', name: 'Upload Media', description: 'Upload media files' },
  { slug: 'media.delete', name: 'Delete Media', description: 'Delete media files' },

  { slug: 'settings.read', name: 'Read Settings', description: 'View system settings' },
  { slug: 'settings.update', name: 'Update Settings', description: 'Update system settings' },

  { slug: 'dashboard.read', name: 'Read Dashboard', description: 'Access dashboard metrics' },

  { slug: 'auth.login', name: 'Auth Login', description: 'Authenticate into backend system' },
  { slug: 'auth.logout', name: 'Auth Logout', description: 'Logout from backend system' },
] as const;
