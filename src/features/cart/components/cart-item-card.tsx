'use client';

import { Icon } from '@iconify/react';
import { Checkbox } from '@/components/ui/checkbox';
import { BookListItem } from '@/components/shared/book-list-item';
import type { CartItem } from '../types/cart.types';

interface CartItemCardProps {
  readonly item: CartItem;
  readonly checked: boolean;
  readonly onToggle: (bookId: number) => void;
  readonly onRemove: (bookId: number) => void;
}

export function CartItemCard({
  item,
  checked,
  onToggle,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className='flex items-start gap-4'>
      {/* Checkbox */}
      <Checkbox
        checked={checked}
        onCheckedChange={() => onToggle(item.bookId)}
        className='mt-1 size-5 rounded-md'
        aria-label={`Select ${item.title}`}
      />

      {/* Book Info (shared) + Remove Button */}
      <div className='flex flex-1 items-center gap-3'>
        <BookListItem
          bookId={item.bookId}
          title={item.title}
          authorName={item.authorName}
          categoryId={item.categoryId}
          categoryName={item.categoryName}
          coverImage={item.coverImage}
          className='flex-1'
        />

        {/* Remove Button */}
        <button
          type='button'
          onClick={() => onRemove(item.bookId)}
          className='text-muted-foreground hover:text-destructive shrink-0 cursor-pointer p-1 transition-colors'
          aria-label={`Remove ${item.title} from cart`}
        >
          <Icon icon='ri:delete-bin-line' className='size-5' />
        </button>
      </div>
    </div>
  );
}
