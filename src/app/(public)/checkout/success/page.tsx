import Link from 'next/link';
import dayjs from 'dayjs';
import { Check } from '@untitledui/icons';
import { Button } from '@/components/ui/button';

interface SuccessPageProps {
  readonly searchParams: Promise<Record<string, string | undefined>>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const loanId = params.loanId ?? '';

  const urlDueDate = params.dueDate ?? null;

  const defaultDueDate = dayjs().add(14, 'day').toISOString();
  const dueDateToDisplay = urlDueDate || defaultDueDate;

  const formattedDueDate = dayjs(dueDateToDisplay).format('D MMMM YYYY');

  return (
    <div className='flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4'>
      <div className='flex flex-col items-center gap-6 md:gap-8'>
        {/* Check Icon with Rings */}
        <div className='border-border/50 flex size-36 items-center justify-center rounded-full border'>
          <div className='border-border/50 flex size-32 items-center justify-center rounded-full border'>
            <div className='border-border/50 flex size-28 items-center justify-center rounded-full border'>
              <div className='bg-primary flex size-20 items-center justify-center rounded-full'>
                <Check
                  className='text-primary-foreground size-12'
                  strokeWidth={2.5}
                  aria-hidden='true'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-foreground md:text-display-xs text-xl leading-8.5 font-bold tracking-[-0.02em] md:leading-9.5'>
            Borrowing Successful!
          </h1>
          <p className='text-foreground text-md text-center leading-8 font-semibold tracking-[-0.02em] md:text-lg'>
            Your book has been successfully borrowed.
            {formattedDueDate && (
              <>
                {' '}
                Please return it by{' '}
                <span className='text-accent-red font-bold'>
                  {formattedDueDate}
                </span>
              </>
            )}
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size='lg'
          className='text-md h-12 min-w-71.5 rounded-full leading-7.5 font-bold tracking-[-0.02em]'
          asChild
        >
          <Link href={loanId ? `/borrowed?loanId=${loanId}` : '/borrowed'}>
            See Borrowed List
          </Link>
        </Button>
      </div>
    </div>
  );
}
