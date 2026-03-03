import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
} from '@/components/ui/icons/social';

export type SocialMedia = {
  id: string;
  name: string;
  href: string;
  icon: React.ElementType;
};

export const socialMediaData: SocialMedia[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: FacebookIcon,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: InstagramIcon,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: LinkedinIcon,
  },
  {
    id: 'tiktok',
    name: 'Tiktok',
    href: 'https://tiktok.com',
    icon: TiktokIcon,
  },
];
