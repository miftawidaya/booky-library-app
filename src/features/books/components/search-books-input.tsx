'use client';

import { Input } from '@/components/ui/input';
import { SearchLg } from '@untitledui/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, FormEvent, useCallback } from 'react';
import { cn } from '@/lib/utils';

export function SearchBooksInput({
  className,
}: Readonly<{ className?: string }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [val, setVal] = useState(searchParams.get('q') || '');

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (val.trim()) {
        params.set('q', val.trim());
      } else {
        params.delete('q');
      }
      router.push(`/books?${params.toString()}`);
    },
    [router, searchParams, val]
  );

  return (
    <form
      onSubmit={onSubmit}
      className={cn('relative w-full flex-1 md:w-80', className)}
    >
      <SearchLg className='text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2' />
      <Input
        type='text'
        placeholder='Search books by title...'
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className='focus-visible:ring-ring border-border bg-background h-10 w-full rounded-xl border pr-4 pl-10 focus-visible:ring-2 focus-visible:outline-none'
      />
    </form>
  );
}
