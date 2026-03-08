'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@/components/ui/checkbox';
import { CartItemCard } from './cart-item-card';
import { CartSummary } from './cart-summary';
import {
  selectCartItems,
  selectSelectedCount,
  selectIsAllSelected,
  toggleSelectItem,
  toggleSelectAll,
  removeFromCart,
  setCartFromServer,
} from '../store';
import { removeFromCartApi } from '@/features/cart/api/cart.api';
import type { CartItem } from '@/features/cart/types/cart.types';
import { toast } from 'sonner';

interface CartListProps {
  readonly initialServerItems?: readonly CartItem[];
}

/**
 * Main cart list view with server sync.
 * Accepts pre-fetched server cart items from RSC parent.
 * Hydrates Redux on mount, uses optimistic remove with server sync.
 */
export function CartList({ initialServerItems }: CartListProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const selectedCount = useSelector(selectSelectedCount);
  const isAllSelected = useSelector(selectIsAllSelected);
  const hasHydrated = useRef(false);

  /**
   * Hydrate Redux cart from server data on initial mount.
   * Only runs once -- subsequent interactions are optimistic via Redux.
   */
  useEffect(() => {
    if (hasHydrated.current) return;
    if (initialServerItems && initialServerItems.length > 0) {
      dispatch(setCartFromServer([...initialServerItems]));
    }
    hasHydrated.current = true;
  }, [initialServerItems, dispatch]);

  const handleToggle = (bookId: number) => {
    dispatch(toggleSelectItem(bookId));
  };

  const handleRemove = (bookId: number) => {
    const item = items.find((i) => i.bookId === bookId);
    const serverItemId = item?.serverItemId;

    // Optimistic: remove from Redux immediately
    dispatch(removeFromCart(bookId));
    toast.success('Book removed from cart');

    // Sync to server in background
    if (serverItemId) {
      removeFromCartApi(serverItemId).catch((error: unknown) => {
        const msg =
          error instanceof Error ? error.message : 'Failed to sync cart';
        toast.error(msg);
      });
    }
  };

  const handleBorrow = () => {
    if (selectedCount === 0) {
      toast.warning('Please select at least one book to borrow');
      return;
    }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-20'>
        <div className='text-muted-foreground bg-secondary flex size-24 items-center justify-center rounded-full'>
          <svg
            width='48'
            height='48'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
            <line x1='3' y1='6' x2='21' y2='6' />
            <path d='M16 10a4 4 0 01-8 0' />
          </svg>
        </div>
        <p className='text-foreground text-lg font-bold'>Your cart is empty</p>
        <p className='text-muted-foreground text-md'>
          Browse books and add them to your cart
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-10 md:flex-row md:items-start'>
      {/* Left: Cart Items */}
      <div className='flex flex-1 flex-col gap-6'>
        {/* Select All */}
        <label className='flex cursor-pointer items-center gap-4'>
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={() => dispatch(toggleSelectAll())}
            className='size-5 rounded-md'
            aria-label='Select all items'
          />
          <span className='text-foreground text-md font-medium'>
            Select All
          </span>
        </label>

        {/* Items List */}
        <div className='flex flex-col divide-y'>
          {items.map((item) => (
            <div
              key={item.bookId}
              className='py-4 first:pt-0 last:pb-0 md:py-6'
            >
              <CartItemCard
                item={item}
                checked={item.selected}
                onToggle={handleToggle}
                onRemove={handleRemove}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Loan Summary */}
      <CartSummary selectedCount={selectedCount} onBorrow={handleBorrow} />
    </div>
  );
}
