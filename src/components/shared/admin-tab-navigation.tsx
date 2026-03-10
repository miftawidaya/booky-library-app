'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ADMIN_TABS = [
  { label: 'Borrowed List', href: '/admin/loans' },
  { label: 'User', href: '/admin/users' },
  { label: 'Book List', href: '/admin/books' },
] as const;

/**
 * Tab navigation for admin management pages (Borrowed List, User, Book List).
 */
export function AdminTabNavigation() {
  const pathname = usePathname();

  return (
    <nav className='bg-secondary flex items-center gap-2 rounded-2xl p-2 md:w-139.25'>
      {ADMIN_TABS.map((tab) => {
        const isActive =
          pathname === tab.href || pathname.startsWith(tab.href + '/');
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex grow items-center justify-center rounded-xl px-3 py-2 text-sm transition-all md:w-43.75 md:grow-0 md:text-base ${
              isActive
                ? 'bg-background text-foreground shadow-card dark:border-border font-bold dark:shadow-none'
                : 'text-muted-foreground font-medium'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
