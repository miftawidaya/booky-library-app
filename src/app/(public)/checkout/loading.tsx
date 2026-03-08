import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading skeleton for the checkout page.
 */
export default function CheckoutLoading() {
  return (
    <div className='custom-container flex max-w-250 flex-col gap-8 py-10 md:py-14'>
      <Skeleton className='h-9 w-36 md:h-12' />

      <div className='flex flex-col gap-y-6 md:flex-row md:items-start md:gap-x-15'>
        {/* Left Column */}
        <div className='flex flex-1 flex-col gap-4 md:gap-8'>
          {/* User Info skeleton */}
          <div className='flex flex-col gap-3'>
            <Skeleton className='h-6 w-40' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-5 w-48' />
              <Skeleton className='h-5 w-56' />
              <Skeleton className='h-5 w-36' />
            </div>
          </div>

          <hr className='border-border border-t' />

          {/* Book List skeleton */}
          <div className='flex flex-col gap-3'>
            <Skeleton className='h-6 w-28' />
            {Array.from({ length: 2 }, (_, i) => `checkout-book-${i}`).map(
              (key) => (
                <div key={key} className='flex items-center gap-4 py-2'>
                  <Skeleton className='size-16 shrink-0 rounded-lg' />
                  <div className='flex flex-1 flex-col gap-1.5'>
                    <Skeleton className='h-5 w-3/4' />
                    <Skeleton className='h-4 w-1/2' />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Column: Borrow Form skeleton */}
        <div className='w-full shrink-0 md:w-120'>
          <div className='shadow-card flex flex-col gap-4 rounded-2xl p-4'>
            <Skeleton className='h-7 w-64' />
            <Skeleton className='h-10 w-full rounded-lg' />
            <div className='flex gap-2'>
              <Skeleton className='h-10 grow rounded-full' />
              <Skeleton className='h-10 grow rounded-full' />
              <Skeleton className='h-10 grow rounded-full' />
            </div>
            <Skeleton className='h-10 w-full rounded-lg' />
            <Skeleton className='mt-2 h-12 w-full rounded-full' />
          </div>
        </div>
      </div>
    </div>
  );
}
