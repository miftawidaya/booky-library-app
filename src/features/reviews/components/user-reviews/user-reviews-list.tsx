'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { SearchMd } from '@untitledui/icons';

import { Button } from '@/components/ui/button';
import { useInfiniteMyReviews } from '@/features/reviews/api/reviews.queries';
import { UserReviewCard } from './user-review-card';

/**
 * Main client component for the User's Reviews List page.
 */
export function UserReviewsList() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteMyReviews();

  // Aggregate all reviews across infinite pages and de-duplicate by id
  const allReviews =
    data?.pages.flatMap((page) => page.reviews ?? []).filter(Boolean) ?? [];

  const reviews = Array.from(
    new Map(allReviews.map((r) => [r.id, r])).values()
  );

  // Frontend-filtered reviews via search
  const filteredReviews = reviews.filter((review) => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      review.book?.title?.toLowerCase().includes(lowerQuery) ||
      review.book?.author?.name?.toLowerCase().includes(lowerQuery) ||
      review.book?.authors?.[0]?.name?.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className='flex flex-col gap-5 md:gap-6'>
      {/* Search Bar */}
      <div className='border-input bg-card flex h-10 w-full max-w-136 items-center gap-2 rounded-full border ps-3 pe-3 md:h-12 md:ps-4 md:pe-4'>
        <SearchMd
          size={18}
          className='text-muted-foreground shrink-0 md:size-4.5'
        />
        <input
          type='text'
          placeholder='Search review...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='text-sm-bold placeholder:text-sm-regular text-foreground placeholder:text-muted-foreground w-full bg-transparent outline-none'
        />
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className='flex flex-col gap-4'>
          {['skel-1', 'skel-2', 'skel-3'].map((id) => (
            <div
              key={id}
              className='border-border bg-muted/30 h-86.5 w-full animate-pulse rounded-2xl border md:h-95'
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredReviews.length === 0 && (
        <div className='border-border bg-muted/20 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-14'>
          <Icon
            icon='ri:file-text-line'
            className='text-muted-foreground size-12 opacity-50'
          />
          <p className='text-muted-foreground font-medium'>
            {searchQuery
              ? 'No matching reviews found.'
              : "You haven't written any reviews yet."}
          </p>
        </div>
      )}

      {/* Review Cards */}
      {!isLoading && filteredReviews.length > 0 && (
        <div className='flex flex-col gap-4'>
          {filteredReviews.map((review) => (
            <UserReviewCard key={`rev-${review.id}`} review={review} />
          ))}
        </div>
      )}

      {/* Load More Pagination */}
      {hasNextPage && (
        <div className='mt-2 flex justify-center'>
          <Button
            variant='outline'
            className='h-11 w-full rounded-full font-bold md:w-auto md:min-w-50'
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <Icon icon='ri:loader-4-line' className='size-5 animate-spin' />
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
