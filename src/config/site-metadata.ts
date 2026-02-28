import { Metadata } from 'next';
import { SiteConfig } from '@/types';

// Core Application Configuration
export const siteConfig: SiteConfig = {
  name: 'Booky',
  tagline: 'Open Source Next.js Library & Book Borrowing Template',
  description:
    'A high-performance open-source library management and book borrowing template. Built with Next.js 16 and Tailwind CSS v4.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/og-image.jpg`,
  author: {
    name: 'miftawidaya',
    url: 'https://github.com/miftawidaya',
  },
  links: {
    twitter: 'https://twitter.com/miftawidaya',
    github: 'https://github.com/miftawidaya/booky-library-app',
  },
};

/**
 * Generates the application's SEO metadata.
 * Can be used as a base generator for individual pages to override specific defaults.
 */
export const createMetadata = (override?: Partial<Metadata>): Metadata => {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} | ${siteConfig.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      'Open Source Library Management',
      'Next.js Book Borrowing Template',
      'Library System Next.js',
      'Book Borrowing App',
      'Next.js 16 Project Template',
      'Tailwind CSS v4 Library',
      'Frontend Library App',
      'Open Source Booky',
      'TypeScript Library System',
      'Library Management Open Source',
    ],
    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.author.url,
      },
    ],
    creator: siteConfig.author.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: '/',
      siteName: siteConfig.name,
      title: `${siteConfig.name} | ${siteConfig.tagline}`,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteConfig.name} | ${siteConfig.tagline}`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.links.twitter
        ? `@${siteConfig.links.twitter.split('/').pop()}`
        : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    },
    ...override,
  };
};

export const siteMetadata: Metadata = createMetadata();
