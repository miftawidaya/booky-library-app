import { redirect } from 'next/navigation';

export default function AdminIndexPage() {
  // Since there is no dedicated admin dashboard screen in Figma,
  // we redirect the base /admin route directly to the book management list.
  redirect('/admin/books');
}
