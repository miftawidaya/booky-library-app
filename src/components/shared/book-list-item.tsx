'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { paths } from '@/config/routes';

interface BookListItemProps {
  readonly bookId: number;
  readonly title: string;
  readonly authorName: string;
  readonly categoryId: number | null;
  readonly categoryName: string;
  readonly coverImage: string | null;
  readonly className?: string;
}

export function BookListItem({
  bookId,
  title,
  authorName,
  categoryId,
  categoryName,
  coverImage,
  className,
}: BookListItemProps) {
  return (
    <div className={cn('flex items-center gap-3 md:gap-4', className)}>
      {/* Cover Image */}
      <Link
        href={`/books/${bookId}`}
        className='bg-muted group relative block h-26.5 w-17.5 shrink-0 overflow-hidden rounded md:h-34.5 md:w-23'
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            unoptimized
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            sizes='92px'
          />
        ) : (
          <div className='text-muted-foreground flex size-full items-center justify-center'>
            <Icon icon='ri:book-2-line' className='size-8 opacity-50' />
          </div>
        )}
      </Link>

      {/* Text Details */}
      <div className='flex flex-1 flex-col gap-1'>
        {/* Category Badge */}
        {categoryId != null ? (
          <Link
            href={`${paths.public.books}?category=${categoryId}`}
            className='border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 w-fit rounded-md border px-2 text-sm leading-7 font-bold tracking-[-0.02em] transition-colors'
          >
            {categoryName}
          </Link>
        ) : (
          <span className='border-border text-foreground w-fit rounded-md border px-2 text-sm leading-7 font-bold tracking-[-0.02em]'>
            {categoryName}
          </span>
        )}

        {/* Book Name */}
        <Link
          href={`/books/${bookId}`}
          className={cn(
            'text-foreground hover:text-primary font-bold tracking-[-0.02em]',
            'text-md leading-7.5 md:text-lg md:leading-8'
          )}
        >
          {title}
        </Link>

        {/* Author Name */}
        <span
          className={cn(
            'text-muted-foreground line-clamp-1 font-medium tracking-[-0.03em]',
            'md:text-md text-sm leading-7 md:leading-7.5'
          )}
        >
          {authorName}
        </span>
      </div>
    </div>
  );
}
