'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import type { RootState } from '@/lib/store';
import { SearchMd } from '@untitledui/icons';
import { SearchBar, MobileSearchInput } from './components/search-bar';
import {
  AuthButtons,
  UserMenu,
  MobileGuestActions,
} from './components/user-actions';

export function Header({ className }: Readonly<{ className?: string }>) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <header
      className={cn(
        'bg-background shadow-card dark:border-border sticky top-0 z-30 w-full dark:border-b dark:shadow-none',
        'h-16 md:h-20',
        className
      )}
    >
      <div className='custom-container relative flex h-full items-center justify-between gap-6'>
        {isAuthenticated && isMobileSearchOpen && (
          <MobileSearchInput onClose={() => setIsMobileSearchOpen(false)} />
        )}

        {/* Logo Area */}
        <div
          className={cn(
            'flex shrink-0 items-center',
            isMobileSearchOpen && 'max-md:hidden'
          )}
        >
          {/* Mobile Logo */}
          <Link href='/' className='flex items-center md:hidden'>
            <Logo
              variant='icon'
              className='text-primary [&>span]:text-foreground [&>svg]:size-10'
            />
          </Link>

          {/* Desktop Logo */}
          <Link href='/' className='hidden items-center md:flex'>
            <Logo size='lg' className='text-primary [&>span]:text-foreground' />
          </Link>
        </div>

        {/* Central Search Area */}
        {isAuthenticated && <SearchBar />}

        {/* User Actions Area */}
        <div
          className={cn(
            'flex items-center',
            isMobileSearchOpen && 'max-md:hidden'
          )}
        >
          {/* Universal Mobile Search Button */}
          {isAuthenticated && (
            <button
              type='button'
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label='Open search'
              className='hover:bg-muted focus-visible:ring-ring flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none md:hidden'
            >
              <SearchMd className='text-foreground size-5 shrink-0' />
            </button>
          )}

          {isAuthenticated === false && (
            <MobileGuestActions
              onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              isMenuOpen={isMobileMenuOpen}
            />
          )}

          {isAuthenticated && user ? (
            <UserMenu
              name={user.name}
              avatarUrl={user.profilePhoto ?? undefined}
              role={user.role}
            />
          ) : (
            <AuthButtons />
          )}
        </div>

        {/* Mobile Guest Menu Dropdown */}
        {isMobileMenuOpen && isAuthenticated === false && (
          <div className='border-border bg-background absolute inset-s-0 inset-e-0 top-16 -mt-px flex items-center gap-4 border-b p-4 shadow-sm md:hidden'>
            <Link
              href='/login'
              className='border-primary/20 bg-background text-foreground flex h-11 w-full items-center justify-center rounded-xl border focus-visible:ring-2 focus-visible:outline-none'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href='/register'
              className='bg-primary text-primary-foreground flex h-11 w-full items-center justify-center rounded-xl focus-visible:ring-2 focus-visible:outline-none'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
