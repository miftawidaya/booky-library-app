import { useQuery } from '@tanstack/react-query';

import { getAdminUsers } from './admin-users.api';
import type { AdminUserListResponse } from '../types/admin.types';

const USERS_PER_PAGE = 10;

/**
 * Query hook for fetching admin user list with pagination.
 */
export function useAdminUsers(page: number = 1) {
  return useQuery<AdminUserListResponse>({
    queryKey: ['admin-users', page],
    queryFn: () =>
      getAdminUsers({
        page,
        limit: USERS_PER_PAGE,
      }),
  });
}
