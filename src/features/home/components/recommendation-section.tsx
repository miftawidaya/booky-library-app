import { Book } from '../types/home.types';
import { Button } from '@/components/ui/button';
import { BookCard } from '@/components/shared/book-card';

export function RecommendationSection({ books }: Readonly<{ books: Book[] }>) {
  return (
    <section className='custom-container mt-12 md:mt-16'>
      <h2 className='text-display-sm md:text-display-md mb-6 font-bold'>
        Recommendation
      </h2>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6'>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className='mt-10 flex justify-center'>
        <Button variant='outline' size='lg' className='rounded-full px-8'>
          Load More
        </Button>
      </div>
    </section>
  );
}
