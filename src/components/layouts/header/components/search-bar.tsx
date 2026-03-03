'use client';

import { useState } from 'react';
import { SearchLg, SearchMd, XClose } from '@untitledui/icons';
import { Icon } from '@iconify/react';

export function SearchBar() {
  return (
    <div className='hidden w-full max-w-125 md:flex'>
      <div className='border-input bg-card flex h-12 w-full items-center gap-2 rounded-full border ps-4 pe-4'>
        <SearchLg size={15} className='shrink-0 text-neutral-500' />
        <input
          type='text'
          placeholder='Search book'
          className='text-sm-bold placeholder:text-sm-regular text-foreground w-full bg-transparent outline-none placeholder:text-neutral-600'
        />
      </div>
    </div>
  );
}

export function MobileSearchInput({
  onClose,
}: Readonly<{ onClose: () => void }>) {
  const [query, setQuery] = useState('');

  return (
    <div className='flex grow items-center gap-3 md:hidden'>
      <div className='border-input bg-card flex h-10 grow items-center gap-2 rounded-full border px-3'>
        <SearchMd size={16} className='shrink-0 text-neutral-500' />
        <input
          type='text'
          placeholder='Search book'
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='text-sm-bold placeholder:text-sm-regular text-foreground w-full bg-transparent outline-none placeholder:text-neutral-500'
        />
        {query.length > 0 && (
          <button
            type='button'
            onClick={() => setQuery('')}
            className='hover:text-foreground shrink-0 cursor-pointer text-neutral-400'
            aria-label='Clear search'
          >
            <Icon icon='icon-park-solid:close-one' fontSize={16} />
          </button>
        )}
      </div>
      <button
        type='button'
        onClick={onClose}
        className='text-foreground shrink-0 cursor-pointer'
        aria-label='Close search'
      >
        <XClose size={24} />
      </button>
    </div>
  );
}
