'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { SearchMd } from '@untitledui/icons';

import { Button } from '@/components/ui/button';
import { useAdminLoans } from '@/features/admin/api/admin-loans.queries';
import { AdminBorrowedCard } from './admin-borrowed-card';
import type { LoanStatusFilter } from '@/features/loans/types/loans.types';

const STATUS_FILTERS: ReadonlyArray<{
  readonly label: string;
  readonly value: LoanStatusFilter;
}> = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Returned', value: 'returned' },
  { label: 'Overdue', value: 'overdue' },
];

/**
 * Main client component for the admin Borrowed List page.
 * Renders search, status filter chips, loan cards with borrower info, and load more.
 */
export function AdminBorrowedList() {
  const [activeStatus, setActiveStatus] = useState<LoanStatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAdminLoans(activeStatus, searchQuery);

  const loans =
    data?.pages.flatMap((page) => page.loans ?? []).filter(Boolean) ?? [];

  return (
    <div className='flex flex-col gap-5 md:gap-6'>
      {/* Search */}
      <div className='border-input bg-card flex h-10 w-full max-w-136 items-center gap-2 rounded-full border ps-3 pe-3 md:h-12 md:ps-4 md:pe-4'>
        <SearchMd
          size={18}
          className='text-muted-foreground shrink-0 md:size-4.5'
        />
        <input
          type='text'
          placeholder='Search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='text-sm-bold placeholder:text-sm-regular text-foreground placeholder:text-muted-foreground w-full bg-transparent outline-none'
        />
      </div>

      {/* Status Filter Chips */}
      <div className='flex items-center gap-2'>
        {STATUS_FILTERS.map((filter) => {
          const isActive = activeStatus === filter.value;
          return (
            <button
              key={filter.value}
              type='button'
              onClick={() => setActiveStatus(filter.value)}
              className={`cursor-pointer rounded-full border py-1.5 ps-4 pe-4 text-sm font-semibold transition-colors ${
                isActive
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-foreground hover:bg-muted'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Loan Cards */}
      {isLoading && (
        <div className='flex flex-col gap-4'>
          {['skeleton-a', 'skeleton-b', 'skeleton-c'].map((id) => (
            <div
              key={id}
              className='border-border bg-muted/30 h-44 animate-pulse rounded-2xl border'
            />
          ))}
        </div>
      )}

      {isLoading === false && loans.length === 0 && (
        <div className='border-border bg-muted/20 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-14'>
          <Icon
            icon='ri:book-open-line'
            className='text-muted-foreground size-12 opacity-50'
          />
          <p className='text-muted-foreground font-medium'>
            {searchQuery
              ? 'No matching loans found.'
              : 'No borrowed books yet.'}
          </p>
        </div>
      )}

      {isLoading === false && loans.length > 0 && (
        <div className='flex flex-col gap-4'>
          {loans.map((loan) => (
            <AdminBorrowedCard key={loan.id} loan={loan} />
          ))}
        </div>
      )}

      {/* Load More */}
      {hasNextPage && (
        <div className='mt-2 flex justify-center'>
          <Button
            variant='outline'
            className='h-11 w-full rounded-full font-bold md:w-auto md:min-w-50'
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <Icon icon='ri:loader-4-line' className='size-5 animate-spin' />
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
