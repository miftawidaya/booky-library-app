import type { User } from '@/features/auth/types/auth.types';

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  profilePhoto?: File | string | null;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    profile?: User;
  } & Partial<User>; // Handling both possibilities
}

export async function updateProfile(
  payload: UpdateProfileRequest
): Promise<UpdateProfileResponse> {
  const isFormData = payload.profilePhoto instanceof File;
  const url = '/api/me';

  if (isFormData) {
    const formData = new FormData();
    if (payload.name) formData.append('name', payload.name);
    if (payload.phone) formData.append('phone', payload.phone);
    if (payload.profilePhoto)
      formData.append('profilePhoto', payload.profilePhoto);

    const res = await fetch(url, {
      method: 'PATCH',
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update profile');
    }

    return res.json();
  }

  // JSON payload
  const body: Record<string, string> = {};
  if (payload.name) body.name = payload.name;
  if (payload.phone) body.phone = payload.phone;

  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update profile');
  }

  return res.json();
}
