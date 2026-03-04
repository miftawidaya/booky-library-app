import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer/footer';

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  // Defense in depth: redirect unauthenticated users to login
  if (!token) {
    redirect('/login');
  }

  return (
    <>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </>
  );
}
