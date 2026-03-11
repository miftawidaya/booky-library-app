import { paths } from '@/config/routes';

/**
 * Navigation item shape shared by all navigation configs.
 */
type NavItem = Readonly<{
  label: string;
  href: string;
}>;

/**
 * User dropdown menu items shown in the header.
 */
export const userMenuItems: readonly NavItem[] = [
  { label: 'Profile', href: paths.user.profile },
  { label: 'Borrowed List', href: paths.user.borrowed },
  { label: 'Reviews', href: paths.user.reviews },
];

/**
 * Admin tab navigation items.
 */
export const adminTabItems: readonly NavItem[] = [
  { label: 'Borrowed List', href: paths.admin.loans },
  { label: 'User', href: paths.admin.users },
  { label: 'Book List', href: paths.admin.books },
];
