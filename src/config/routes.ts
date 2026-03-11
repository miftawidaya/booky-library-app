/**
 * Centralized route definitions used by middleware (proxy),
 * sitemap generation, and robots.txt.
 *
 * Routes that need authentication or admin access are kept separate
 * so each consumer can pick the subset it needs.
 */

/**
 * Auth-related routes (login, register).
 * Public but excluded from sitemap since they have no indexable content.
 */
export const authRoutes = ['/login', '/register'] as const;

/**
 * Public routes accessible without authentication.
 * Includes auth routes for middleware compatibility.
 */
export const publicRoutes: readonly string[] = [
  '/',
  ...authRoutes,
  '/books',
  '/authors',
  '/search',
];

/**
 * Subset of public routes that should appear in the sitemap.
 * Excludes auth routes since they have no indexable content.
 */
export const sitemapRoutes = publicRoutes.filter(
  (route) => !(authRoutes as readonly string[]).includes(route),
);

/**
 * Admin-only routes requiring ADMIN role.
 */
export const adminRoutes = [
  '/admin',
  '/admin/books',
  '/admin/books/new',
  '/admin/users',
  '/admin/authors',
  '/admin/categories',
  '/admin/loans',
  '/admin/loans/new',
] as const;

/**
 * User-only routes requiring authentication (non-admin).
 */
export const userRoutes = [
  '/borrowed',
  '/profile',
  '/reviews',
] as const;

/**
 * Transactional routes requiring authentication.
 */
export const transactionalRoutes = [
  '/cart',
  '/checkout',
] as const;

/**
 * All routes that should be disallowed in robots.txt.
 * Combines admin, user, transactional, auth routes and API paths.
 */
export const robotsDisallowedPaths: readonly string[] = [
  '/admin/',
  '/api/',
  ...userRoutes.map((route) => `${route}/`),
  ...transactionalRoutes.map((route) => `${route}/`),
  ...authRoutes.map((route) => `${route}/`),
];
