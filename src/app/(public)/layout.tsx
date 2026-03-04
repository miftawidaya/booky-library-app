import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer/footer';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </>
  );
}
