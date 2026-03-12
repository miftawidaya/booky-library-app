import { API_URL } from '@/config/env';
import { AuthorBooksResponse } from '../types/authors.types';

export const getAuthorWithBooks = async (
  id: string,
  page: number = 1,
  limit: number = 12
): Promise<AuthorBooksResponse['data']> => {
  try {
    const res = await fetch(
      `${API_URL}/authors/${id}/books?page=${page}&limit=${limit}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch author details');
    }

    const json: AuthorBooksResponse = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Failed to fetch author ${id} books`, error);
    throw new Error('Failed to load author details.');
  }
};

export const getAuthorsDirectory = async (
  limit: number = 50
): Promise<any[]> => {
  try {
    const res = await fetch(`${API_URL}/authors/popular?limit=${limit}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch authors directory');
    }

    const json = await res.json();
    return json.data.authors || [];
  } catch (error) {
    console.error('Failed to fetch authors directory', error);
    return [];
  }
};
