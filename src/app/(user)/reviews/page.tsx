import type { Metadata } from 'next';
import { UserReviewsList } from '@/features/reviews/components/user-reviews/user-reviews-list';

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'View all your submitted book reviews in Booky.',
};

export default function UserReviewsPage() {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='display-xs-bold md:display-sm-extrabold text-foreground'>
        Reviews
      </h1>

      <UserReviewsList />
    </div>
  );
}
