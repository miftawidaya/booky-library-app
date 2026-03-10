import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getAdminBooks,
  type AdminBooksFilterParams,
} from '../api/admin-books.api';
import type { BooksResponse } from '@/features/books/types/books.types';

export function useInfiniteAdminBooks(
  params: Omit<AdminBooksFilterParams, 'page'>
) {
  return useInfiniteQuery<
    BooksResponse,
    Error,
    import('@tanstack/react-query').InfiniteData<BooksResponse>,
    readonly ['admin-books', typeof params],
    number
  >({
    queryKey: ['admin-books', params] as const,
    queryFn: ({ pageParam = 1 }) =>
      getAdminBooks({
        ...params,
        page: typeof pageParam === 'number' ? pageParam : 1,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });
}
