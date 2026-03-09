import type { Metadata } from 'next';

import { ProfileCard } from '@/features/profile/components/profile-card';

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your profile and view your loan statistics.',
};

export default function ProfilePage() {
  return (
    <>
      <h1 className='text-display-xs text-foreground font-extrabold md:hidden'>
        Profile
      </h1>
      <ProfileCard />
    </>
  );
}
