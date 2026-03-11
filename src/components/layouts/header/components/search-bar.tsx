'use client';

import { useState, useEffect, useCallback } from 'react';
import { SearchMd, XClose } from '@untitledui/icons';
import { Icon } from '@iconify/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from '@/hooks/use-debounce';
import { paths } from '@/config/routes';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialSearch);

  // Sync back when URL changes exclusively (e.g., cleared via sidebar or mobile search changing)
  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const pushSearch = useCallback(
    (val: string) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      if (val.trim()) {
        currentParams.set('q', val);
      } else {
        currentParams.delete('q');
      }
      router.push(`${paths.public.books}?${currentParams.toString()}`);
    },
    [searchParams, router]
  );

  const debouncedPush = useDebouncedCallback(pushSearch, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    debouncedPush(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pushSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    pushSearch('');
  };

  return (
    <div className='relative hidden w-full max-w-125 flex-col md:flex'>
      <form onSubmit={handleSubmit} className='border-input bg-card flex h-12 w-full items-center gap-2 rounded-full border ps-4 pe-4'>
        <SearchMd size={18} className='text-muted-foreground shrink-0' />
        <input
          type='text'
          placeholder='Search book'
          value={query}
          onChange={handleChange}
          className='text-sm-bold text-foreground placeholder:text-muted-foreground w-full bg-transparent outline-none'
        />
        {query.length > 0 && (
          <button
            type='button'
            onClick={handleClear}
            className='hover:text-foreground text-muted-foreground shrink-0 cursor-pointer transition-colors'
            aria-label='Clear search'
          >
            <Icon icon='icon-park-solid:close-one' fontSize={16} />
          </button>
        )}
      </form>
    </div>
  );
}

export function MobileSearchInput({
  onClose,
}: Readonly<{ onClose: () => void }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialSearch);

  const pushSearch = useCallback(
    (val: string) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      if (val.trim()) {
        currentParams.set('q', val);
      } else {
        currentParams.delete('q');
      }
      router.push(`${paths.public.books}?${currentParams.toString()}`);
    },
    [searchParams, router]
  );

  const debouncedPush = useDebouncedCallback(pushSearch, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    debouncedPush(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pushSearch(query);
    onClose();
  };

  const handleClear = () => {
    setQuery('');
    pushSearch('');
  };

  return (
    <div className='flex grow items-center gap-3 md:hidden relative'>
      <form onSubmit={handleSubmit} className='border-input bg-card flex h-10 grow items-center gap-2 rounded-full border px-3 relative'>
        <SearchMd size={16} className='text-muted-foreground shrink-0' />
        <input
          type='text'
          placeholder='Search book'
          autoFocus
          value={query}
          onChange={handleChange}
          className='text-sm-bold text-foreground placeholder:text-muted-foreground w-full bg-transparent outline-none'
        />
        {query.length > 0 && (
          <button
            type='button'
            onClick={handleClear}
            className='hover:text-foreground text-muted-foreground shrink-0 cursor-pointer transition-colors'
            aria-label='Clear search'
          >
            <Icon icon='icon-park-solid:close-one' fontSize={16} />
          </button>
        )}
      </form>
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
