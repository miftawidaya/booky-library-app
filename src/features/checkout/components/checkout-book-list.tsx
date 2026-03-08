'use client';

import { BookListItem } from '@/components/shared/book-list-item';
import type { CartItem } from '@/features/cart/types/cart.types';

interface CheckoutBookListProps {
  readonly items: readonly CartItem[];
}

/**
 * Read-only book list displayed during checkout.
 * Shows the books the user is about to borrow.
 */
export function CheckoutBookList({ items }: CheckoutBookListProps) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-display-xs text-foreground font-bold'>Book List</h2>

      <div className='flex flex-col'>
        {items.map((item) => (
          <div key={item.bookId} className='py-2 first:pt-0 last:pb-0'>
            <BookListItem
              bookId={item.bookId}
              title={item.title}
              authorName={item.authorName}
              categoryName={item.categoryName}
              coverImage={item.coverImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
