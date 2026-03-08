'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from '@/features/cart/store';
import { addToCartApi } from '@/features/cart/api/cart.api';
import { toast } from 'sonner';

interface BookActionButtonsProps {
  readonly bookId: number;
  readonly title: string;
  readonly authorName: string;
  readonly categoryName: string;
  readonly coverImage: string | null;
  readonly availableCopies: number;
}

export function BookActionButtons({
  bookId,
  title,
  authorName,
  categoryName,
  coverImage,
  availableCopies,
}: BookActionButtonsProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isInCart = cartItems.some((item) => item.bookId === Number(bookId));

  const handleAddToCart = () => {
    if (isInCart) {
      toast.info(`"${title}" is already in your cart`);
      return;
    }

    // Optimistic: add to Redux immediately
    dispatch(
      addToCart({
        bookId,
        title,
        authorName,
        categoryName,
        coverImage,
      })
    );
    toast.success(`"${title}" added to cart`);

    // Sync to server in background (fire-and-forget with rollback)
    addToCartApi(Number(bookId)).catch((error: unknown) => {
      // Rollback on server failure
      dispatch(removeFromCart(Number(bookId)));
      const msg =
        error instanceof Error ? error.message : 'Failed to sync cart';
      toast.error(msg);
    });
  };

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
          >
            Borrow Book
          </Button>
        </div>
      </div>
    </>
  );
}
