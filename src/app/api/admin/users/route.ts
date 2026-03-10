import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { API_URL } from '@/config/env';

/**
 * GET /api/admin/users - Proxy to backend GET /api/admin/users.
 */
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const params = new URLSearchParams();
  if (page) params.set('page', page);
  if (limit) params.set('limit', limit);

  const queryString = params.toString();
  const suffix = queryString ? `?${queryString}` : '';
  const backendUrl = `${API_URL}/admin/users${suffix}`;

  try {
    const backendResponse = await fetch(backendUrl, {
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
