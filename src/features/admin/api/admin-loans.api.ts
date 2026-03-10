import type {
  GetAdminLoansParams,
  AdminLoanListResponse,
  AdminLoan,
} from '../types/admin.types';
import type { LoanPagination } from '@/features/loans/types/loans.types';

interface ApiResponse {
  readonly success: boolean;
  readonly message: string;
  readonly data: {
    readonly loans?: AdminLoan[];
    readonly pagination?: LoanPagination;
  };
}

const DEFAULT_PAGINATION = {
  total: 0,
  page: 1,
  limit: 6,
  totalPages: 1,
} as const;

/**
 * Fetch all loans from the admin endpoint via Next.js proxy.
 * Backend endpoint: GET /api/admin/loans
 */
export async function getAdminLoans(
  params: GetAdminLoansParams = {}
): Promise<AdminLoanListResponse> {
  const searchParams = new URLSearchParams();

  if (params.status && params.status !== 'all') {
    searchParams.set('status', params.status);
  }
  if (params.page) {
    searchParams.set('page', String(params.page));
  }
  if (params.limit) {
    searchParams.set('limit', String(params.limit));
  }

  const queryString = searchParams.toString();
  const suffix = queryString ? `?${queryString}` : '';
  const url = `/api/admin/loans${suffix}`;

  const response = await fetch(url);
  const json = (await response.json()) as ApiResponse;

  if (response.ok === false) {
    throw new Error(json.message);
  }

  const raw = json.data ?? {};

  return {
    loans: (raw.loans ?? []).filter(Boolean),
    pagination: raw.pagination ?? DEFAULT_PAGINATION,
  };
}
