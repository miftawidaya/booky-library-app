import type { BorrowDuration } from '@/features/checkout/types/checkout.types';

interface Loan {
  readonly id: number;
  readonly userId: number;
  readonly bookId: number;
  readonly loanDate: string;
  readonly dueDate: string;
  readonly returnDate: string | null;
  readonly status: 'active' | 'returned' | 'overdue';
  readonly book?: {
    readonly id: number;
    readonly title: string;
    readonly isbn: string;
    readonly coverImage: string | null;
    readonly author: {
      readonly id: number;
      readonly name: string;
    };
  };
}

interface CreateLoanResponse {
  readonly success: boolean;
  readonly message: string;
  readonly data: {
    readonly loans: readonly Loan[];
    readonly message: string;
  };
}

interface CreateLoanError {
  readonly success: false;
  readonly message: string;
  readonly data?: {
    readonly unavailableBooks?: ReadonlyArray<{
      readonly bookId: number;
      readonly title: string;
      readonly reason: string;
    }>;
  };
}

interface CreateLoanFromCartParams {
  readonly itemIds: readonly number[];
  readonly borrowDate: string;
  readonly duration: BorrowDuration;
}

/**
 * Create loans from cart items via the proxy /api/loans.
 * Uses backend endpoint /api/loans/from-cart with cart itemIds.
 */
export async function createLoanFromCart(
  params: CreateLoanFromCartParams
): Promise<CreateLoanResponse> {
  const response = await fetch('/api/loans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemIds: params.itemIds,
      borrowDate: params.borrowDate,
      duration: params.duration,
    }),
  });

  const data = (await response.json()) as CreateLoanResponse | CreateLoanError;

  if (response.ok === false) {
    const errorMsg =
      'data' in data && data.data && 'unavailableBooks' in data.data
        ? `${data.message}: ${data.data.unavailableBooks?.map((b) => b.title).join(', ')}`
        : data.message;
    throw new Error(errorMsg);
  }

  return data as CreateLoanResponse;
}
