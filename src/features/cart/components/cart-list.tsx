'use client';

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
} from '../store';
import { toast } from 'sonner';

/**
 * Main cart list view. Renders the "Select All" checkbox,
 * individual cart items, and the loan summary sidebar/floating bar.
 */
export function CartList() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const selectedCount = useSelector(selectSelectedCount);
  const isAllSelected = useSelector(selectIsAllSelected);

  const handleToggle = (bookId: number) => {
    dispatch(toggleSelectItem(bookId));
  };

  const handleRemove = (bookId: number) => {
    dispatch(removeFromCart(bookId));
    toast.success('Book removed from cart');
  };

  const handleBorrow = () => {
    toast.info(`Borrowing ${selectedCount} book(s)... (Coming soon)`);
  };

  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-20'>
        <div className='text-muted-foreground flex size-24 items-center justify-center rounded-full bg-neutral-100'>
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
