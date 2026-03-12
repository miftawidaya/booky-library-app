import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@iconify/react';
import { paths } from '@/config/routes';
import { getAuthorWithBooks } from '@/features/authors/api/authors.api';
import { AuthorProfile } from '@/features/authors/components/author-profile';
import { BookCard } from '@/components/shared/book-card';

export default async function AuthorDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  const data = await getAuthorWithBooks(id).catch(() => null);
  
  if (!data) {
    notFound();
  }

  const { author, books, bookCount } = data;

  return (
    <div className='bg-background flex flex-col pb-24 md:pb-12'>
      {/* Breadcrumb Navigation */}
      <div className='custom-container pt-8 md:pt-10'>
        <nav className='flex items-center gap-1'>
          <Link
            href={paths.public.home}
            className='text-primary text-sm font-semibold hover:underline'
          >
            Home
          </Link>
          <Icon
            icon='ri:arrow-right-s-line'
            className='text-foreground size-4'
          />
          <Link
            href={paths.public.authors}
            className='text-primary text-sm font-semibold hover:underline'
          >
            Authors
          </Link>
          <Icon
            icon='ri:arrow-right-s-line'
            className='text-foreground size-4'
          />
          <span className='text-foreground line-clamp-1 text-sm font-semibold'>
            {author.name}
          </span>
        </nav>
      </div>

      <div className='custom-container mt-6 flex flex-col gap-10 md:mt-10'>
        {/* Profile Card */}
        <AuthorProfile author={author} bookCount={bookCount} />

        <hr className='border-border border-t' />

        {/* Books List Grid */}
        <section className='flex flex-col gap-6 md:gap-8'>
          <h2 className='text-display-xs text-foreground md:text-display-sm font-extrabold'>
            Books by {author.name}
          </h2>

          {books.length > 0 ? (
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5'>
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className='border-border bg-muted/20 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-10'>
              <Icon
                icon='ri:book-2-line'
                className='text-muted-foreground size-16 opacity-50'
              />
              <p className='text-muted-foreground font-medium'>
                No books found for this author yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
