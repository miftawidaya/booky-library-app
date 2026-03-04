import Image from 'next/image';
import { PopularAuthor } from '@/features/home/types/home.types';
import { BookIcon } from '@/components/ui/icons/book';

export function AuthorCard({ author }: Readonly<{ author: PopularAuthor }>) {
  return (
    <div className='bg-card shadow-card group hover:border-border dark:border-border flex cursor-pointer items-center gap-3 rounded-xl border border-transparent p-3 transition-colors md:gap-4 md:p-4 dark:border dark:shadow-none'>
      {/* Avatar Area */}
      <div className='bg-muted relative size-15 shrink-0 overflow-hidden rounded-full md:size-20'>
        {author.photo ? (
          <Image
            src={author.photo}
            alt={author.name}
            fill
            unoptimized
            className='object-cover'
            sizes='(max-width: 768px) 60px, 80px'
          />
        ) : (
          <div className='bg-primary-100 text-primary flex h-full w-full items-center justify-center text-lg font-bold md:text-2xl'>
            {author.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className='flex flex-col items-start gap-1.5 overflow-hidden'>
        <h3 className='text-foreground line-clamp-1 text-base leading-7.5 font-bold tracking-tight md:text-lg md:leading-8'>
          {author.name}
        </h3>
        <div className='flex items-center gap-1.5'>
          <BookIcon className='text-primary size-5 shrink-0' />
          <span className='text-foreground text-sm leading-7 font-medium tracking-tight md:text-base md:leading-7.5'>
            {author.bookCount} books
          </span>
        </div>
      </div>
    </div>
  );
}
