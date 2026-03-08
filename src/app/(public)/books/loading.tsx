import { Skeleton } from '@/components/ui/skeleton';
import { BooksListSkeleton } from '@/features/books/components/books-list-skeleton';

/**
 * Loading skeleton for the book list page.
 */
export default function BooksLoading() {
  return (
    <div className='custom-container flex flex-col gap-6 py-10 md:py-14'>
      {/* Header Area */}
      <div className='flex flex-col gap-4 lg:gap-8'>
        <Skeleton className='h-9 w-40 md:h-12' />
        {/* Mobile filter bar placeholder */}
        <div className='flex gap-2 md:hidden'>
          <Skeleton className='h-10 w-24 rounded-full' />
          <Skeleton className='h-10 w-20 rounded-full' />
          <Skeleton className='h-10 w-28 rounded-full' />
        </div>
      </div>

      <div className='flex flex-col gap-8 md:flex-row md:items-start'>
        {/* Desktop Sidebar Skeleton */}
        <aside className='hidden w-64 shrink-0 md:block'>
          <div className='sticky top-28 flex flex-col gap-4'>
            <Skeleton className='h-6 w-24' />
            <div className='flex flex-col gap-2'>
              {Array.from({ length: 6 }, (_, i) => `cat-skel-${i}`).map(
                (key) => (
                  <Skeleton key={key} className='h-9 w-full rounded-lg' />
                )
              )}
            </div>
            <Skeleton className='mt-4 h-6 w-20' />
            <div className='flex flex-col gap-2'>
              {Array.from({ length: 4 }, (_, i) => `rating-skel-${i}`).map(
                (key) => (
                  <Skeleton key={key} className='h-5 w-32' />
                )
              )}
            </div>
          </div>
        </aside>

        {/* Books Grid Skeleton */}
        <main className='flex-1'>
          <BooksListSkeleton />
        </main>
      </div>
    </div>
  );
}
