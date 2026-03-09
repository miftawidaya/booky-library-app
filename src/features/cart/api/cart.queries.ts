import { useQuery } from '@tanstack/react-query';
import { getCartApi, type ServerCartItem } from './cart.api';
import type { CartItem } from '../types/cart.types';

/**
 * Maps a ServerCartItem to our application's CartItem UI interface.
 */
function mapServerItemToCartItem(serverItem: ServerCartItem): CartItem {
  return {
    bookId: serverItem.bookId,
    title: serverItem.book.title,
    authorName:
      serverItem.book.author?.name ||
      serverItem.book.authorName ||
      'Unknown Author',
    categoryName:
      serverItem.book.category?.name ||
      serverItem.book.categoryName ||
      'Uncategorized',
    coverImage: serverItem.book.coverImage,
    selected: false,
    serverItemId: serverItem.id,
  };
}

export function useCart(initialData?: CartItem[]) {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await getCartApi();
      return response.data.items.map(mapServerItemToCartItem);
    },
    // Prevent refetching aggressively since cart updates are driven by mutations
    staleTime: 5 * 60 * 1000,
    initialData,
  });
}
