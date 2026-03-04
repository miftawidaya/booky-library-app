import { axios } from '@/lib/axios';
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
} from '../types/auth.types';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>('/auth/login', payload);
  if (data.success && data.data?.token) {
    // Sync session to server so token is available in HttpOnly cookies
    if (globalThis.window !== undefined) {
      void fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: data.data.token,
          user: data.data.user,
        }),
      });
    }
  }
  return data;
}

export async function logout() {
  if (globalThis.window !== undefined) {
    // Remove HttpOnly cookies on server
    await fetch('/api/auth/session', { method: 'DELETE' });
  }
}

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await axios.post<RegisterResponse>(
    '/auth/register',
    payload
  );
  return data;
}
