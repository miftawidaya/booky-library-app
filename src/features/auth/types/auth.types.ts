export interface LoginPayload {
  email?: string;
  password?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  profilePhoto?: string | null;
  role: 'ADMIN' | 'USER';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}
