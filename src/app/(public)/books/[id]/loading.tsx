import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading skeleton for the book detail page.
 */
export default function BookDetailLoading() {
  return (
    <div className='bg-background flex flex-col pb-24 md:pb-12'>
      {/* Breadcrumb */}
      <div className='custom-container pt-8 md:pt-10'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-10' />
          <Skeleton className='size-4' />
          <Skeleton className='h-4 w-20' />
          <Skeleton className='size-4' />
          <Skeleton className='h-4 w-32' />
        </div>
      </div>

      <div className='custom-container mt-6 flex flex-col gap-8 md:mt-10 md:flex-row md:items-start md:gap-14'>
        {/* Cover Image Skeleton */}
        <div className='bg-secondary mx-auto flex shrink-0 items-center justify-center p-2'>
          <Skeleton className='h-80 w-60 rounded-none md:h-120 md:w-80' />
        </div>

        {/* Info Section */}
        <div className='flex flex-1 flex-col justify-start'>
          {/* Category Badge */}
          <Skeleton className='mb-3 h-7 w-24 rounded-full' />

          {/* Title + Author + Rating */}
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-9 w-4/5 md:h-12' />
            <Skeleton className='h-6 w-40' />
            <Skeleton className='mt-1 h-5 w-16' />
          </div>

          {/* Stats Row */}
          <div className='my-6 flex items-center gap-5 md:my-8'>
            <div className='flex grow flex-col gap-1 md:w-25.5 md:grow-0'>
              <Skeleton className='h-7 w-12 md:h-8' />
              <Skeleton className='h-4 w-10' />
            </div>
            <div className='bg-border h-15 w-px md:h-16.5' />
            <div className='flex grow flex-col gap-1 md:w-25.5 md:grow-0'>
              <Skeleton className='h-7 w-12 md:h-8' />
              <Skeleton className='h-4 w-14' />
            </div>
            <div className='bg-border h-15 w-px md:h-16.5' />
            <div className='flex grow flex-col gap-1 md:w-25.5 md:grow-0'>
              <Skeleton className='h-7 w-12 md:h-8' />
              <Skeleton className='h-4 w-16' />
            </div>
          </div>

          {/* Description */}
          <div className='flex flex-col gap-3'>
            <Skeleton className='h-6 w-32' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-4 w-5/6' />
            </div>
          </div>

          {/* Action Buttons */}
          <div className='mt-8 hidden items-center gap-4 md:flex'>
            <Skeleton className='h-12 w-40 rounded-full' />
            <Skeleton className='h-12 w-40 rounded-full' />
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className='custom-container'>
        <hr className='border-border my-6 border-t md:my-16' />
      </div>

      {/* Reviews Section Skeleton */}
      <section className='custom-container flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-9 w-28 md:h-12' />
          <Skeleton className='h-5 w-36' />
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
          {Array.from({ length: 4 }, (_, i) => `review-skel-${i}`).map(
            (key) => (
              <div
                key={key}
                className='border-border flex flex-col gap-3 rounded-xl border p-4'
              >
                <div className='flex items-center gap-3'>
                  <Skeleton className='size-10 rounded-full' />
                  <div className='flex flex-col gap-1'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-3 w-16' />
                  </div>
                </div>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
              </div>
            )
          )}
        </div>
      </section>

      {/* Mobile Bottom Bar Placeholder */}
      <div className='fixed inset-x-0 bottom-0 z-50 flex h-18 items-center justify-center border-t md:hidden'>
        <div className='flex w-full items-center gap-3 px-4'>
          <Skeleton className='h-10 grow rounded-full' />
          <Skeleton className='h-10 grow rounded-full' />
        </div>
      </div>
    </div>
  );
}
