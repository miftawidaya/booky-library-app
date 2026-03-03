import Cookies from 'js-cookie';
import { axios } from '@/lib/axios';
import { AuthResponse, LoginPayload } from '../types/auth.types';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>('/auth/login', payload);
  if (data.success && data.data?.token) {
    if (globalThis.window !== undefined) {
      Cookies.set('token', data.data.token, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    }
  }
  return data;
}

export function logout() {
  if (globalThis.window !== undefined) {
    Cookies.remove('token');
  }
}
