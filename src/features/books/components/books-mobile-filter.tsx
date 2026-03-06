'use client';

import { useState, useEffect } from 'react';
import { FilterLines } from '@untitledui/icons';
import { CategoryOption } from '../types/books.types';
import { BooksSidebar } from './books-sidebar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BooksMobileFilter({
  categories,
}: Readonly<{ categories: CategoryOption[] }>) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type='button'
          className={cn(
            'shadow-card hover:border-border flex h-13 w-full cursor-pointer items-center justify-between rounded-xl border border-transparent p-4 transition-transform active:scale-95 md:hidden'
          )}
        >
          <span className='text-sm leading-7 font-extrabold text-neutral-950'>
            FILTER
          </span>

          <FilterLines className='size-5 text-neutral-950' strokeWidth={1.67} />
        </button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='w-[85%] overflow-y-auto rounded-r-2xl sm:max-w-md'
      >
        <SheetHeader className='text-left'>
          <SheetTitle>FILTER</SheetTitle>
          <SheetDescription className='sr-only'>
            Narrow down your book search options.
          </SheetDescription>
        </SheetHeader>
        <div className='mt-6 pb-6'>
          <BooksSidebar categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
