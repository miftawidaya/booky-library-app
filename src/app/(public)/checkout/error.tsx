'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function CheckoutError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='custom-container flex min-h-100 flex-col items-center justify-center gap-4 py-20 text-center'>
      <h2 className='text-display-xs text-foreground font-bold'>
        Checkout failed
      </h2>
      <p className='text-muted-foreground'>
        {error.message ||
          'Something went wrong during checkout. Please try again.'}
      </p>
      <Button onClick={() => reset()} variant='default' className='mt-4'>
        Try again
      </Button>
    </div>
  );
}
