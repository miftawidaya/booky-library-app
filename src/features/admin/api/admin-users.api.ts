import type {
  GetAdminUsersParams,
  AdminUserListResponse,
  AdminUser,
  AdminUserPagination,
} from '../types/admin.types';

interface ApiResponse {
  readonly success: boolean;
  readonly message: string;
  readonly data: {
    readonly users?: AdminUser[];
    readonly pagination?: AdminUserPagination;
  };
}

const DEFAULT_PAGINATION = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
} as const;

/**
 * Fetch all users from the admin endpoint via Next.js proxy.
 */
export async function getAdminUsers(
  params: GetAdminUsersParams = {}
): Promise<AdminUserListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set('page', String(params.page));
  }
  if (params.limit) {
    searchParams.set('limit', String(params.limit));
  }

  const queryString = searchParams.toString();
  const suffix = queryString ? `?${queryString}` : '';
  const url = `/api/admin/users${suffix}`;

  const response = await fetch(url);
  const json = (await response.json()) as ApiResponse;

  if (response.ok === false) {
    throw new Error(json.message);
  }

  const raw = json.data ?? {};

  return {
    users: (raw.users ?? []).filter(Boolean),
    pagination: raw.pagination ?? DEFAULT_PAGINATION,
  };
}
