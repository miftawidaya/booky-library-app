'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReviewCard } from '@/features/reviews/components/review-card';
import { ReviewForm } from '@/features/reviews/components/review-form';
import { Button } from '@/components/ui/button';
import type { Review } from '@/features/reviews/types/reviews.types';
import { useInfiniteReviews } from '@/features/reviews/api/reviews.queries';
import { useDeleteReview } from '@/features/reviews/api/reviews.mutations';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';
import type { RootState } from '@/lib/store';

interface ReviewListProps {
  readonly bookId: number | string;
  readonly initialReviews: Review[];
  readonly totalReviews: number;
}

export function ReviewList({
  bookId,
  initialReviews,
  totalReviews,
}: Readonly<ReviewListProps>) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteReviews(bookId, initialReviews, totalReviews);

  const deleteReview = useDeleteReview({
    onSuccess: () => {
      toast.success('Review deleted');
      setDeletingId(null);
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setDeletingId(null);
    },
  });

  const handleDeleteReview = (reviewId: number) => {
    setDeletingId(reviewId);
    deleteReview.mutate(reviewId);
  };

  const reviews = data?.pages.flatMap((page) => page.reviews) ?? [];

  return (
    <div className='flex flex-col gap-6 md:gap-8'>
      {/* Review Form */}
      <ReviewForm bookId={Number(bookId)} />

      {/* Review Grid */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            currentUserId={user?.id}
            onDelete={handleDeleteReview}
            isDeleting={deletingId === review.id}
          />
        ))}
      </div>

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
