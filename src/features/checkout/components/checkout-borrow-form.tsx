'use client';

import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar } from '@untitledui/icons';
import dayjs from 'dayjs';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { BorrowDuration } from '../types/checkout.types';

const DURATION_OPTIONS: readonly BorrowDuration[] = [3, 5, 10];

const today = dayjs().format('YYYY-MM-DD');

const checkoutSchema = z.object({
  borrowDate: z.string().min(1, 'Borrow date is required'),
  duration: z.union([z.literal(3), z.literal(5), z.literal(10)]),
  agreeReturn: z.boolean().refine((val) => val === true, {
    message: 'You must agree to return the book before the due date.',
  }),
  agreePolicy: z.boolean().refine((val) => val === true, {
    message: 'You must accept the library borrowing policy.',
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutBorrowFormProps {
  readonly isSubmitting: boolean;
  readonly onSubmit: (borrowDate: string, duration: BorrowDuration) => void;
}

export function CheckoutBorrowForm({
  isSubmitting,
  onSubmit,
}: CheckoutBorrowFormProps) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      borrowDate: today,
      duration: 3,
      agreeReturn: false,
      agreePolicy: false,
    },
    mode: 'onChange', // Validate on change so the submit button enables immediately
  });

  const {
    watch,
    control,
    handleSubmit,
    register,
    formState: { isValid, errors },
  } = form;

  const watchBorrowDate = watch('borrowDate');
  const watchDuration = watch('duration');

  const returnDate = useMemo(
    () =>
      dayjs(watchBorrowDate).add(watchDuration, 'day').format('D MMMM YYYY'),
    [watchBorrowDate, watchDuration]
  );

  const displayBorrowDate = useMemo(
    () => dayjs(watchBorrowDate).format('D MMM YYYY'),
    [watchBorrowDate]
  );

  const submitForm = (data: CheckoutFormValues) => {
    onSubmit(data.borrowDate, data.duration);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='bg-background shadow-card flex flex-col gap-4 rounded-2xl p-4 md:gap-6 md:rounded-2xl md:p-5'
    >
      {/* Title */}
      <h2 className='text-foreground md:text-display-xs text-xl leading-8.5 font-bold tracking-[-0.02em] md:leading-9.5'>
        Complete Your Borrow Request
      </h2>

      {/* Borrow Date Input */}
      <div className='flex flex-col gap-0.5'>
        <label
          htmlFor='borrow-date'
          className='text-foreground text-sm leading-7 font-bold tracking-[-0.02em]'
        >
          Borrow Date
        </label>
        <div className='relative'>
          <input
            id='borrow-date'
            type='date'
            min={today}
            {...register('borrowDate')}
            className={cn(
              'border-border text-foreground bg-secondary w-full rounded-xl border px-4 py-2',
              'text-md leading-7.5 font-semibold tracking-[-0.02em]',
              'focus-visible:ring-ring outline-none focus-visible:ring-2',
              '[&::-webkit-calendar-picker-indicator]:opacity-0',
              errors.borrowDate && 'border-destructive'
            )}
          />
          <div className='pointer-events-none absolute inset-y-0 end-4 flex items-center'>
            <Calendar
              className='text-foreground size-5'
              strokeWidth={2}
              aria-hidden='true'
            />
          </div>
        </div>
        <span className='text-muted-foreground text-xs'>
          {watchBorrowDate ? displayBorrowDate : 'Select a date'}
        </span>
      </div>

      {/* Borrow Duration Radio */}
      <fieldset className='flex flex-col gap-3'>
        <legend className='text-foreground md:text-md text-sm leading-7 font-bold tracking-[-0.02em] md:leading-7.5'>
          Borrow Duration
        </legend>
        <Controller
          name='duration'
          control={control}
          render={({ field }) => (
            <>
              {DURATION_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className='flex cursor-pointer items-center gap-2 md:gap-3.75'
                >
                  <span
                    className={cn(
                      'flex size-6 items-center justify-center rounded-full border-2 transition-colors',
                      field.value === opt
                        ? 'border-primary bg-primary'
                        : 'bg-background border-input'
                    )}
                    aria-hidden='true'
                  >
                    {field.value === opt && (
                      <span className='bg-background size-2.5 rounded-full' />
                    )}
                  </span>
                  <input
                    type='radio'
                    name={field.name}
                    value={opt}
                    checked={field.value === opt}
                    onChange={() => field.onChange(opt)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className='sr-only'
                  />
                  <span className='text-foreground md:text-md text-sm leading-7 font-semibold tracking-[-0.02em] md:leading-7.5'>
                    {opt} Days
                  </span>
                </label>
              ))}
            </>
          )}
        />
      </fieldset>

      {/* Return Date Info Box */}
      <div className='bg-accent flex flex-col rounded-xl p-3 md:p-4'>
        <span className='text-foreground md:text-md text-sm leading-7 font-bold tracking-[-0.02em] md:leading-7.5'>
          Return Date
        </span>
        <p className='text-foreground md:text-md text-sm leading-7 font-medium tracking-[-0.03em] md:leading-7.5'>
          Please return the book no later than{' '}
          <span className='text-destructive font-bold'>{returnDate}</span>
        </p>
      </div>

      {/* Agreement Checkboxes */}
      <div className='flex flex-col gap-2'>
        <label className='flex cursor-pointer items-center gap-2 md:gap-4'>
          <Controller
            name='agreeReturn'
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className='size-5 rounded-md'
              />
            )}
          />
          <span className='text-foreground md:text-md text-sm leading-7 font-semibold tracking-[-0.02em] md:leading-7.5'>
            I agree to return the book(s) before the due date.
          </span>
        </label>

        <label className='flex cursor-pointer items-center gap-2 md:gap-4'>
          <Controller
            name='agreePolicy'
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className='size-5 rounded-md'
              />
            )}
          />
          <span className='text-foreground md:text-md text-sm leading-7 font-semibold tracking-[-0.02em] md:leading-7.5'>
            I accept the library borrowing policy.
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type='submit'
        size='lg'
        className='text-md h-12 w-full rounded-full leading-7.5 font-bold tracking-[-0.02em]'
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Confirm & Borrow'}
      </Button>
    </form>
  );
}
