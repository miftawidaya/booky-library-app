import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyLoans } from './loans.api';
import type { LoanStatusFilter, LoanListResponse } from '../types/loans.types';

const LOANS_PER_PAGE = 6;

/**
 * Infinite query hook for fetching the current user's loan history.
 * Supports status filtering and client-side search by book title or author.
 */
export function useMyLoans(status: LoanStatusFilter = 'all', search = '') {
  return useInfiniteQuery<LoanListResponse>({
    queryKey: ['my-loans', status, search],
    queryFn: ({ pageParam }) =>
      getMyLoans({
        status,
        page: pageParam as number,
        limit: LOANS_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      if (page < totalPages) {
        return page + 1;
      }
      return undefined;
    },
    select: (data) => {
      if (!search.trim()) return data;

      const lowerSearch = search.toLowerCase();
      return {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          loans: page.loans.filter(
            (loan) =>
              loan.book.title.toLowerCase().includes(lowerSearch) ||
              loan.book.author.name.toLowerCase().includes(lowerSearch)
          ),
        })),
      };
    },
  });
}
