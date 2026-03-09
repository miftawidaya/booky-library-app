'use client';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { selectSelectedIds, clearCartSelections } from '@/features/cart/store';
import { useCart } from '@/features/cart/api/cart.queries';
import { CheckoutUserInfo } from '@/features/checkout/components/checkout-user-info';
import { CheckoutBookList } from '@/features/checkout/components/checkout-book-list';
import { CheckoutBorrowForm } from '@/features/checkout/components/checkout-borrow-form';
import type { RootState } from '@/lib/store';
import type { BorrowDuration } from '@/features/checkout/types/checkout.types';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TanStack Query handles the actual data
  const { data: cartItems = [] } = useCart();

  // Redux only dictates WHICH of those items are checked out
  const selectedIds = useSelector(selectSelectedIds) ?? [];
  const selectedItems = useMemo(() => {
    return cartItems.filter((i) => selectedIds.includes(i.bookId));
  }, [cartItems, selectedIds]);

  const user = useSelector((state: RootState) => state.auth.user);

  // Redirect if no items selected
  if (selectedItems.length === 0) {
    return (
      <div className='custom-container flex max-w-250 flex-col items-center justify-center gap-4 py-20'>
        <p className='text-foreground text-lg font-bold'>
          No books selected for checkout
        </p>
        <p className='text-muted-foreground text-md'>
          Please go back to your cart and select books to borrow.
        </p>
        <button
          type='button'
          onClick={() => router.push('/cart')}
          className='text-primary hover:text-primary/80 text-md font-bold underline transition-colors'
        >
          Go to Cart
        </button>
      </div>
    );
  }

  const handleBorrow = async (borrowDate: string, duration: BorrowDuration) => {
    setIsSubmitting(true);

    try {
      // Get server cart item IDs from selected items
      const itemIds = selectedItems
        .map((item) => item.serverItemId)
        .filter((id): id is number => id != null);

      if (itemIds.length === 0) {
        toast.error(
          'Cart items are not synced with server. Please refresh and try again.'
        );
        return;
      }

      const { createLoanFromCart } =
        await import('@/features/checkout/api/checkout.api');
      const result = await createLoanFromCart({
        itemIds,
        borrowDate,
        duration,
      });

      // Use the first loan for the success page
      const firstLoan = result.data.loans[0];
      const loanId = firstLoan?.id;

      // Calculate due date: prefer backend response, fallback to form values
      const dueDate =
        firstLoan?.dueDate ??
        new Date(
          new Date(borrowDate).getTime() + duration * 24 * 60 * 60 * 1000
        ).toISOString();

      // Remove borrowed items purely by clearing Redux selected state
      dispatch(clearCartSelections());

      // Invalidate the cart query so next time they visit cart it fetches fresh state without borrowed items
      void queryClient.invalidateQueries({ queryKey: ['cart'] });

      const successParams = new URLSearchParams();
      if (loanId) successParams.set('loanId', String(loanId));
      successParams.set('dueDate', dueDate);

      router.push(`/checkout/success?${successParams.toString()}`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to process borrow request. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='custom-container flex max-w-250 flex-col gap-8 py-10 md:py-14'>
      <h1 className='text-display-sm md:text-display-md text-foreground font-bold'>
        Checkout
      </h1>

      <div className='flex flex-col gap-y-6 md:flex-row md:items-start md:gap-x-15'>
        {/* Left Column: User Info + Book List */}
        <div className='flex flex-1 flex-col gap-4 md:gap-8'>
          <CheckoutUserInfo
            name={user?.name ?? 'Guest'}
            email={user?.email ?? '-'}
            phone={user?.phone ?? '-'}
          />

          <hr className='border-border border-t' />

          <CheckoutBookList items={selectedItems} />
        </div>

        {/* Right Column: Borrow Form */}
        <div className='w-full shrink-0 md:w-120'>
          <CheckoutBorrowForm
            isSubmitting={isSubmitting}
            onSubmit={handleBorrow}
          />
        </div>
      </div>
    </div>
  );
}
