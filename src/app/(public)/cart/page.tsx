'use client';

import { CartList } from '@/features/cart/components/cart-list';

export default function CartPage() {
  return (
    <div className='custom-container flex max-w-250 flex-col gap-6 py-10 pb-28 md:gap-8 md:py-14 md:pb-14'>
      <h1 className='text-display-sm md:text-display-md text-foreground font-bold'>
        My Cart
      </h1>
      <CartList />
    </div>
  );
}
