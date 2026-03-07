'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Book } from '@/features/home/types/home.types';
import { useState } from 'react';

export function BookCard({ book }: Readonly<{ book: Book }>) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/books/${book.id}`} className='block'>
      <div className='bg-card shadow-card group hover:border-border dark:border-border flex cursor-pointer flex-col items-start overflow-hidden rounded-xl border border-transparent transition-colors dark:border dark:shadow-none'>
        {/* Image Area */}
        <div className='bg-muted relative aspect-2/3 w-full'>
          {book.coverImage && !imageError ? (
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              unoptimized
              onError={() => setImageError(true)}
              className='rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-105'
              sizes='(max-width: 768px) 50vw, 20vw'
            />
          ) : (
            <div className='text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-2 rounded-t-xl'>
              <Icon icon='ri:book-2-line' className='size-10 opacity-50' />
              <span className='text-xs font-medium'>No Cover</span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className='flex w-full flex-col items-start gap-0.5 p-3 md:gap-1 md:p-4'>
          <h3
            className='text-foreground line-clamp-1 w-full text-sm leading-7 font-bold tracking-tight md:text-lg md:leading-8'
            title={book.title}
          >
            {book.title}
          </h3>
          <p className='text-muted-foreground line-clamp-1 w-full text-sm leading-7 font-medium tracking-tight md:text-base md:leading-7.5'>
            {book.author?.name ?? book.authorName ?? 'Unknown Author'}
          </p>

          <div className='mt-1 flex items-center gap-1.5'>
            <Icon
              icon='ri:star-fill'
              className='text-rating size-4.5'
              aria-hidden='true'
            />
            <span className='text-foreground text-sm leading-7 font-semibold tracking-tight md:text-base md:leading-7.5'>
              {book.rating ?? 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
