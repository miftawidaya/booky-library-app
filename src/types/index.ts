export type SiteConfig = Readonly<{
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  author: Readonly<{
    name: string;
    url: string;
  }>;
  links: Readonly<{
    twitter?: string;
    github?: string;
  }>;
}>;
