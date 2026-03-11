import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react';
import type { Review } from '../../types/reviews.types';

interface UserReviewCardProps {
  readonly review: Review;
  readonly onEdit?: (review: Review) => void;
  readonly onDelete?: (reviewId: number) => void;
  readonly isDeleting?: boolean;
}

/**
 * UserReviewCard displays a single book review left by the authenticated user.
 */
export function UserReviewCard({
  review,
  onEdit,
  onDelete,
  isDeleting,
}: UserReviewCardProps) {
  // Normalize the star value from the payload
  const starCount = review.star ?? review.rating ?? 0;
  // Format Date to match "25 August 2025, 13:38"
  const formattedDate = dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm');

  return (
    <div
      className={`card w-full ${isDeleting ? 'pointer-events-none opacity-50' : ''}`}
    >
      {/* Date Header & Actions */}
      <div className='flex w-full items-center justify-between md:h-7.5'>
        <span
          className='text-foreground text-sm-semibold md:text-md-semibold'
          suppressHydrationWarning
        >
          {formattedDate}
        </span>

        {/* Actions Button Group */}
        {(onEdit || onDelete) && (
          <div className='flex items-center gap-1 md:gap-2'>
            {onEdit && (
              <button
                type='button'
                onClick={() => onEdit(review)}
                disabled={isDeleting}
                className='text-muted-foreground hover:text-primary focus-visible:ring-ring cursor-pointer rounded-full p-1 transition-colors focus-visible:ring-2 focus-visible:outline-none'
                aria-label='Edit review'
              >
                <Icon icon='ri:pencil-line' className='size-4.5 md:size-5' />
              </button>
            )}
            {onDelete && (
              <button
                type='button'
                onClick={() => onDelete(review.id)}
                disabled={isDeleting}
                className='text-muted-foreground hover:text-destructive focus-visible:ring-ring cursor-pointer rounded-full p-1 transition-colors focus-visible:ring-2 focus-visible:outline-none'
                aria-label='Delete review'
              >
                <Icon icon='ri:delete-bin-6-line' className='size-4.5 md:size-5' />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className='bg-border h-px w-full' />

      {/* Main Content Area */}
      <div className='flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:gap-28.75'>
        {/* Left Side: Book Info (Image + Details) */}
        <div className='flex items-center gap-3 md:w-full md:flex-1 md:gap-4'>
          {/* Cover Image */}
          <Link
            href={`/books/${review.book?.id}`}
            className='bg-muted relative h-26.5 w-17.5 shrink-0 overflow-hidden rounded-md transition-opacity hover:opacity-80 md:h-34.5 md:w-23'
          >
            {review.book?.coverImage ? (
              <Image
                src={review.book.coverImage}
                alt={review.book.title ?? 'Book cover'}
                fill
                unoptimized
                sizes='(max-width: 768px) 70px, 92px'
                className='object-cover'
              />
            ) : (
              <div className='flex size-full items-center justify-center p-2'>
                <Icon
                  icon='ri:book-2-line'
                  className='text-muted-foreground size-6 opacity-30 md:size-8'
                />
              </div>
            )}
          </Link>

          {/* Book Details */}
          <div className='flex flex-1 flex-col items-start gap-1'>
            {/* Category Tag */}
            {review.book?.category && (
              <Link
                href={`/books?category=${review.book.category.id}`}
                className='border-border text-foreground text-sm-bold hover:bg-muted flex h-7 items-center justify-center rounded-md border px-2'
              >
                {review.book.category.name}
              </Link>
            )}

            {/* Book Title */}
            <Link
              href={`/books/${review.book?.id}`}
              className='hover:underline'
            >
              <h3 className='text-foreground text-md-bold md:text-xl-bold line-clamp-1'>
                {review.book?.title}
              </h3>
            </Link>

            {/* Author */}
            <p className='text-muted-foreground text-sm-medium md:text-md-medium'>
              {review.book?.author?.name ??
                review.book?.authors?.[0]?.name ??
                'Unknown Author'}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='bg-border h-px w-full' />

      {/* Bottom Area: Rating & Comment */}
      <div className='flex w-full flex-col items-start gap-2'>
        {/* Stars */}
        <div className='flex items-center gap-0.5'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`star-${review.id}-${i}`} className='relative size-6'>
              <Icon
                icon='ri:star-fill'
                className={`absolute inset-0 size-full ${
                  i < starCount ? 'text-rating' : 'text-muted'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Comment Text */}
        <p className='text-foreground text-sm-semibold md:text-md-semibold line-clamp-3 md:line-clamp-2'>
          {review.comment ?? 'No comment provided.'}
        </p>
      </div>
    </div>
  );
}
