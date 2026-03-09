'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@/components/ui/checkbox';
import { CartItemCard } from './cart-item-card';
import { CartSummary } from './cart-summary';
import { useCart } from '@/features/cart/api/cart.queries';
import { useRemoveFromCart } from '@/features/cart/api/cart.mutations';
import {
  selectSelectedIds,
  toggleSelectItem,
  toggleSelectAll,
  syncSelections,
} from '../store';
import type { CartItem } from '@/features/cart/types/cart.types';
import { toast } from 'sonner';

interface CartListProps {
  readonly initialServerItems?: readonly CartItem[]; // Kept for backwards compatibility but handled differently
}

export function CartList({ initialServerItems }: CartListProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  // 1. Data Source: TanStack Query ensures API sync perfectly, falling back to SSR data
  const { data: cartItems = [] } = useCart(
    initialServerItems ? [...initialServerItems] : undefined
  );
  const removeMutation = useRemoveFromCart();

  // 2. UI State: Redux only keeps track of what the user selected locally
  const selectedIds = useSelector(selectSelectedIds) ?? [];

  // Sync Redux selections with currently available cart items to prevent orphaned selections
  useEffect(() => {
    if (cartItems.length > 0) {
      dispatch(syncSelections(cartItems.map((item) => item.bookId)));
    }
  }, [cartItems, dispatch]);

  // Combine Query API data with Local Redux state
  const items = useMemo(() => {
    return cartItems.map((item) => ({
      ...item,
      selected: selectedIds.includes(item.bookId),
    }));
  }, [cartItems, selectedIds]);

  const selectedCount = selectedIds.length;
  const isAllSelected =
    cartItems.length > 0 && selectedCount === cartItems.length;

  const handleToggle = (bookId: number) => {
    dispatch(toggleSelectItem(bookId));
  };

  const handleRemove = (bookId: number) => {
    const item = cartItems.find((i) => i.bookId === bookId);
    if (!item?.serverItemId) return;

    // Mutation takes care of caching and toasts
    removeMutation.mutate(item.serverItemId);
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
            onCheckedChange={() =>
              dispatch(toggleSelectAll(cartItems.map((i) => i.bookId)))
            }
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
