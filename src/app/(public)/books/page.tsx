import { Suspense } from 'react';
import { getCategories } from '@/features/books/api/books.api';
import { BooksInfiniteList } from '@/features/books/components/books-infinite-list';
import { BooksListSkeleton } from '@/features/books/components/books-list-skeleton';
import { BooksSidebar } from '@/features/books/components/books-sidebar';
import { BooksMobileFilter } from '@/features/books/components/books-mobile-filter';

import { BooksFilterParams } from '@/features/books/types/books.types';

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categories = await getCategories();

  const initialParams: BooksFilterParams = {
    category: typeof params.category === 'string' ? params.category : undefined,
    sort: typeof params.sort === 'string' ? params.sort : undefined,
    q: typeof params.q === 'string' ? params.q : undefined,
    minRating:
      typeof params.minRating === 'string' ? params.minRating : undefined,
  };

  return (
    <div className='custom-container flex flex-col gap-6 py-10 md:py-14'>
      {/* Header Area */}
      <div className='flex flex-col gap-4 lg:gap-8'>
        <h1 className='text-display-sm text-foreground md:text-display-md font-bold'>
          All Books
        </h1>
        <BooksMobileFilter categories={categories} />
      </div>

      <div className='flex flex-col gap-8 md:flex-row md:items-start'>
        {/* Desktop Sidebar */}
        <aside className='hidden w-64 shrink-0 md:block'>
          <div className='sticky top-28'>
            <BooksSidebar categories={categories} />
          </div>
        </aside>

        {/* Books List Grid */}
        <main className='flex-1'>
          <Suspense
            fallback={<BooksListSkeleton />}
            key={JSON.stringify(params)}
          >
            <BooksInfiniteList initialParams={initialParams} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
