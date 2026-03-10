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

export const getMyReviews = async (
  page: number = 1,
  limit: number = 3
): Promise<PaginatedReviews> => {
  const res = await fetch(`/api/me/reviews?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      accept: '*/*',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user reviews');
  }

  const json = await res.json();
  
  /**
   * Defensive mapping to handle multiple response variants from the backend.
   * Variant A: { success: true, data: { reviews: [...], pagination: {...} } }
   * Variant B: { success: true, data: [...], pagination: {...} }
   */
  const reviews = json.data?.reviews || (Array.isArray(json.data) ? json.data : []);
  const pagination = json.data?.pagination || json.pagination || {
    total: reviews.length,
    page: 1,
    limit: limit,
    totalPages: 1,
  };

  return {
    reviews,
    pagination,
  };
};
