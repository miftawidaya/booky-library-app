import React from 'react';
import { Icon } from '@iconify/react';
import { Logo } from '@/components/ui/logo';
import {
  FOOTER_DESCRIPTION,
  FOOTER_SOCIAL_TITLE,
  SOCIAL_LINKS,
  type SocialIconType,
} from '@/config/footer-data';

function getSocialIcon(type: SocialIconType) {
  switch (type) {
    case 'facebook':
      return function FacebookSolid(props: React.ComponentProps<'svg'>) {
        return <Icon icon='ic:baseline-facebook' {...(props as any)} />;
      };
    case 'instagram':
      return function InstagramSolid(props: React.ComponentProps<'svg'>) {
        return <Icon icon='mdi:instagram' {...(props as any)} />;
      };
    case 'linkedin':
      return function LinkedinSolid(props: React.ComponentProps<'svg'>) {
        return <Icon icon='mdi:linkedin' {...(props as any)} />;
      };
    case 'tiktok':
      return function TiktokIcon(props: React.ComponentProps<'svg'>) {
        return <Icon icon='ic:baseline-tiktok' {...(props as any)} />;
      };
    default:
      return null;
  }
}

export function Footer() {
  return (
    <footer className='border-border/50 bg-background flex w-full flex-col py-10 md:py-20'>
      <div className='custom-container flex flex-col items-center justify-center gap-4 md:gap-10'>
        {/* Branding & Description */}
        <div className='flex w-full flex-col items-center gap-4 md:gap-6'>
          <Logo size='lg' className='text-primary [&>span]:text-foreground' />
          <p className='text-foreground w-full text-center text-[14px] leading-7 font-semibold tracking-[-0.02em] md:text-[16px] md:leading-7.5'>
            {FOOTER_DESCRIPTION}
          </p>
        </div>

        {/* Social Media Links */}
        <div className='flex w-full flex-col items-center gap-5'>
          <h3 className='text-foreground w-full text-center text-[14px] leading-7 font-bold tracking-[-0.02em] md:text-[16px] md:leading-7.5'>
            {FOOTER_SOCIAL_TITLE}
          </h3>
          <div className='flex items-center gap-3'>
            {SOCIAL_LINKS.map((social) => {
              const IconComponent = getSocialIcon(social.iconType);
              if (!IconComponent) return null;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-background text-foreground hover:bg-muted border-border focus-visible:ring-ring flex size-10 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:outline-none'
                  aria-label={social.name}
                >
                  <IconComponent className='size-5' />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
