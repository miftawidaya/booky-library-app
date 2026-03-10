'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { SearchMd } from '@untitledui/icons';

import { Button } from '@/components/ui/button';
import { useInfiniteAdminBooks } from '../api/admin-books.queries';
import { AdminBookCard } from './admin-book-card';
import type { Book } from '@/features/home/types/home.types';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const STATUS_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'Borrowed', value: 'borrowed' },
  { label: 'Returned', value: 'returned' },
] as const;

export function AdminBooksList() {
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteAdminBooks({
      q: debouncedQuery || undefined,
      status: activeStatus,
      limit: 10,
    });

  const books =
    (data?.pages
      .flatMap((page) => page.items ?? [])
      .filter(Boolean) as Book[]) ?? [];

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
          placeholder='Search book'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='text-sm-bold placeholder:text-sm-regular text-foreground placeholder:text-muted-foreground w-full bg-transparent outline-none'
        />
      </div>

      {/* Status Filter Chips */}
      <div className='scrollbar-hide flex items-center gap-2 overflow-x-auto pb-2'>
        {STATUS_FILTERS.map((filter) => {
          const isActive = activeStatus === filter.value;
          return (
            <button
              key={filter.value}
              type='button'
              onClick={() => setActiveStatus(filter.value)}
              className={`cursor-pointer rounded-full border py-1.5 ps-4 pe-4 text-sm font-semibold whitespace-nowrap transition-colors ${
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

      {/* Book Cards */}
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

      {isLoading === false && books.length === 0 && (
        <div className='border-border bg-muted/20 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-14'>
          <Icon
            icon='ri:book-open-line'
            className='text-muted-foreground size-12 opacity-50'
          />
          <p className='text-muted-foreground font-medium'>
            {searchQuery
              ? 'No matching books found.'
              : 'No books available yet.'}
          </p>
        </div>
      )}

      {isLoading === false && books.length > 0 && (
        <div className='flex flex-col gap-4'>
          {books.map((book) => (
            <AdminBookCard key={book.id} book={book} />
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
