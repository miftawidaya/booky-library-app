import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import '@/styles/globals.css';

import { siteMetadata } from '@/config/site-metadata';
import { Providers } from '@/app/providers';
import { Footer } from '@/components/layouts/footer';

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${quicksand.variable} antialiased`}>
        <Providers>
          <div className='relative flex min-h-screen flex-col'>
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
