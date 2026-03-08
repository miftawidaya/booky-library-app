'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReviewCard } from '@/features/reviews/components/review-card';
import { ReviewForm } from '@/features/reviews/components/review-form';
import { Button } from '@/components/ui/button';
import type { Review } from '@/features/reviews/types/reviews.types';
import { getBookReviews } from '@/features/reviews/api/reviews.api';
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
  const [reviews, setReviews] = useState<Review[]>(initialReviews.slice(0, 6));
  const [total, setTotal] = useState(totalReviews);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  const deleteReview = useDeleteReview({
    onSuccess: () => {
      toast.success('Review deleted');
    },
    onError: (error: Error) => {
      // Rollback: re-add the review if delete failed
      toast.error(error.message);
      // Force page refresh to restore state
      globalThis.location.reload();
    },
  });

  const hasMore = reviews.length < total;

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

  const handleReviewCreated = (review: Review) => {
    // Optimistic: deduplicate (endpoint is create-or-update) then prepend
    setReviews((prev) => {
      const filtered = prev.filter((r) => r.id !== review.id);
      return [review, ...filtered];
    });
    setTotal((prev) => {
      // Only increment if this is truly a new review (not an update)
      const existed = reviews.some((r) => r.id === review.id);
      return existed ? prev : prev + 1;
    });
  };

  const handleDeleteReview = (reviewId: number) => {
    // Optimistic: remove review from list immediately
    setDeletingId(reviewId);
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    setTotal((prev) => prev - 1);
    setDeletingId(null);

    // Fire mutation
    deleteReview.mutate(reviewId);
  };

  return (
    <div className='flex flex-col gap-6 md:gap-8'>
      {/* Review Form */}
      <ReviewForm
        bookId={Number(bookId)}
        onReviewCreated={handleReviewCreated}
      />

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
