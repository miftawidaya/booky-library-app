'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCreateReview } from '@/features/reviews/api/reviews.mutations';

const reviewSchema = z.object({
  star: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().trim().min(1, 'Please enter your review'),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface GiveReviewDialogProps {
  readonly bookId: number;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

/**
 * GiveReviewDialog component
 *
 * Implements the Figma design for the review popup.
 * Provides star rating and comment input.
 */
export function GiveReviewDialog({
  bookId,
  open,
  onOpenChange,
}: GiveReviewDialogProps) {
  const router = useRouter();
  const [hoveredStar, setHoveredStar] = React.useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { star: 0, comment: '' },
  });

  const createReview = useCreateReview({
    onSuccess: () => {
      toast.success('Review submitted successfully');
      form.reset();
      onOpenChange(false);
      // Navigate to the user's review list page
      router.push('/reviews');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit review');
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    createReview.mutate({
      bookId,
      star: data.star,
      comment: data.comment,
    });
  };

  const selectedStar = form.watch('star');
  const displayStar = hoveredStar > 0 ? hoveredStar : selectedStar;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex h-119.75 w-86.25 max-w-none flex-col items-center gap-6 p-4 md:h-129.5 md:w-109.75 md:gap-6 md:p-6'>
        <DialogHeader className='flex w-full flex-row items-center justify-between gap-0 p-0'>
          <DialogTitle className='text-foreground text-[18px] leading-8 font-bold tracking-[-0.03em] md:text-[24px] md:leading-9 md:font-bold md:tracking-normal'>
            Give Review
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col items-center gap-6'
        >
          {/* Rating Section */}
          <div className='flex w-full flex-col items-center justify-center gap-0'>
            <span className='text-foreground text-[14px] leading-7 font-bold tracking-[-0.02em] md:text-[16px] md:leading-7.5 md:font-bold md:tracking-normal'>
              Give Rating
            </span>
            <div className='flex items-center justify-center gap-[4.08px]'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={`star-${star}`}
                  type='button'
                  className='transition-transform hover:scale-110 focus-visible:outline-none'
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() =>
                    form.setValue('star', star, { shouldValidate: true })
                  }
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  <Icon
                    icon='ri:star-fill'
                    className={`size-6 transition-colors md:size-9 ${
                      star <= displayStar
                        ? 'text-rating'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Input */}
          <div className='w-full'>
            <textarea
              {...form.register('comment')}
              placeholder='Share your thoughts about this book...'
              className='text-foreground focus:ring-primary h-58.75 w-full resize-none rounded-xl border border-neutral-300 p-2 ps-3 pe-3 text-[14px] leading-7 font-medium tracking-[-0.03em] placeholder:text-neutral-500 focus:ring-2 focus:outline-none md:h-58.75 md:text-[16px] md:leading-7.5'
            />
            {form.formState.errors.comment && (
              <p className='text-destructive mt-1 text-xs font-bold'>
                {form.formState.errors.comment.message}
              </p>
            )}
            {form.formState.errors.star && (
              <p className='text-destructive mt-1 text-center text-xs font-bold'>
                {form.formState.errors.star.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={createReview.isPending}
            className='bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-full rounded-full text-[14px] leading-7 font-bold tracking-[-0.02em] md:h-12 md:text-[16px] md:leading-7.5'
          >
            {createReview.isPending ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
