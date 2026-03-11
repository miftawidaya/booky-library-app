'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReviewCard } from '@/features/reviews/components/review-card';
import { ReviewForm } from '@/features/reviews/components/review-form';
import { GiveReviewDialog } from '@/features/reviews/components/give-review-dialog';
import { Button } from '@/components/ui/button';
import type { Review } from '@/features/reviews/types/reviews.types';
import { useInfiniteReviews } from '@/features/reviews/api/reviews.queries';
import { useDeleteReview } from '@/features/reviews/api/reviews.mutations';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import type { PaginatedReviews } from '@/features/reviews/api/reviews.api';
import type { RootState } from '@/lib/store';

type InfiniteReviewsData = { pages: PaginatedReviews[]; pageParams: unknown[] };

function removeReviewFromCache(
  old: InfiniteReviewsData | undefined,
  reviewId: number
): InfiniteReviewsData | undefined {
  if (!old) return old;
  return {
    ...old,
    pages: old.pages.map((page) => ({
      ...page,
      reviews: page.reviews.filter((r) => r.id !== reviewId),
    })),
  };
}

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
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteReviews(bookId, initialReviews, totalReviews);

  const deleteReview = useDeleteReview({
    onMutate: async (reviewId: number) => {
      // Cancel outgoing refetches so they don't overwrite optimistic data
      await queryClient.cancelQueries({ queryKey: ['reviews', String(bookId)] });

      // Snapshot the previous state containing arrays of pages
      const previousReviews = queryClient.getQueryData(['reviews', String(bookId)]);

      // Optimistically update the UI by filtering out the deleted review from all pages
      queryClient.setQueryData(
        ['reviews', String(bookId)],
        (old: InfiniteReviewsData | undefined) => removeReviewFromCache(old, reviewId)
      );

      return { previousReviews };
    },
    onSuccess: (_, reviewId, context) => {
      toast.success('Review deleted', {
        action: {
          label: 'Undo',
          onClick: () => {
            // Revert changes if User presses Undo
            if (context?.previousReviews) {
              queryClient.setQueryData(['reviews', String(bookId)], context.previousReviews);
              toast('Review restored');
            }
          },
        },
      });
      setDeletingId(null);
    },
    onError: (error, __, context) => {
      // Rollback UI update on failure
      if (context?.previousReviews) {
        queryClient.setQueryData(['reviews', String(bookId)], context.previousReviews);
      }
      toast.error(error.message || 'Failed to delete review');
      setDeletingId(null);
    },
  });

  const handleDeleteReview = (reviewId: number) => {
    setDeletingId(reviewId);
    deleteReview.mutate(reviewId);
  };

  // Aggregate all reviews across infinite pages and de-duplicate by id
  const allReviews = data?.pages.flatMap((page) => page.reviews) ?? [];
  const reviews = Array.from(
    new Map(allReviews.map((r) => [r.id, r])).values()
  );

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
            onEdit={setEditingReview}
            onDelete={handleDeleteReview}
            isDeleting={deletingId === review.id}
          />
        ))}
      </div>

      {/* Edit Review Dialog */}
      {editingReview && (
        <GiveReviewDialog
          bookId={Number(bookId)}
          reviewId={editingReview.id}
          open={!!editingReview}
          onOpenChange={(isOpen) => !isOpen && setEditingReview(null)}
          initialData={{
            star: editingReview.star ?? editingReview.rating ?? 0,
            comment: editingReview.comment ?? '',
          }}
        />
      )}

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
