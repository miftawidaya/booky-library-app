import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading skeleton for the cart page.
 */
export default function CartLoading() {
  return (
    <div className='custom-container flex max-w-250 flex-col gap-6 py-10 pb-28 md:gap-8 md:py-14 md:pb-14'>
      {/* Page Title */}
      <Skeleton className='h-9 w-32 md:h-12' />

      <div className='flex flex-col gap-10 md:flex-row md:items-start'>
        {/* Left: Select All + Cart Items */}
        <div className='flex flex-1 flex-col gap-6'>
          {/* Select All */}
          <div className='flex items-center gap-4'>
            <Skeleton className='size-5 rounded' />
            <Skeleton className='h-5 w-20' />
          </div>

          {/* Cart Item Rows */}
          <div className='flex flex-col divide-y'>
            {Array.from({ length: 3 }, (_, i) => `cart-skel-${i}`).map(
              (key) => (
                <div key={key} className='flex items-start gap-4 py-4 md:py-6'>
                  {/* Checkbox */}
                  <Skeleton className='mt-1 size-5 shrink-0 rounded' />

                  {/* Book Info row */}
                  <div className='flex flex-1 items-center gap-3 md:gap-4'>
                    {/* Book cover -- portrait ratio matching BookListItem */}
                    <Skeleton className='h-26.5 w-17.5 shrink-0 rounded md:h-34.5 md:w-23' />

                    {/* Text: badge + title + author */}
                    <div className='flex flex-1 flex-col gap-1'>
                      <Skeleton className='h-7 w-20 rounded-md' />
                      <Skeleton className='h-5 w-3/4 md:h-6' />
                      <Skeleton className='h-4 w-1/2 md:h-5' />
                    </div>
                  </div>

                  {/* Delete button */}
                  <Skeleton className='mt-1 size-5 shrink-0 rounded' />
                </div>
              )
            )}
          </div>
        </div>

        {/* Right: Summary Sidebar (desktop only) */}
        <aside className='hidden w-80 shrink-0 md:block'>
          <div className='shadow-card flex flex-col gap-6 rounded-2xl p-5'>
            <Skeleton className='h-7 w-36' />
            <div className='flex items-center justify-between'>
              <Skeleton className='h-5 w-24' />
              <Skeleton className='h-5 w-16' />
            </div>
            <Skeleton className='h-12 w-full rounded-full' />
          </div>
        </aside>
      </div>

      {/* Mobile Floating Bar */}
      <div className='bg-background shadow-card fixed inset-x-0 bottom-0 z-50 flex h-18 items-center justify-between gap-4 border-t px-4 md:hidden'>
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-5 w-16' />
        </div>
        <Skeleton className='h-12 w-40 rounded-full' />
      </div>
    </div>
  );
}
