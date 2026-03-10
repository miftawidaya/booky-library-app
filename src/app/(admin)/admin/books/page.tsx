import type { Metadata } from 'next';
import { AdminBooksList } from '@/features/admin/components/admin-books-list';

export const metadata: Metadata = {
  title: 'Books',
  description: 'Manage all books in Booky.',
};

export default function AdminBooksPage() {
  return (
    <>
      <h1 className='display-xs-bold md:display-sm-extrabold text-foreground'>
        Book List
      </h1>
      <AdminBooksList />
    </>
  );
}
