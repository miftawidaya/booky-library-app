import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Review } from '@/features/reviews/types/reviews.types';

interface CreateReviewPayload {
  readonly bookId: number;
  readonly star: number;
  readonly comment: string;
}



interface ReviewApiResponse {
  readonly success: boolean;
  readonly message: string;
  readonly data?: Review;
}

/**
 * Creates or updates a review for a book via the proxy route.
 */
async function createReviewApi(
  payload: CreateReviewPayload
): Promise<ReviewApiResponse> {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ReviewApiResponse;

  if (response.ok === false) {
    throw new Error(data.message);
  }

  return data;
}


/**
 * Deletes own review via the proxy route.
 */
async function deleteReviewApi(reviewId: number): Promise<ReviewApiResponse> {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  const data = (await response.json()) as ReviewApiResponse;

  if (response.ok === false) {
    throw new Error(data.message);
  }

  return data;
}

/**
 * TanStack Query mutation hook for creating/updating a review.
 * Accepts an onSuccess callback for optimistic UI updates.
 */
export function useCreateReview(options?: {
  onSuccess?: (data: ReviewApiResponse) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReviewApi,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['reviews'] });
      void queryClient.invalidateQueries({ queryKey: ['my-reviews'] });
    },
  });
}

/**
 * Context type for optimistic updates.
 */
export type ReviewMutationContext = { previousReviews: unknown } | void | undefined;


/**
 * TanStack Query mutation hook for deleting own review.
 * Accepts options for optimistic UI updates including onMutate, onSuccess, and onError.
 */
export function useDeleteReview(options?: {
  onMutate?: (reviewId: number) => Promise<ReviewMutationContext> | ReviewMutationContext;
  onSuccess?: (data: ReviewApiResponse, variables: number, context: ReviewMutationContext) => void;
  onError?: (error: Error, variables: number, context: ReviewMutationContext) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReviewApi,
    onMutate: options?.onMutate,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}
