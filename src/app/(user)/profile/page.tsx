import type { Metadata } from 'next';

import { ProfileCard } from '@/features/profile/components/profile-card';

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your profile and view your loan statistics.',
};

export default function ProfilePage() {
  return (
    <>
      <h1 className='display-xs-bold md:display-sm-extrabold text-foreground'>
        Profile
      </h1>
      <ProfileCard />
    </>
  );
}
