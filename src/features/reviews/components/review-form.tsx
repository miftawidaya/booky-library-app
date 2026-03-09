'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { useCreateReview } from '@/features/reviews/api/reviews.mutations';
import { toast } from 'sonner';
import type { RootState } from '@/lib/store';

const reviewSchema = z.object({
  star: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().trim().optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  readonly bookId: number;
}

/**
 * Form for creating or updating a review.
 * Shows rating stars and a comment textarea.
 * Only visible when user is authenticated.
 */
export function ReviewForm({ bookId }: ReviewFormProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [hoveredStar, setHoveredStar] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { star: 0, comment: '' },
  });

  const createReview = useCreateReview({
    onSuccess: () => {
      toast.success('Review submitted successfully');
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!user) {
    return null;
  }

  const onSubmit = (data: ReviewFormValues) => {
    createReview.mutate({
      bookId,
      star: data.star,
      comment: data.comment ?? '',
    });
  };

  const selectedStar = form.watch('star');
  const displayStar = hoveredStar > 0 ? hoveredStar : selectedStar;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
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
              onClick={() =>
                form.setValue('star', star, { shouldValidate: true })
              }
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
        {form.formState.errors.star && (
          <span className='text-destructive text-xs font-semibold'>
            {form.formState.errors.star.message}
          </span>
        )}
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
          {...form.register('comment')}
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
