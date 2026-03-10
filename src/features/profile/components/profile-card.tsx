'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import type { RootState } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { UpdateProfileDialog } from './update-profile-dialog';

export function ProfileCard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);

  if (!user) {
    return (
      <div className='flex items-center justify-center p-10'>
        <Icon
          icon='ri:loader-4-line'
          className='text-primary size-8 animate-spin'
        />
      </div>
    );
  }

  const profileRows = [
    { label: 'Name', value: user.name || 'Anonymous' },
    { label: 'Email', value: user.email || 'No email provided' },
    { label: 'Nomor Handphone', value: user.phone || '-' },
  ];

  return (
    <div className='flex flex-col gap-4 md:w-139.25 md:gap-6'>
      <div className='shadow-card dark:border-border bg-background flex flex-col items-start gap-4 rounded-2xl p-4 md:gap-6 md:p-5 dark:border dark:shadow-none'>
        <div className='flex w-full flex-col items-start gap-2 md:gap-3'>
          {/* Avatar Area */}
          <div className='bg-secondary relative size-16 shrink-0 overflow-hidden rounded-full'>
            {user.profilePhoto ? (
              <Image
                src={user.profilePhoto}
                alt={user.name}
                fill
                unoptimized
                sizes='64px'
                className='object-cover'
              />
            ) : (
              <div className='flex size-full items-center justify-center'>
                <Icon
                  icon='ri:user-line'
                  className='text-muted-foreground size-8'
                />
              </div>
            )}
          </div>

          {/* Profile Rows */}
          {profileRows.map((row) => (
            <div
              key={row.label}
              className='flex h-7 w-full items-center justify-between md:h-7.5'
            >
              <span className='text-foreground text-sm leading-7 font-medium tracking-tight md:text-base md:leading-7.5'>
                {row.label}
              </span>
              <span className='text-foreground text-sm leading-7 font-bold tracking-tight md:text-base md:leading-7.5'>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Button
          type='button'
          onClick={() => setIsUpdateOpen(true)}
          className='text-primary-foreground h-11 w-full rounded-full text-base font-bold md:h-11'
        >
          Update Profile
        </Button>
      </div>

      <UpdateProfileDialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen} />
    </div>
  );
}
