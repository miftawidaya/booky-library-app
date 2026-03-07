'use client';

import { Button } from '@/components/ui/button';

interface CartSummaryProps {
  readonly selectedCount: number;
  readonly onBorrow: () => void;
}

/**
 * Loan Summary sidebar (desktop) or floating bar (mobile).
 * Displays the number of selected items and a "Borrow Book" CTA.
 */
export function CartSummary({ selectedCount, onBorrow }: CartSummaryProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className='bg-card shadow-card sticky top-28 hidden w-80 shrink-0 rounded-2xl p-5 md:flex md:flex-col md:gap-6'>
        <h2 className='text-foreground text-xl leading-8.5 font-bold tracking-[-0.02em]'>
          Loan Summary
        </h2>

        <div className='flex items-center justify-between'>
          <span className='text-foreground text-md leading-7.5 font-medium tracking-[-0.03em]'>
            Total Book
          </span>
          <span className='text-foreground text-md leading-7.5 font-bold tracking-[-0.02em]'>
            {selectedCount} {selectedCount === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        <Button
          size='lg'
          className='text-md h-12 w-full rounded-full font-bold'
          disabled={selectedCount === 0}
          onClick={onBorrow}
        >
          Borrow Book
        </Button>
      </aside>

      {/* Mobile Floating Bar */}
      <div className='bg-background shadow-card fixed inset-x-0 bottom-0 z-50 flex h-18 items-center justify-between gap-4 border-t px-4 md:hidden'>
        <div className='flex flex-col'>
          <span className='text-foreground text-md font-medium tracking-[-0.03em]'>
            Total Book
          </span>
          <span className='text-foreground text-md font-bold tracking-[-0.02em]'>
            {selectedCount} {selectedCount === 1 ? 'Item' : 'Items'}
          </span>
        </div>
        <Button
          size='lg'
          className='text-md h-12 min-w-40 rounded-full font-bold'
          disabled={selectedCount === 0}
          onClick={onBorrow}
        >
          Borrow Book
        </Button>
      </div>
    </>
  );
}
