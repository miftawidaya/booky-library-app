import { useInfiniteQuery } from '@tanstack/react-query';
import { API_URL } from '@/config/env';
import type { Book } from '../types/home.types';

interface RecommendedBooksResponse {
  success: boolean;
  message: string;
  data: {
    books: Book[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

async function fetchRecommendedBooks({
  pageParam = 1,
}): Promise<RecommendedBooksResponse> {
  const params = new URLSearchParams({
    by: 'rating',
    page: String(pageParam),
    limit: '10',
  });

  const response = await fetch(
    `${API_URL}/books/recommend?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recommended books');
  }

  return response.json();
}

export function useInfiniteRecommendedBooks(initialData?: Book[]) {
  return useInfiniteQuery({
    queryKey: ['recommendedBooks'],
    queryFn: fetchRecommendedBooks,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If the books returned are fewer than 10, we've definitively reached the end
      if (lastPage.data.books.length < 10) {
        return undefined;
      }
      // Read current page from real API response, or fallback to length of chunks mapped in TanStack
      const currentPage = lastPage.data.pagination?.page ?? allPages.length;
      return currentPage + 1;
    },
    // Map initial SSR data into the infinite query structure safely
    initialData: initialData
      ? {
          pages: [
            {
              success: true,
              message: 'Initial SSR data',
              data: {
                books: initialData,
                pagination: {
                  page: 1,
                  limit: 10,
                  total: initialData.length,
                  // Make sure we allow another page if exactly 10 items were returned initially
                  totalPages: initialData.length === 10 ? 2 : 1,
                },
              },
            },
          ],
          pageParams: [1],
        }
      : undefined,
  });
}
