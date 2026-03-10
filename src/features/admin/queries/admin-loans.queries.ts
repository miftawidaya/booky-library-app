import { useInfiniteQuery } from '@tanstack/react-query';

import { getAdminLoans } from '../api/admin-loans.api';
import type { LoanStatusFilter } from '@/features/loans/types/loans.types';
import type { AdminLoanListResponse } from '../types/admin.types';

const ADMIN_LOANS_PER_PAGE = 6;

/**
 * Infinite query hook for fetching admin loan list.
 */
export function useAdminLoans(status: LoanStatusFilter = 'all', search = '') {
  return useInfiniteQuery<AdminLoanListResponse>({
    queryKey: ['admin-loans', status, search],
    queryFn: ({ pageParam }) =>
      getAdminLoans({
        status,
        page: pageParam as number,
        limit: ADMIN_LOANS_PER_PAGE,
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
              loan.book.author.name.toLowerCase().includes(lowerSearch) ||
              loan.borrower.name.toLowerCase().includes(lowerSearch)
          ),
        })),
      };
    },
  });
}
