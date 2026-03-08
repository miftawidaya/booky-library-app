import { CartList } from '@/features/cart/components/cart-list';
import { getServerCart } from '@/features/cart/api/cart.server';

export default async function CartPage() {
  const serverItems = await getServerCart();

  return (
    <div className='custom-container flex max-w-250 flex-col gap-6 py-10 pb-28 md:gap-8 md:py-14 md:pb-14'>
      <h1 className='text-display-sm md:text-display-md text-foreground font-bold'>
        My Cart
      </h1>
      <CartList initialServerItems={serverItems} />
    </div>
  );
}
