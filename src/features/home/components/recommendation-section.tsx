'use client';

import { Book } from '../types/home.types';
import { Button } from '@/components/ui/button';
import { BookCard } from '@/components/shared/book-card';
import { useInfiniteRecommendedBooks } from '../api/home.queries';

export function RecommendationSection({ books }: Readonly<{ books: Book[] }>) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteRecommendedBooks(books);

  // Flatten the pages into a single array of books
  const allBooks = data?.pages.flatMap((page) => page.data.books) ?? books;

  return (
    <section className='custom-container mt-12 md:mt-16'>
      <h2 className='text-display-sm md:text-display-md mb-6 font-bold'>
        Recommendation
      </h2>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6'>
        {allBooks.map((book, idx) => (
          // Use a combination of id and index for key to prevent duplicates if any appear across pages
          <BookCard key={`rec-${book.id}-${idx}`} book={book} />
        ))}
      </div>

      {hasNextPage && (
        <div className='mt-10 flex justify-center'>
          <Button
            variant='outline'
            size='lg'
            className='rounded-full px-8'
            onClick={() => void fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </section>
  );
}
