import { Skeleton } from '@/components/ui/skeleton';

export function BooksListSkeleton() {
  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className='bg-card shadow-card flex flex-col overflow-hidden rounded-xl border border-transparent dark:shadow-none'
        >
          <Skeleton className='aspect-2/3 w-full rounded-b-none' />
          <div className='flex flex-col gap-2 p-3 md:p-4'>
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='mt-2 h-4 w-12' />
          </div>
        </div>
      ))}
    </div>
  );
}
