'use client';

import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Review } from '../types/reviews.types';

interface ReviewCardProps {
  readonly review: Review;
  readonly className?: string;
  readonly currentUserId?: number | string | null;
  readonly onDelete?: (reviewId: number) => void;
  readonly isDeleting?: boolean;
}

export function ReviewCard({
  review,
  className,
  currentUserId,
  onDelete,
  isDeleting,
}: ReviewCardProps) {
  const isOwnReview =
    currentUserId != null && String(review.userId) === String(currentUserId);

  return (
    <div
      className={cn(
        'shadow-card dark:border-border bg-background flex flex-col gap-4 rounded-2xl p-4 transition-all duration-300 dark:border dark:shadow-none',
        isDeleting && 'pointer-events-none opacity-50',
        className
      )}
    >
      {/* Header: Avatar + Info + Delete */}
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-center gap-3 md:items-start'>
          {/* Avatar */}
          <div className='bg-secondary relative size-10 shrink-0 overflow-hidden rounded-full md:size-12'>
            {review.user?.photo ? (
              <Image
                src={review.user.photo}
                alt={review.user.name ?? 'User'}
                fill
                unoptimized
                sizes='(max-width: 768px) 40px, 48px'
                className='object-cover'
              />
            ) : (
              <div className='bg-secondary flex size-full items-center justify-center'>
                <Icon
                  icon='ri:user-line'
                  className='text-muted-foreground size-5'
                />
              </div>
            )}
          </div>

          {/* Info: Name + Date */}
          <div className='flex flex-col'>
            <span className='md:text-md text-foreground text-sm font-extrabold'>
              {review.user?.name ?? 'Anonymous'}
            </span>
            <span 
              className='text-foreground text-xs font-normal tracking-tight md:text-sm'
              suppressHydrationWarning
            >
              {dayjs(review.createdAt).format('D MMMM YYYY, HH:mm')}
            </span>
          </div>
        </div>

        {/* Delete Button */}
        {isOwnReview && onDelete && (
          <button
            type='button'
            onClick={() => onDelete(review.id)}
            disabled={isDeleting}
            className='text-muted-foreground hover:text-destructive focus-visible:ring-ring rounded-full p-1 transition-colors focus-visible:ring-2 focus-visible:outline-none'
            aria-label='Delete review'
          >
            <Icon icon='ri:delete-bin-6-line' className='size-4.5' />
          </button>
        )}
      </div>

      {/* Content: Rating + Comment */}
      <div className='flex flex-col gap-2'>
        {/* Stars */}
        <div className='flex gap-0.5'>
          {[1, 2, 3, 4, 5].map((starIdx) => (
            <Icon
              key={`review-star-${review.id}-${starIdx}`}
              icon='ri:star-fill'
              className={cn(
                'size-4.5',
                starIdx <= (review.rating ?? review.star ?? 0)
                  ? 'text-rating'
                  : 'text-muted'
              )}
              aria-hidden='true'
            />
          ))}
        </div>

        {/* Comment */}
        <p className='md:text-md text-foreground text-sm font-normal tracking-tight'>
          {review.comment ?? 'No comment provided.'}
        </p>
      </div>
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className='shadow-card dark:border-border bg-background flex flex-col gap-4 rounded-2xl p-4 dark:border dark:shadow-none'>
      <div className='flex items-start gap-3'>
        <div className='bg-secondary size-10 animate-pulse rounded-full md:size-12' />
        <div className='flex flex-1 flex-col gap-2 pt-1'>
          <div className='bg-secondary h-4 w-1/3 animate-pulse rounded md:h-5' />
          <div className='bg-secondary h-3 w-1/2 animate-pulse rounded md:h-4' />
        </div>
      </div>
      <div className='mt-2 flex flex-col gap-2'>
        <div className='flex gap-1'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={`skel-star-${i}`}
              className='bg-secondary size-4 animate-pulse rounded'
            />
          ))}
        </div>
        <div className='bg-secondary mt-2 h-4 w-full animate-pulse rounded' />
        <div className='bg-secondary h-4 w-2/3 animate-pulse rounded' />
      </div>
    </div>
  );
}
