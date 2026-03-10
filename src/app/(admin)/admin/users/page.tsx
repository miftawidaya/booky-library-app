import type { Metadata } from 'next';

import { AdminUserList } from '@/features/admin/components/admin-user-list';

export const metadata: Metadata = {
  title: 'Admin - User',
  description: 'View and manage all registered users.',
};

export default function AdminUsersPage() {
  return (
    <>
      <h1 className='display-xs-bold md:display-sm-extrabold text-foreground'>
        User
      </h1>
      <AdminUserList />
    </>
  );
}
