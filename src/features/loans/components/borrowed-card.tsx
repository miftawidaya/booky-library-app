'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';

import { Button } from '@/components/ui/button';
import { GiveReviewDialog } from '@/features/reviews/components/give-review-dialog';
import type { Loan } from '@/features/loans/types/loans.types';

interface BorrowedCardProps {
  readonly loan: Loan;
}

const STATUS_STYLES: Record<string, string> = {
  BORROWED: 'bg-status-active/5 text-status-active',
  RETURNED: 'bg-status-active/5 text-status-active',
  LATE: 'bg-status-overdue/5 text-status-overdue',
};

/**
 * Individual loan card for the Borrowed List page.
 */
export function BorrowedCard({ loan }: BorrowedCardProps) {
  const borrowDate = dayjs(loan.borrowedAt);
  const dueDate = dayjs(loan.dueAt);

  const statusStyle = STATUS_STYLES[loan.status] ?? STATUS_STYLES.BORROWED;
  const statusLabel = loan.displayStatus ?? loan.status;

  const [isReviewOpen, setIsReviewOpen] = React.useState(false);

  return (
    <div className='card'>
      {/* Status & Due Date Header */}
      <div className='flex w-full items-start justify-between gap-5'>
        <div className='flex items-center gap-1 md:gap-3'>
          <span className='text-foreground md:text-md text-sm font-bold'>
            Status
          </span>
          <span
            className={`flex items-center justify-center rounded-xs py-0.5 ps-2 pe-2 text-sm font-bold tracking-tight ${statusStyle}`}
          >
            {statusLabel}
          </span>
        </div>
        <div className='flex items-center gap-1 md:gap-3'>
          <span className='text-foreground md:text-md text-sm font-bold md:font-bold'>
            Due Date
          </span>
          <span 
            className='bg-status-overdue/10 text-status-overdue flex items-center justify-center rounded-xs py-0.5 ps-2 pe-2 text-sm font-bold tracking-tight'
            suppressHydrationWarning
          >
            {dueDate.format('DD MMMM YYYY')}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className='bg-border h-px w-full' />

      {/* Book Details & Button Row */}
      <div className='flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between'>
        {/* Cover + Info */}
        <div className='flex flex-1 items-center gap-4'>
          {/* Cover Image (92x138) */}
          <Link
            href={`/books/${loan.book.id}`}
            className='bg-muted relative h-34.5 w-23 shrink-0 overflow-hidden rounded-md transition-opacity hover:opacity-80'
          >
            {loan.book.coverImage ? (
              <Image
                src={loan.book.coverImage}
                alt={loan.book.title}
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
          </Link>

          {/* Text Details */}
          <div className='flex min-w-0 flex-1 flex-col gap-1'>
            {loan.book.category && (
              <Link
                href={`/books?category=${loan.book.category.id}`}
                className='border-border text-foreground flex h-7 w-fit items-center rounded-sm border ps-2 pe-2 text-sm font-bold transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900'
              >
                {loan.book.category.name}
              </Link>
            )}
            <Link href={`/books/${loan.book.id}`} className='w-fit max-w-full'>
              <h3 className='text-foreground text-md line-clamp-1 font-bold hover:underline md:text-xl md:font-bold'>
                {loan.book.title}
              </h3>
            </Link>
            <p className='text-muted-foreground md:text-md truncate text-sm font-medium md:font-medium'>
              {loan.book.author.name}
            </p>
            <div 
              className='text-foreground md:text-md flex items-center gap-2 pt-1 text-sm font-bold md:font-bold'
              suppressHydrationWarning
            >
              <span>{borrowDate.format('DD MMM YYYY')}</span>
              <div className='bg-foreground size-0.5 rounded-full' />
              <span className='whitespace-nowrap'>
                Duration {loan.durationDays} Days
              </span>
            </div>
          </div>
        </div>

        {/* Give Review Button */}
        <div className='shrink-0'>
          <Button
            className='text-primary-foreground text-md h-10 w-full rounded-full font-bold md:w-45.5'
            onClick={() => setIsReviewOpen(true)}
          >
            Give Review
          </Button>
        </div>
      </div>

      <GiveReviewDialog
        bookId={loan.book.id}
        open={isReviewOpen}
        onOpenChange={setIsReviewOpen}
      />
    </div>
  );
}
