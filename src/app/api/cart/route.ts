import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { API_URL } from '@/config/env';

/**
 * GET /api/cart - List cart items (proxy).
 */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const backendResponse = await fetch(`${API_URL}/cart`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

/**
 * DELETE /api/cart - Clear all cart items (proxy).
 */
export async function DELETE() {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const backendResponse = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
