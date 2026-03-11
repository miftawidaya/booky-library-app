'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

import { paths } from '@/config/routes';

import { Button } from '@/components/ui/button';
import { Book } from '@/features/home/types/home.types';

interface AdminBookCardProps {
  readonly book: Book;
}

export function AdminBookCard({ book }: AdminBookCardProps) {
  return (
    <div className='bg-background shadow-card dark:border-border flex w-full flex-row items-center justify-between gap-4 rounded-2xl p-4 md:p-5 dark:border dark:shadow-none'>
      <div className='flex flex-1 items-center gap-3 overflow-hidden md:gap-4'>
        {/* Cover Image */}
        <div className='bg-muted relative h-34.5 w-23 shrink-0 overflow-hidden rounded-md'>
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              unoptimized
              className='object-cover'
              sizes='92px'
            />
          ) : (
            <div className='flex size-full items-center justify-center'>
              <Icon
                icon='ri:book-2-line'
                className='text-muted-foreground size-8 opacity-50'
              />
            </div>
          )}
        </div>

        {/* Text Details */}
        <div className='flex min-w-0 flex-1 flex-col items-start gap-1'>
          {/* Category Badge */}
          {book.category && (
            <Link
              href={`${paths.public.books}?category=${book.category.id}`}
              className='border-border text-foreground text-sm-bold hover:bg-primary/10 hover:text-primary hover:border-primary/30 flex h-7 items-center justify-center rounded-md border px-2 transition-colors'
            >
              {book.category.name}
            </Link>
          )}

          {/* Title */}
          <h3 className='text-foreground text-sm-bold md:text-lg-bold line-clamp-1 w-full'>
            {book.title}
          </h3>

          {/* Author */}
          <p className='text-muted-foreground text-sm-medium md:text-md-medium line-clamp-1 w-full'>
            {book.author?.name || 'Unknown Author'}
          </p>

          {/* Rating */}
          <div className='mt-1 flex items-center gap-1'>
            <Icon icon='ri:star-fill' className='text-rating size-6' />
            <span className='text-foreground text-sm-bold md:text-md-bold tracking-tight'>
              {book.rating ? book.rating.toFixed(1) : '4.9'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons - Desktop */}
      <div className='hidden shrink-0 flex-row items-center gap-3.5 md:flex'>
        <Button
          variant='outline'
          className='h-12 rounded-full px-6 font-bold md:w-24'
        >
          Preview
        </Button>
        <Button
          variant='outline'
          className='h-12 rounded-full px-6 font-bold md:w-24'
        >
          Edit
        </Button>
        <Button
          variant='outline'
          className='text-status-overdue border-border hover:bg-status-overdue/10 hover:text-status-overdue h-12 rounded-full px-6 font-bold md:w-24'
        >
          Delete
        </Button>
      </div>

      {/* More Menu - Mobile */}
      <div className='flex shrink-0 items-center justify-center md:hidden'>
        <button
          type='button'
          className='border-foreground text-foreground focus-visible:ring-ring flex size-10 items-center justify-center rounded-full border-2 focus:outline-none focus-visible:ring-2'
          aria-label='More options'
        >
          <Icon icon='ri:more-fill' className='size-6' />
        </button>
      </div>
    </div>
  );
}
