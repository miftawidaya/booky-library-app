import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { API_URL } from '@/config/env';

/**
 * DELETE /api/reviews/[id] - Delete own review (proxy).
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const backendResponse = await fetch(`${API_URL}/reviews/${id}`, {
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
