'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryOption } from '../types/books.types';
import { Checkbox } from '@/components/ui/checkbox';
import { useCallback } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export function BooksSidebar({
  categories,
  className,
}: Readonly<{ categories: CategoryOption[]; className?: string }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const currentRating = searchParams.get('minRating');

  const updateFilters = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/books?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div
      className={cn(
        'bg-card shadow-card dark:border-border flex w-full flex-col items-start gap-6 rounded-xl py-4 md:w-66.5 dark:border dark:shadow-none',
        className
      )}
    >
      {/* Filter Section */}
      <div className='flex flex-col items-start gap-2.5 self-stretch px-4'>
        {/* Categories Title */}
        <h3 className='text-foreground text-lg leading-8 font-bold tracking-[-0.02em]'>
          Categories
        </h3>

        {/* Category Option */}
        <label className='flex h-7.5 cursor-pointer items-center gap-2 self-stretch'>
          <Checkbox
            checked={!currentCategory}
            onCheckedChange={() => updateFilters('category', null)}
            className='size-5 rounded-sm'
          />
          <span className='text-foreground text-md-medium'>All Categories</span>
        </label>
        {categories.map((cat) => (
          <label
            key={cat.id}
            className='flex h-7.5 cursor-pointer items-center gap-2 self-stretch'
          >
            <Checkbox
              checked={currentCategory === cat.id.toString()}
              onCheckedChange={() =>
                updateFilters('category', cat.id.toString())
              }
              className='size-5 rounded-md'
            />
            <span className='text-foreground line-clamp-1 flex-1 text-base leading-7.5 font-medium tracking-[-0.03em]'>
              {cat.name}
            </span>
          </label>
        ))}
      </div>

      {/* Separator Line */}
      <div className='border-border w-full border-t' />

      {/* Rating Container */}
      <div className='flex flex-col items-center gap-2.5 self-stretch px-4'>
        {/* Rating Title */}
        <h3 className='text-foreground w-full text-lg leading-8 font-bold tracking-[-0.02em]'>
          Rating
        </h3>

        {/* Rating Options Container */}
        <div className='flex w-full flex-col items-start self-stretch'>
          {/* Rating Options (5 to 1) */}
          {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className='flex h-11.5 cursor-pointer flex-col items-start gap-2 self-stretch p-2'
            >
              <div className='flex h-7.5 items-center gap-2'>
                <Checkbox
                  checked={currentRating === rating.toString()}
                  onCheckedChange={() =>
                    updateFilters(
                      'minRating',
                      currentRating === rating.toString()
                        ? null
                        : rating.toString()
                    )
                  }
                  className='size-5'
                />
                <div className='flex h-7.5 items-center gap-[2px]'>
                  <Icon
                    icon='material-symbols:star-rounded'
                    className='text-rating size-6'
                  />
                  <span className='text-foreground text-base leading-7.5 font-normal tracking-[-0.02em]'>
                    {rating}
                  </span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
