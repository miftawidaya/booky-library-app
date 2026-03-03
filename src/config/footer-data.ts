export const FOOTER_DESCRIPTION =
  'Discover inspiring stories & timeless knowledge, ready to borrow anytime. Explore online or visit our nearest library branch.';

export const FOOTER_SOCIAL_TITLE = 'Follow on Social Media';

export type SocialIconType = 'facebook' | 'instagram' | 'linkedin' | 'tiktok';

export interface SocialLink {
  name: string;
  href: string;
  iconType: SocialIconType;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    href: '#',
    iconType: 'facebook',
  },
  {
    name: 'Instagram',
    href: '#',
    iconType: 'instagram',
  },
  {
    name: 'LinkedIn',
    href: '#',
    iconType: 'linkedin',
  },
  {
    name: 'TikTok',
    href: '#',
    iconType: 'tiktok',
  },
];
