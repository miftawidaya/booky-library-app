import { cookies } from 'next/headers';
import { API_URL } from '@/config/env';
import type { CartItem } from '@/features/cart/types/cart.types';

interface ServerCartItem {
  readonly id: number;
  readonly bookId: number;
  readonly book: {
    readonly id: number;
    readonly title: string;
    readonly coverImage: string | null;
    readonly author?: { readonly name: string } | null;
    readonly authorName?: string;
    readonly category?: { readonly name: string } | null;
    readonly categoryName?: string;
  };
}

interface ServerCartResponse {
  readonly success: boolean;
  readonly data: {
    readonly id: number;
    readonly items: ServerCartItem[];
  };
}

/**
 * Server-side function to fetch the user's cart.
 * Reads authToken from HttpOnly cookie and calls the backend directly.
 * Returns mapped CartItem[] for Redux hydration.
 */
export async function getServerCart(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}/cart`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return [];

    const json = (await res.json()) as ServerCartResponse;
    const items = json.data?.items ?? [];

    return items.map((item) => ({
      bookId: item.bookId,
      title: item.book.title,
      authorName:
        item.book.author?.name ?? item.book.authorName ?? 'Unknown Author',
      categoryName:
        item.book.category?.name ?? item.book.categoryName ?? 'General',
      coverImage: item.book.coverImage,
      selected: false,
      serverItemId: item.id,
    }));
  } catch {
    return [];
  }
}
