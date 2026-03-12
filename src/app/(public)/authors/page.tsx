import { getAuthorsDirectory } from '@/features/authors/api/authors.api';
import { AuthorsList } from '@/features/authors/components/authors-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authors Directory | Booky',
  description: 'Meet the talented authors behind our books collection.',
};

export default async function AuthorsPage() {
  const authors = await getAuthorsDirectory(50);

  return (
    <div className='custom-container flex flex-col gap-8 py-10 md:py-14'>
      {/* Header Area */}
      <div className='flex flex-col gap-2'>
        <h1 className='text-display-sm text-foreground md:text-display-md font-extrabold'>
          Authors Directory
        </h1>
        <p className='text-muted-foreground w-full max-w-136 text-lg font-medium'>
          Explore our collection of talented writers. From timeless classics to
          modern masterminds, discover the minds behind the stories.
        </p>
      </div>

      {/* List Component (with Search) */}
      <AuthorsList authors={authors} />
    </div>
  );
}
