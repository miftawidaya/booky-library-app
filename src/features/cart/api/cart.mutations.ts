import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCartApi, removeFromCartApi, clearCartApi } from './cart.api';
import { toast } from 'sonner';
import type { CartItem } from '../types/cart.types';

// We define a loose Book type strictly for picking cache data during optimistic updates
interface PartiallyCachedBook {
  title?: string;
  author?: { name: string };
  category?: { name: string };
  coverImage?: string | null;
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: number) => addToCartApi(bookId),
    onMutate: async (bookId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<CartItem[]>(['cart']);

      // Attempt to extract existing book data from the cache to populate the UI smoothly
      const cachedBook = queryClient.getQueryData<PartiallyCachedBook>([
        'book',
        String(bookId),
      ]);

      queryClient.setQueryData<CartItem[]>(['cart'], (old) => {
        if (!old) return old;

        const optimisticItem: CartItem = {
          bookId,
          title: cachedBook?.title || 'Book added...',
          authorName: cachedBook?.author?.name || 'Adding...',
          categoryName: cachedBook?.category?.name || 'Adding...',
          coverImage: cachedBook?.coverImage || null,
          selected: false,
          serverItemId: Date.now(), // Fake transient cart itemId
        };

        return [...old, optimisticItem];
      });

      const bookTitle = cachedBook?.title ? `"${cachedBook.title}"` : 'Book';
      toast.success(`${bookTitle} added to cart`);

      return { previousCart };
    },
    onError: (error: Error, _, context) => {
      toast.error(error.message);
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => removeFromCartApi(itemId),
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<CartItem[]>(['cart']);

      queryClient.setQueryData<CartItem[]>(['cart'], (old) => {
        if (!old) return old;
        return old.filter((item) => item.serverItemId !== itemId);
      });

      toast.success('Book removed from cart');

      return { previousCart };
    },
    onError: (error: Error, _, context) => {
      toast.error(error.message);
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCartApi,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<CartItem[]>(['cart']);

      queryClient.setQueryData<CartItem[]>(['cart'], () => []);

      toast.success('Cart cleared completely');

      return { previousCart };
    },
    onError: (error: Error, _, context) => {
      toast.error(error.message);
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
