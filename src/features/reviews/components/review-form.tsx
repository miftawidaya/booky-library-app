'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { useCreateReview } from '@/features/reviews/api/reviews.mutations';
import { toast } from 'sonner';
import type { RootState } from '@/lib/store';
import type { Review } from '@/features/reviews/types/reviews.types';

interface ReviewFormProps {
  readonly bookId: number;
  readonly onReviewCreated: (review: Review) => void;
}

/**
 * Form for creating or updating a review.
 * Shows rating stars and a comment textarea.
 * Only visible when user is authenticated.
 */
export function ReviewForm({ bookId, onReviewCreated }: ReviewFormProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState('');

  const createReview = useCreateReview({
    onSuccess: (data) => {
      if (data.data) {
        onReviewCreated(data.data);
      }
      toast.success('Review submitted successfully');
      setSelectedStar(0);
      setComment('');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!user) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedStar === 0) {
      toast.error('Please select a rating');
      return;
    }

    createReview.mutate({
      bookId,
      star: selectedStar,
      comment: comment.trim(),
    });
  };

  const displayStar = hoveredStar > 0 ? hoveredStar : selectedStar;

  return (
    <form
      onSubmit={handleSubmit}
      className='shadow-card dark:border-border bg-background flex flex-col gap-4 rounded-2xl p-4 md:p-6 dark:border dark:shadow-none'
    >
      <h3 className='text-foreground text-lg font-bold'>Write a Review</h3>

      {/* Star Rating */}
      <div className='flex flex-col gap-1.5'>
        <span className='text-foreground text-sm font-medium'>Rating</span>
        <div className='flex gap-1'>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={`star-${star}`}
              type='button'
              className='focus-visible:ring-ring rounded p-0.5 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:outline-none'
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setSelectedStar(star)}
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <Icon
                icon='ri:star-fill'
                className={`size-7 transition-colors ${
                  star <= displayStar ? 'text-rating' : 'text-muted'
                }`}
                aria-hidden='true'
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className='flex flex-col gap-1.5'>
        <label
          htmlFor='review-comment'
          className='text-foreground text-sm font-medium'
        >
          Comment
        </label>
        <textarea
          id='review-comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Share your thoughts about this book...'
          rows={3}
          className='border-border bg-background text-foreground placeholder:text-muted-foreground rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none'
        />
      </div>

      <Button
        type='submit'
        className='h-10 w-full rounded-full font-bold md:w-auto md:self-end md:px-8'
        disabled={createReview.isPending || selectedStar === 0}
      >
        {createReview.isPending ? (
          <>
            <Icon
              icon='ri:loader-4-line'
              className='size-4 animate-spin'
              aria-hidden='true'
            />
            <span>Submitting...</span>
          </>
        ) : (
          'Submit Review'
        )}
      </Button>
    </form>
  );
}
