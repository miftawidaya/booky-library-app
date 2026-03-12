'use client';

import { useState, useMemo } from 'react';
import { AuthorCard } from '@/components/shared/author-card';
import { Icon } from '@iconify/react';

interface AuthorsListProps {
  readonly authors: any[];
}

export function AuthorsList({ authors }: AuthorsListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAuthors = useMemo(() => {
    return authors.filter((author) =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [authors, searchQuery]);

  return (
    <div className='flex flex-col gap-8 md:gap-12'>
      {/* Search Bar Area */}
      <div className='flex flex-col gap-4'>
        <div className='relative w-full max-w-136'>
          <Icon
            icon='ri:search-line'
            className='text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2'
          />
          <input
            type='text'
            placeholder='Search authors by name...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='border-border bg-card text-foreground focus-visible:ring-primary size-full rounded-full border py-3.5 ps-12 pe-6 text-base font-medium transition-all focus-visible:ring-2 focus-visible:outline-none'
          />
        </div>
        <p className='text-muted-foreground text-sm font-medium'>
          Showing {filteredAuthors.length} authors
        </p>
      </div>

      {/* Grid Area */}
      {filteredAuthors.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
          {filteredAuthors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <div className='border-border bg-muted/20 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-16 text-center'>
          <div className='bg-muted flex size-16 items-center justify-center rounded-full'>
            <Icon
              icon='ri:user-search-line'
              className='text-muted-foreground size-8 opacity-50'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <h3 className='text-foreground text-lg font-bold'>
              No authors found
            </h3>
            <p className='text-muted-foreground'>
              We couldn&apos;t find any authors matching &quot;{searchQuery}
              &quot;. Try a different search term.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
