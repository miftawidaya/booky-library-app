import { useQuery } from '@tanstack/react-query';
import { getBooks } from './books.api';
import type { BooksResponse } from '../types/books.types';

export function useSearchBooks(query: string, limit = 5) {
  return useQuery<BooksResponse, Error>({
    queryKey: ['books-search', query, limit] as const,
    queryFn: () => getBooks({ q: query, limit }),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
