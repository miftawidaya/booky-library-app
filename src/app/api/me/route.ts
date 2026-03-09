import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { API_URL } from '@/config/env';

/**
 * PATCH /api/me - Update user profile
 * Handles both application/json and multipart/form-data
 */
export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const contentType = request.headers.get('content-type') ?? '';
    let body: any;
    let headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (contentType.includes('multipart/form-data')) {
      body = await request.formData();
    } else {
      body = JSON.stringify(await request.json().catch(() => ({})));
      headers['Content-Type'] = 'application/json';
    }

    const backendResponse = await fetch(`${API_URL}/me`, {
      method: 'PATCH',
      headers,
      body,
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
