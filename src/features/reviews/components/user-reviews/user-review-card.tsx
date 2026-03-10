import Image from 'next/image';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react';
import type { Review } from '../../types/reviews.types';

interface UserReviewCardProps {
  readonly review: Review;
}

/**
 * UserReviewCard displays a single book review left by the authenticated user.
 * It strictly matches the stylistic choices specified in the Figma mockup
 * (both mobile and desktop adaptations).
 */
export function UserReviewCard({ review }: UserReviewCardProps) {
  // Normalize the star value from the payload (handles potential misspellings or legacy payload)
  const starCount = review.star ?? review.rating ?? 0;
  // Format Date to match "25 August 2025, 13:38"
  const formattedDate = dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm');

  return (
    <div className='bg-primary-foreground shadow-card flex w-full flex-col items-start gap-4 rounded-2xl p-4 md:h-95 md:gap-5 md:p-5'>
      {/* Date Header */}
      <div className='flex items-center gap-3 md:h-[30px]'>
        <span className='text-foreground font-quicksand text-sm leading-7 font-semibold tracking-[-0.02em] md:text-base md:leading-[30px]'>
          {formattedDate}
        </span>
      </div>

      {/* Divider */}
      <div className='border-border/60 h-px w-full border-t border-solid' />

      {/* Main Content Area */}
      <div className='flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:gap-[115px]'>
        {/* Left Side: Book Info (Image + Details) */}
        <div className='flex items-center gap-3 md:w-full md:flex-1 md:gap-4'>
          {/* Cover Image */}
          <div className='bg-muted relative h-[106px] w-[70px] shrink-0 overflow-hidden rounded-md md:h-[138px] md:w-[92px]'>
            {review.book?.coverImage ? (
              <Image
                src={review.book.coverImage}
                alt={review.book.title}
                fill
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
          </div>

          {/* Book Details */}
          <div className='flex flex-col items-start gap-1'>
            {/* Category Tag */}
            <div className='border-border box-border flex h-7 items-center justify-center rounded-md border px-2'>
              <span className='text-foreground font-quicksand text-sm leading-7 font-bold tracking-[-0.02em]'>
                {review.book?.category?.name ?? 'Uncategorized'}
              </span>
            </div>

            {/* Book Title */}
            <h3 className='text-foreground font-quicksand line-clamp-1 text-base leading-[30px] font-bold tracking-[-0.02em] md:text-xl md:leading-[34px]'>
              {review.book?.title}
            </h3>

            {/* Author */}
            <p className='font-quicksand text-sm leading-7 font-medium tracking-[-0.03em] text-[#414651] md:text-base md:leading-[30px]'>
              {review.book?.author?.name ?? 'Unknown Author'}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='border-border/60 h-px w-full border-t border-solid' />

      {/* Bottom Area: Rating & Comment */}
      <div className='flex w-full flex-col items-start gap-2'>
        {/* Stars */}
        <div className='flex items-center gap-0.5'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='relative size-6'>
              <Icon
                icon='ri:star-fill'
                className={`absolute inset-0 size-full ${
                  i < starCount ? 'text-[#FFAB0D]' : 'text-neutral-300'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Comment Text */}
        <p className='text-foreground font-quicksand line-clamp-3 text-sm leading-7 font-semibold tracking-[-0.02em] md:line-clamp-2 md:text-base md:leading-[30px]'>
          {review.comment ?? 'No comment provided.'}
        </p>
      </div>
    </div>
  );
}
