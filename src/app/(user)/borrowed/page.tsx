import type { Metadata } from 'next';

import { BorrowedList } from '@/features/loans/components/borrowed-list';

export const metadata: Metadata = {
  title: 'Borrowed List',
  description:
    'View and manage your borrowed books, track due dates, and give reviews.',
};

export default function BorrowedPage() {
  return (
    <>
      <h1 className='display-xs-bold md:display-sm-extrabold text-foreground'>
        Borrowed List
      </h1>
      <BorrowedList />
    </>
  );
}
