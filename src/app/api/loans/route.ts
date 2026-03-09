import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { API_URL } from '@/config/env';

interface LoanFromCartRequestBody {
  itemIds?: number[];
  borrowDate?: string;
  duration?: number;
}

/**
 * POST /api/loans - Proxy to backend loan creation from cart.
 * Uses /api/loans/from-cart on the backend.
 * Body: { itemIds: number[], borrowDate: string, duration: number }
 */
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const body = (await request
    .json()
    .catch(() => ({}))) as LoanFromCartRequestBody;

  if (!body.itemIds || body.itemIds.length === 0) {
    return NextResponse.json(
      { success: false, message: 'At least one cart item is required' },
      { status: 422 }
    );
  }

  try {
    const backendResponse = await fetch(`${API_URL}/loans/from-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemIds: body.itemIds,
        borrowDate: body.borrowDate,
        duration: body.duration,
      }),
    });

    const data: unknown = await backendResponse.json();

    // Invalidate book pages cache so stock numbers are fresh
    if (backendResponse.ok) {
      // The backend does not automatically remove items from the cart after loan creation,
      // so we must send DELETE requests for each checked out item.
      await Promise.allSettled(
        body.itemIds.map((id) =>
          fetch(`${API_URL}/cart/items/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );

      revalidatePath('/books', 'page');
      revalidatePath('/books/[id]', 'page');
      revalidatePath('/', 'page');
    }

    return NextResponse.json(data, { status: backendResponse.status });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to connect to backend' },
      { status: 502 }
    );
  }
}
