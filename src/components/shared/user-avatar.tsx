'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Generates initials from a name.
 * @param name Full name of the user
 * @returns 1-2 character initials
 */
function getInitials(name: string | undefined): string {
  if (name == null || name.trim() === '') return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Generates a deterministic background color based on User ID.
 * @param userId Unique identifier for the user
 * @returns Tailwind-compatible color class
 */
function getAvatarColor(userId: string | number | undefined): string {
  if (userId == null) return 'bg-muted';
  
  const colors = [
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  ];

  // Simple hash
  const idStr = String(userId);
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = idStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

interface UserAvatarProps {
  readonly name?: string;
  readonly photo?: string | null;
  readonly userId?: string | number;
  readonly className?: string;
}

/**
 * A reusable User Avatar component with deterministic fallback (initials + color hash).
 */
export function UserAvatar({ name, photo, userId, className }: UserAvatarProps) {
  const initials = getInitials(name);
  const colorClass = getAvatarColor(userId);

  return (
    <div className={cn(
      'relative size-10 shrink-0 overflow-hidden rounded-full md:size-12 flex items-center justify-center font-bold text-xs md:text-sm',
      !photo && colorClass,
      className
    )}>
      {photo ? (
        <Image
          src={photo}
          alt={name ?? 'User'}
          fill
          unoptimized
          sizes='(max-width: 768px) 40px, 48px'
          className='object-cover'
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
