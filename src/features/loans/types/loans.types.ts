/**
 * Backend loan statuses as returned in the API response.
 */
export type LoanStatus = 'BORROWED' | 'RETURNED' | 'LATE';

/**
 * Frontend filter options sent as query params (lowercase, matching Swagger).
 */
export type LoanStatusFilter = 'all' | 'active' | 'returned' | 'overdue';

export interface Loan {
  readonly id: number;
  readonly status: LoanStatus;
  readonly displayStatus: string;
  readonly borrowedAt: string;
  readonly dueAt: string;
  readonly returnedAt: string | null;
  readonly durationDays: number;
  readonly book: {
    readonly id: number;
    readonly title: string;
    readonly isbn: string;
    readonly coverImage: string | null;
    readonly rating: number;
    readonly reviewCount: number;
    readonly totalCopies: number;
    readonly availableCopies: number;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly author: {
      readonly id: number;
      readonly name: string;
    };
    readonly category?: {
      readonly id: number;
      readonly name: string;
    } | null;
  };
}

export interface LoanPagination {
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface LoanListResponse {
  readonly loans: Loan[];
  readonly pagination: LoanPagination;
}

export interface GetMyLoansParams {
  readonly status?: LoanStatusFilter;
  readonly page?: number;
  readonly limit?: number;
  readonly q?: string;
}
