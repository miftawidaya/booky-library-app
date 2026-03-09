'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { useCart } from '@/features/cart/api/cart.queries';
import { useAddToCart } from '@/features/cart/api/cart.mutations';
import { setSelections } from '@/features/cart/store';
import { toast } from 'sonner';
import type { RootState } from '@/lib/store';

interface BookActionButtonsProps {
  readonly bookId: number;
  readonly title: string;
  readonly availableCopies: number;
}

export function BookActionButtons({
  bookId,
  title,
  availableCopies,
}: BookActionButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: cartItems } = useCart();
  const addToCartMutation = useAddToCart();

  const isInCart = cartItems?.some((item) => item.bookId === Number(bookId));
  const autoProcessed = useRef(false);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to your cart');
      const callback = encodeURIComponent(`${pathname}?autoAdd=true`);
      router.push(`/login?callbackUrl=${callback}`);
      return;
    }

    if (isInCart) {
      toast.info(`"${title}" is already in your cart`);
      return;
    }

    addToCartMutation.mutate(Number(bookId));
  };

  const handleBorrow = async () => {
    if (!user) {
      toast.error('Please login to borrow books');
      const callback = encodeURIComponent(`${pathname}?autoBorrow=true`);
      router.push(`/login?callbackUrl=${callback}`);
      return;
    }

    if (!isInCart) {
      try {
        await addToCartMutation.mutateAsync(Number(bookId));
      } catch {
        return; // Error handled by mutation toast
      }
    }

    // Set ONLY this item as selected for checkout
    dispatch(setSelections([Number(bookId)]));
    router.push('/checkout');
  };

  // Auto-resume action after successful login redirect
  useEffect(() => {
    if (user && !autoProcessed.current) {
      const autoAdd = searchParams.get('autoAdd');
      const autoBorrow = searchParams.get('autoBorrow');

      if (autoAdd === 'true') {
        autoProcessed.current = true;
        // Small timeout to allow hydration
        setTimeout(() => handleAddToCart(), 100);
        router.replace(pathname); // Clean up the URL
      } else if (autoBorrow === 'true') {
        autoProcessed.current = true;
        setTimeout(() => handleBorrow(), 100);
        router.replace(pathname); // Clean up the URL
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, searchParams, pathname, router]);

  return (
    <>
      {/* Desktop Buttons */}
      <div className='mt-8 hidden items-center gap-4 md:flex'>
        <Button
          variant='outline'
          size='lg'
          className='h-12 w-40 rounded-full font-bold'
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button
          size='lg'
          className='h-12 w-40 rounded-full font-bold'
          disabled={availableCopies <= 0}
          onClick={handleBorrow}
        >
          Borrow Book
        </Button>
      </div>

      {/* Mobile Floating Action Bottom Bar */}
      <div className='bg-background shadow-card fixed inset-x-0 bottom-0 z-50 flex h-18 items-center justify-center border-t md:hidden'>
        <div className='flex w-full items-center gap-3 px-4'>
          <Button
            variant='outline'
            className='border-border text-foreground h-10 grow rounded-full text-sm font-bold'
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button
            className='bg-primary text-primary-foreground h-10 grow rounded-full text-sm font-bold'
            disabled={availableCopies <= 0}
            onClick={handleBorrow}
          >
            Borrow Book
          </Button>
        </div>
      </div>
    </>
  );
}
