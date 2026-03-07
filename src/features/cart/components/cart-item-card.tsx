'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
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

      {/* Book Info Row */}
      <div className='flex flex-1 items-center gap-3 md:gap-4'>
        {/* Cover Image */}
        <Link
          href={`/books/${item.bookId}`}
          className='bg-muted group relative block h-26.5 w-17.5 shrink-0 overflow-hidden rounded md:h-34.5 md:w-23'
        >
          {item.coverImage ? (
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              unoptimized
              className='object-cover transition-transform duration-300 group-hover:scale-105'
              sizes='92px'
            />
          ) : (
            <div className='text-muted-foreground flex size-full items-center justify-center'>
              <Icon icon='ri:book-2-line' className='size-8 opacity-50' />
            </div>
          )}
        </Link>

        {/* Text Details */}
        <div className='flex flex-1 flex-col gap-1'>
          {/* Category Badge */}
          <Link
            href={`/books?category=${encodeURIComponent(item.categoryName)}`}
            className='border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 w-fit rounded-md border px-2 text-sm leading-7 font-bold tracking-[-0.02em] transition-colors'
          >
            {item.categoryName}
          </Link>

          {/* Book Name */}
          <Link
            href={`/books/${item.bookId}`}
            className={cn(
              'text-foreground hover:text-primary font-bold tracking-[-0.02em]',
              'text-md leading-7.5 md:text-lg md:leading-8'
            )}
          >
            {item.title}
          </Link>

          {/* Author Name */}
          <span
            className={cn(
              'line-clamp-1 font-medium tracking-[-0.03em] text-neutral-700',
              'md:text-md text-sm leading-7 md:leading-7.5'
            )}
          >
            {item.authorName}
          </span>
        </div>

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
