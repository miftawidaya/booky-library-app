import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer/footer';
import { AdminTabNavigation } from '@/components/shared/admin-tab-navigation';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;
  const userRole = cookieStore.get('userRole')?.value;

  if (!token || userRole !== 'ADMIN') {
    redirect('/profile');
  }

  return (
    <>
      <Header />
      <main className='custom-container flex max-w-250 flex-col gap-6 py-4 md:py-12'>
        <AdminTabNavigation />
        {children}
      </main>
      <Footer />
    </>
  );
}
