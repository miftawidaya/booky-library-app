/**
 * Centralized route definitions used by middleware (proxy),
 * sitemap generation, robots.txt, and navigation.
 *
 * `paths` is the single source of truth. All flat arrays
 * (publicRoutes, adminRoutes, etc.) are derived from it.
 */

/**
 * Grouped path constants by domain.
 * Use these throughout the app instead of hardcoded route strings.
 *
 * @example
 * paths.auth.login      // '/login'
 * paths.user.cart        // '/cart'
 * paths.admin.loans      // '/admin/loans'
 * paths.public.books     // '/books'
 */
export const paths = {
  public: {
    home: '/',
    books: '/books',
    authors: '/authors',
    search: '/search',
  },
  auth: {
    login: '/login',
    register: '/register',
  },
  user: {
    profile: '/profile',
    borrowed: '/borrowed',
    reviews: '/reviews',
    cart: '/cart',
    checkout: '/checkout',
    checkoutSuccess: '/checkout/success',
  },
  admin: {
    dashboard: '/admin',
    loans: '/admin/loans',
    loansNew: '/admin/loans/new',
    users: '/admin/users',
    books: '/admin/books',
    booksNew: '/admin/books/new',
    authors: '/admin/authors',
    categories: '/admin/categories',
  },
} as const;

/**
 * Public routes accessible without authentication.
 * Derived from paths.public and paths.auth.
 */
export const publicRoutes: readonly string[] = [
  ...Object.values(paths.public),
  ...Object.values(paths.auth),
];

/**
 * Subset of public routes that should appear in the sitemap.
 * Excludes auth routes since they have no indexable content.
 */
const authValues = Object.values(paths.auth) as readonly string[];
export const sitemapRoutes = publicRoutes.filter(
  (route) => !authValues.includes(route),
);

/**
 * Admin-only routes requiring ADMIN role.
 * Derived from paths.admin.
 */
export const adminRoutes: readonly string[] = Object.values(paths.admin);

/**
 * User-only routes requiring authentication (non-admin).
 * Derived from paths.user.
 */
export const userRoutes: readonly string[] = Object.values(paths.user);

/**
 * All routes that should be disallowed in robots.txt.
 * Combines admin, user, auth routes and API paths.
 */
export const robotsDisallowedPaths: readonly string[] = [
  '/admin/',
  '/api/',
  ...Object.values(paths.user).map((route) => `${route}/`),
  ...Object.values(paths.auth).map((route) => `${route}/`),
];
