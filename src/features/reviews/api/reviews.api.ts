import { API_URL } from '@/config/env';
import { Review } from '@/features/reviews/types/reviews.types';

export interface PaginatedReviews {
  reviews: Review[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getBookReviews = async (
  bookId: string | number,
  page: number = 1,
  limit: number = 6
): Promise<PaginatedReviews> => {
  const res = await fetch(
    `${API_URL}/reviews/book/${bookId}?page=${page}&limit=${limit}`,
    {
      cache: 'no-store',
      headers: {
        accept: '*/*',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch reviews');
  }

  const json = await res.json();

  return {
    reviews: json.data?.reviews || [],
    pagination: json.data?.pagination || {
      total: 0,
      page: 1,
      limit: 6,
      totalPages: 1,
    },
  };
};
