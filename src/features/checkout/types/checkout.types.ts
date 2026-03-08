import type { CartItem } from '@/features/cart/types/cart.types';

export type BorrowDuration = 3 | 5 | 10;

export interface CheckoutFormState {
  readonly borrowDate: string;
  readonly duration: BorrowDuration;
  readonly agreeReturn: boolean;
  readonly agreePolicy: boolean;
}

export interface BorrowRequest {
  readonly bookIds: readonly number[];
  readonly borrowDate: string;
  readonly duration: BorrowDuration;
}

export interface CheckoutPageData {
  readonly items: readonly CartItem[];
  readonly userName: string;
  readonly userEmail: string;
  readonly userPhone: string;
}
