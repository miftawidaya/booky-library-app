'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getBooks } from '../api/books.api';
import { BooksFilterParams } from '../types/books.types';
import { BookCard } from '@/components/shared/book-card';
import { Book } from '@/features/home/types/home.types';
import { BooksListSkeleton } from './books-list-skeleton';
import { Loader2 } from 'lucide-react';

export function BooksInfiniteList({
  initialParams,
}: Readonly<{ initialParams: BooksFilterParams }>) {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<
    import('../types/books.types').BooksResponse,
    Error,
    import('@tanstack/react-query').InfiniteData<
      import('../types/books.types').BooksResponse
    >,
    readonly ['books', BooksFilterParams],
    number
  >({
    queryKey: ['books', initialParams] as const,
    queryFn: ({ pageParam }) =>
      getBooks({
        ...initialParams,
        page: typeof pageParam === 'number' ? pageParam : 1,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'pending') {
    return <BooksListSkeleton />;
  }

  if (status === 'error') {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-20 text-center'>
        <h3 className='text-destructive text-xl font-bold'>
          Error Loading Books
        </h3>
        <p className='text-muted-foreground'>{error.message}</p>
      </div>
    );
  }

  const allBooks = data?.pages.flatMap((page) => page.items) ?? [];

  if (allBooks.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-20 text-center'>
        <h3 className='text-xl font-bold'>No Books Found</h3>
        <p className='text-muted-foreground'>
          Try adjusting your filters or search keywords.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'>
        {allBooks.map((book) => (
          <BookCard key={book.id} book={book as Book} />
        ))}
      </div>

      {(hasNextPage || isFetchingNextPage) && (
        <div ref={ref} className='flex items-center justify-center py-8'>
          {isFetchingNextPage && (
            <Loader2 className='text-primary size-8 animate-spin' />
          )}
        </div>
      )}
    </div>
  );
}
