import { useInfiniteQuery } from '@tanstack/react-query';
import { getBookReviews, type PaginatedReviews } from './reviews.api';
import type { Review } from '../types/reviews.types';

export function useInfiniteReviews(
  bookId: number | string,
  initialData?: Review[],
  initialTotal?: number
) {
  return useInfiniteQuery({
    queryKey: ['reviews', String(bookId)],
    queryFn: async ({ pageParam = 1 }): Promise<PaginatedReviews> => {
      return getBookReviews(bookId, pageParam, 6);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.reviews.length < 6) {
        return undefined;
      }
      return lastPage.pagination.page + 1;
    },
    // Map initial SSR data into the infinite query structure safely
    initialData: initialData
      ? {
          pages: [
            {
              reviews: initialData,
              pagination: {
                page: 1,
                limit: 6,
                total: initialTotal ?? initialData.length,
                totalPages: initialData.length === 6 ? 2 : 1, // Fallback guess
              },
            },
          ],
          pageParams: [1],
        }
      : undefined,
  });
}
