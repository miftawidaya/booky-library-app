import type { MetadataRoute } from 'next';

import { sitemapRoutes } from '@/config/routes';
import { siteConfig } from '@/config/site-metadata';

/**
 * Priority mapping for sitemap routes.
 * Routes not listed here default to 0.5.
 */
const routePriority: Readonly<Record<string, number>> = {
  '/': 1,
  '/books': 0.9,
  '/authors': 0.7,
};

/**
 * Frequency mapping for sitemap routes.
 * Routes not listed here default to 'weekly'.
 */
const routeFrequency: Readonly<
  Record<string, MetadataRoute.Sitemap[number]['changeFrequency']>
> = {
  '/': 'weekly',
  '/books': 'daily',
};

/**
 * Generates a dynamic sitemap from the centralized sitemapRoutes config.
 * Auth, admin, and transactional pages are automatically excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return sitemapRoutes.map((route) => ({
    url: route === '/' ? baseUrl : `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: routeFrequency[route] ?? 'weekly',
    priority: routePriority[route] ?? 0.5,
  }));
}
