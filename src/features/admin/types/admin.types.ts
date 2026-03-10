import type {
  LoanStatus,
  LoanStatusFilter,
  LoanPagination,
} from '@/features/loans/types/loans.types';

export interface AdminLoanBorrower {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly phone: string | null;
}

export interface AdminLoan {
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
    readonly coverImage: string | null;
    readonly author: {
      readonly id: number;
      readonly name: string;
    };
    readonly category?: {
      readonly id: number;
      readonly name: string;
    } | null;
  };
  readonly borrower: AdminLoanBorrower;
}

export interface AdminLoanListResponse {
  readonly loans: AdminLoan[];
  readonly pagination: LoanPagination;
}

export interface GetAdminLoansParams {
  readonly status?: LoanStatusFilter;
  readonly page?: number;
  readonly limit?: number;
  readonly q?: string;
}
