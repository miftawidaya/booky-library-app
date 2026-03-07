'use client';

import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/features/cart/store';
import { toast } from 'sonner';

interface BookActionButtonsProps {
  readonly bookId: number;
  readonly title: string;
  readonly authorName: string;
  readonly categoryName: string;
  readonly coverImage: string | null;
  readonly availableCopies: number;
}

/**
 * Client component for "Add to Cart" and "Borrow Book" buttons
 * on the book detail page. Handles dispatching Redux actions.
 */
export function BookActionButtons({
  bookId,
  title,
  authorName,
  categoryName,
  coverImage,
  availableCopies,
}: BookActionButtonsProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
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
