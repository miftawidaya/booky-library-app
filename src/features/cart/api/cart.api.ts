interface CartApiResponse {
  readonly success: boolean;
  readonly message: string;
}

interface ServerCartItem {
  readonly id: number;
  readonly bookId: number;
  readonly book: {
    readonly id: number;
    readonly title: string;
    readonly coverImage: string | null;
    readonly author?: { readonly id: number; readonly name: string } | null;
    readonly authorId?: number;
    readonly authorName?: string;
    readonly category?: { readonly id: number; readonly name: string } | null;
    readonly categoryId?: number;
    readonly categoryName?: string;
  };
}

interface GetCartResponse {
  readonly success: boolean;
  readonly data: {
    readonly id: number;
    readonly items: ServerCartItem[];
  };
}

/**
 * Add a book to the server-side cart.
 */
export async function addToCartApi(bookId: number): Promise<CartApiResponse> {
  const response = await fetch('/api/cart/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookId }),
  });

  const data = (await response.json()) as CartApiResponse;

  if (response.ok === false) {
    throw new Error(data.message);
  }

  return data;
}

/**
 * Get current user's cart items from server.
 */
export async function getCartApi(): Promise<GetCartResponse> {
  const response = await fetch('/api/cart');

  const data = (await response.json()) as GetCartResponse;

  if (response.ok === false) {
    throw new Error((data as unknown as CartApiResponse).message);
  }

  return data;
}

/**
 * Remove a single item from server cart by cart item ID.
 */
export async function removeFromCartApi(
  itemId: number
): Promise<CartApiResponse> {
  const response = await fetch(`/api/cart/items/${itemId}`, {
    method: 'DELETE',
  });

  const data = (await response.json()) as CartApiResponse;

  if (response.ok === false) {
    throw new Error(data.message);
  }

  return data;
}

/**
 * Clear all items from server cart.
 */
export async function clearCartApi(): Promise<CartApiResponse> {
  const response = await fetch('/api/cart', {
    method: 'DELETE',
  });

  const data = (await response.json()) as CartApiResponse;

  if (response.ok === false) {
    throw new Error(data.message);
  }

  return data;
}

export type { ServerCartItem, GetCartResponse, CartApiResponse };
