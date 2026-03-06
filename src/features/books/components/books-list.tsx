import { getBooks } from '../api/books.api';
import { BooksFilterParams } from '../types/books.types';
import { BookCard } from '@/components/shared/book-card';
import { Book } from '@/features/home/types/home.types';

export async function BooksList({
  searchParams,
}: Readonly<{ searchParams: BooksFilterParams }>) {
  const response = await getBooks(searchParams);
  const books = response.items;

  if (!books.length) {
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
    <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'>
      {books.map((book) => (
        <BookCard key={book.id} book={book as Book} />
      ))}
    </div>
  );
}
