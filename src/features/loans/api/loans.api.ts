import type {
  GetMyLoansParams,
  LoanListResponse,
  Loan,
} from '../types/loans.types';

interface ApiResponse {
  readonly success: boolean;
  readonly message: string;
  readonly data: {
    readonly loans?: Loan[];
    readonly pagination?: {
      readonly total: number;
      readonly page: number;
      readonly limit: number;
      readonly totalPages: number;
    };
  };
}

const DEFAULT_PAGINATION = {
  total: 0,
  page: 1,
  limit: 6,
  totalPages: 1,
} as const;

/**
 * Fetch the current user's loan history from the Next.js proxy.
 * Backend endpoint: GET /api/loans/my
 */
export async function getMyLoans(
  params: GetMyLoansParams = {}
): Promise<LoanListResponse> {
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
  const url = `/api/me/loans${suffix}`;

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
