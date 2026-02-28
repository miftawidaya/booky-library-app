import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import '@/styles/globals.css';

import { siteMetadata } from '@/config/site-metadata';

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
      <body className={`${quicksand.variable} antialiased`}>{children}</body>
    </html>
  );
}
