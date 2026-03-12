'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { AuthorDetail } from '../types/authors.types';
import { BookIcon } from '@/components/ui/icons/book';

interface AuthorProfileProps {
  readonly author: AuthorDetail;
  readonly bookCount: number;
}

export function AuthorProfile({ author, bookCount }: AuthorProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const bio = author.bio ?? 'No bio available for this author.';

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const { scrollHeight, clientHeight } = textRef.current;
        setShouldShowButton(scrollHeight > clientHeight || isExpanded);
      }
    };

    // Initial check
    checkOverflow();

    // Re-check on window resize
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [bio, isExpanded]);

  return (
    <div className='bg-card shadow-card dark:border-border rounded-2xl p-6 md:p-8 dark:border dark:shadow-none'>
      <div className='flex flex-col gap-6 md:flex-row md:items-start md:gap-8'>
        {/* Avatar */}
        <div className='bg-muted relative size-20 shrink-0 overflow-hidden rounded-full md:size-24 lg:size-28'>
          {author.photo ? (
            <Image
              src={author.photo}
              alt={author.name}
              fill
              className='object-cover'
              unoptimized
            />
          ) : (
            <div className='bg-primary-100 text-primary flex h-full w-full items-center justify-center text-3xl font-bold'>
              {author.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
        <div className='flex flex-1 flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-display-xs text-foreground md:text-display-sm font-extrabold'>
              {author.name}
            </h1>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1.5'>
                <BookIcon className='text-primary size-5' />
                <span className='text-foreground text-sm font-medium md:text-base'>
                  {bookCount} books
                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p
              ref={textRef}
              className={`text-muted-foreground leading-relaxed whitespace-pre-wrap ${
                isExpanded ? '' : 'line-clamp-4'
              }`}
            >
              {bio}
            </p>
            {shouldShowButton && (
              <button
                type='button'
                onClick={() => setIsExpanded(!isExpanded)}
                className='text-primary w-fit text-sm font-bold hover:underline'
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
