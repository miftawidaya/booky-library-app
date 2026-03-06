'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function BooksError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='custom-container flex min-h-100 flex-col items-center justify-center gap-4 py-20 text-center'>
      <h2 className='text-display-xs text-foreground font-bold'>
        Something went wrong!
      </h2>
      <p className='text-muted-foreground max-w-md'>
        {error.message ||
          'We encountered an error while trying to fetch the books. Please click reload to try again.'}
      </p>
      <Button onClick={() => reset()} variant='default' className='mt-4'>
        Try again
      </Button>
    </div>
  );
}
