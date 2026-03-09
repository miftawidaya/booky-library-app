'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const USER_TABS = [
  { label: 'Profile', href: '/profile' },
  { label: 'Borrowed List', href: '/borrowed' },
  { label: 'Reviews', href: '/reviews' },
] as const;

/**
 * Tab navigation shared across user pages (Profile, Borrowed List, Reviews).
 * Styled per Figma: rounded container with shadow-activated tabs.
 */
export function UserTabNavigation() {
  const pathname = usePathname();

  return (
    <nav className='bg-secondary flex items-center gap-2 rounded-2xl p-2 md:w-139.25'>
      {USER_TABS.map((tab) => {
        const isActive = pathname === tab.href;
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
