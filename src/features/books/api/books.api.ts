import {
  CategoryOption,
  BooksFilterParams,
  BooksResponse,
} from '../types/books.types';

import { API_URL } from '@/config/env';

export const getCategories = async (): Promise<CategoryOption[]> => {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  const json = await res.json();
  return json.data.categories || [];
};

export const getBooks = async (
  params: BooksFilterParams
): Promise<BooksResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.set('categoryId', params.category);
    if (params.q) queryParams.set('q', params.q);
    if (params.minRating) queryParams.set('minRating', params.minRating);
    if (params.page) queryParams.set('page', params.page.toString());
    queryParams.set('limit', (params.limit || 24).toString());

    const res = await fetch(`${API_URL}/books?${queryParams.toString()}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch books');
    }

    const json = await res.json();
    const items = json.data.books || json.data.items || [];
    const pagination = json.data.pagination || {
      total: items.length,
      page: params.page || 1,
      limit: items.length,
      totalPages: 1,
    };

    return {
      items,
      pagination,
    };
  } catch (error) {
    console.error('Failed to fetch books', error);
    throw new Error('Failed to load books. Please try again later.');
  }
};

export const getBookById = async (
  id: string
): Promise<import('@/features/home/types/home.types').Book> => {
  try {
    const res = await fetch(`${API_URL}/books/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch book details');
    const json = await res.json();
    return json.data.book || json.data || json;
  } catch (error) {
    console.error(`Failed to fetch book ${id}`, error);
    throw new Error('Failed to load book details.');
  }
};
