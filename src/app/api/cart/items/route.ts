import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { API_URL } from '@/config/env';

/**
 * POST /api/cart/items - Add book to cart (proxy).
 * Reads authToken from HttpOnly cookie and forwards to backend.
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

  const body = (await request.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;

  try {
    const backendResponse = await fetch(`${API_URL}/cart/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data: unknown = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to connect to backend' },
      { status: 502 }
    );
  }
}
