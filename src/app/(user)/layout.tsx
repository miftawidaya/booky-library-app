import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer/footer';
import { UserTabNavigation } from '@/components/shared/user-tab-navigation';

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
      <main className='custom-container flex max-w-250 flex-col gap-6 py-4 md:py-12'>
        <UserTabNavigation />
        {children}
      </main>
      <Footer />
    </>
  );
}
