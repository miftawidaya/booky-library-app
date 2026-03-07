import { PopularAuthor } from '../types/home.types';
import { AuthorCard } from '@/components/shared/author-card';

export function PopularAuthorsSection({
  authors,
}: Readonly<{ authors: PopularAuthor[] }>) {
  return (
    <section className='custom-container mt-12 mb-16 md:mt-16 md:mb-24'>
      <h2 className='text-display-sm md:text-display-md mb-6 font-bold'>
        Popular Authors
      </h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </section>
  );
}
