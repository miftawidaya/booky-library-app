'use client';

import { useState } from 'react';
import { ReviewCard } from '@/features/reviews/components/review-card';
import { Button } from '@/components/ui/button';
import { Review } from '@/features/reviews/types/reviews.types';
import { getBookReviews } from '@/features/reviews/api/reviews.api';
import { Icon } from '@iconify/react';

interface ReviewListProps {
  bookId: number | string;
  initialReviews: Review[];
  totalReviews: number;
}

export function ReviewList({
  bookId,
  initialReviews,
  totalReviews,
}: Readonly<ReviewListProps>) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews.slice(0, 6));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = reviews.length < totalReviews;

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const data = await getBookReviews(bookId, nextPage, 6);

      setReviews((prev) => [...prev, ...data.reviews]);
      setPage(nextPage);
    } catch (error) {
      console.error('Failed to load more reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-6 md:gap-8'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {hasMore && (
        <div className='mt-2 flex justify-center'>
          <Button
            variant='outline'
            className='h-11 w-full rounded-full font-bold md:w-auto md:min-w-50'
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? (
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
