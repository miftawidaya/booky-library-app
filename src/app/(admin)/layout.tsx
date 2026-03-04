import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;
  const userRole = cookieStore.get('userRole')?.value;

  // Double-check admin access
  if (!token || userRole !== 'ADMIN') {
    redirect('/profile');
  }

  return (
    <div className='flex min-h-screen'>
      <aside className='w-64 bg-slate-900 p-6 text-white'>
        <h2 className='mb-6 text-xl font-bold'>Admin Panel</h2>
        <ul className='space-y-4'>
          <li>
            <Link href='/admin/books' className='hover:underline'>
              Books
            </Link>
          </li>
          <li>
            <Link href='/admin/users' className='hover:underline'>
              Users
            </Link>
          </li>
          <li>
            <Link href='/admin/authors' className='hover:underline'>
              Authors
            </Link>
          </li>
          <li>
            <Link href='/admin/categories' className='hover:underline'>
              Categories
            </Link>
          </li>
          <li>
            <Link href='/admin/loans' className='hover:underline'>
              Loans
            </Link>
          </li>
        </ul>
      </aside>
      <main className='flex-1 bg-gray-50 p-6'>{children}</main>
    </div>
  );
}
