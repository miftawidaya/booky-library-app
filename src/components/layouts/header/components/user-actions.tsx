'use client';

import Link from 'next/link';
import { XClose } from '@untitledui/icons';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount } from '@/features/cart/store';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { logout } from '@/features/auth/api/auth.api';
import { clearCredentials } from '@/features/auth/store/auth.slice';
import { toast } from 'sonner';

const USER_MENU_ITEMS = [
  {
    label: 'Profile',
    href: '/profile',
  },
  {
    label: 'Borrowed List',
    href: '/borrowed',
  },
  {
    label: 'Reviews',
    href: '/reviews',
  },
];

export function AuthButtons() {
  return (
    <div className='hidden items-center gap-3 md:flex'>
      <Button variant='outline' size='lg' className='min-w-32.5' asChild>
        <Link href='/login'>Login</Link>
      </Button>
      <Button size='lg' className='min-w-32.5' asChild>
        <Link href='/register'>Register</Link>
      </Button>
    </div>
  );
}

export function UserMenu({
  name,
  avatarUrl,
}: Readonly<{
  name: string;
  avatarUrl?: string;
}>) {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const cartCount = useSelector(selectCartCount);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearCredentials());
      queryClient.clear();
      router.push('/');
      toast.success('You have been logged out successfully.');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='flex items-center gap-4 md:gap-5'>
      <Link
        href='/cart'
        className='focus-visible:ring-ring relative flex size-10 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none'
        aria-label='Cart'
      >
        <Icon
          icon='lets-icons:bag-fill'
          className='text-foreground hover:text-foreground/80 size-5.75 shrink-0 md:size-6.5'
        />
        {cartCount > 0 && (
          <Badge
            variant='destructive'
            className='absolute top-1.5 right-1 flex size-5 translate-x-1 -translate-y-1 items-center justify-center rounded-full p-0 text-[10px] font-bold'
          >
            {cartCount}
          </Badge>
        )}
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className='focus-visible:ring-ring group flex cursor-pointer items-center gap-3 rounded-full transition-all hover:opacity-80 focus-visible:ring-2 focus-visible:outline-none data-[state=open]:opacity-80'>
          <Avatar className='border-border/50 size-10 border shadow-sm'>
            <AvatarImage
              src={avatarUrl ?? undefined}
              alt={name}
              className='object-cover'
            />
            <AvatarFallback className='bg-primary/10 text-primary font-bold'>
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className='hidden items-center gap-2 md:flex'>
            <span className='text-md-medium text-foreground tracking-tight'>
              {name}
            </span>
            <Icon
              icon='mdi:chevron-down'
              className='text-foreground size-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180'
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='border-border/50 w-56 rounded-xl border p-2 shadow-md'
        >
          <div className='flex flex-col gap-1 p-2 md:hidden'>
            <span className='truncate text-sm font-semibold'>{name}</span>
            <DropdownMenuSeparator />
          </div>

          {USER_MENU_ITEMS.map((item) => (
            <DropdownMenuItem
              key={item.label}
              asChild
              className='hover:bg-muted focus:bg-muted cursor-pointer rounded-lg p-2 text-sm font-medium'
            >
              <Link href={item.href ?? '#'}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            onClick={handleLogout}
            className='text-destructive focus:bg-destructive/10 cursor-pointer rounded-lg p-2 text-sm font-medium'
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function MobileGuestActions({
  onToggleMenu,
  isMenuOpen,
}: Readonly<{
  onToggleMenu: () => void;
  isMenuOpen: boolean;
}>) {
  return (
    <div className='flex items-center md:hidden'>
      <button
        type='button'
        onClick={onToggleMenu}
        className='text-foreground hover:bg-muted focus-visible:ring-ring flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none'
        aria-label='Toggle menu'
      >
        {isMenuOpen ? (
          <XClose className='size-6' />
        ) : (
          <Icon icon='ri:menu-fill' className='size-6' />
        )}
      </button>
    </div>
  );
}
