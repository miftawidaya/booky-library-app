import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface SessionBody {
  token?: string;
  user?: {
    role?: string;
  };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as SessionBody;
  const token = body.token;
  const role = body.user?.role;

  if (!token || !role) {
    return NextResponse.json(
      { success: false, message: 'Missing token or user role' },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set('userRole', role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();

  cookieStore.delete('authToken');
  cookieStore.delete('userRole');

  return NextResponse.json({ success: true });
}

