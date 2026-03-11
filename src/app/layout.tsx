import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import '@/styles/globals.css';

import { siteMetadata } from '@/config/site-metadata';
import { Providers } from '@/app/providers';
import { Toaster } from '@/components/ui/sonner';

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
          <Toaster position='top-center' richColors />
          <div className='relative flex min-h-screen flex-col'>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
