import type { MetadataRoute } from 'next';

import { robotsDisallowedPaths } from '@/config/routes';
import { siteConfig } from '@/config/site-metadata';

/**
 * Generates a programmatic robots.txt from the centralized route config.
 * Disallowed paths are derived automatically from admin, user,
 * transactional, and auth route definitions.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [...robotsDisallowedPaths],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
