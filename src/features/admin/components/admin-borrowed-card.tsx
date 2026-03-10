'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';

import type { AdminLoan } from '@/features/admin/types/admin.types';

interface AdminBorrowedCardProps {
  readonly loan: AdminLoan;
}

const STATUS_STYLES: Record<string, string> = {
  BORROWED: 'bg-status-active/5 text-status-active',
  RETURNED: 'bg-status-active/5 text-status-active',
  LATE: 'bg-status-overdue/5 text-status-overdue',
};

/**
 * Loan card for the admin Borrowed List page.
 * Displays borrower name instead of the "Give Review" button.
 */
export function AdminBorrowedCard({ loan }: AdminBorrowedCardProps) {
  const borrowDate = dayjs(loan.borrowedAt);
  const dueDate = dayjs(loan.dueAt);

  const statusStyle = STATUS_STYLES[loan.status] ?? STATUS_STYLES.BORROWED;
  const statusLabel = loan.displayStatus ?? loan.status;

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

      {/* Book Details & Borrower Row */}
      <div className='flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between'>
        {/* Cover + Info */}
        <div className='flex flex-1 items-center gap-4'>
          {/* Cover Image */}
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

        {/* Borrower Name (replaces Give Review button) */}
        <div className='flex shrink-0 flex-col items-end gap-0.5'>
          <span className='text-muted-foreground text-sm font-medium'>
            borrower&apos;s name
          </span>
          <span className='text-foreground text-md font-bold md:text-lg'>
            {loan.borrower.name}
          </span>
        </div>
      </div>
    </div>
  );
}
