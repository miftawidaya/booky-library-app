import type { Metadata } from 'next';

import { AdminBorrowedList } from '@/features/admin/components/admin-borrowed-list';

export const metadata: Metadata = {
  title: 'Admin - Borrowed List',
  description: 'Manage all borrowed books across all users.',
};

export default function AdminLoansPage() {
  return (
    <>
      <h1 className='display-xs-bold md:display-sm-extrabold text-foreground'>
        Borrowed List
      </h1>
      <AdminBorrowedList />
    </>
  );
}
