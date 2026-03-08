'use client';

interface CheckoutUserInfoProps {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
}

/**
 * Displays authenticated user information in the checkout page.
 * Read-only section showing name, email, and phone number.
 */
export function CheckoutUserInfo({
  name,
  email,
  phone,
}: CheckoutUserInfoProps) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-display-xs text-foreground font-bold'>
        User Information
      </h2>

      <div className='flex flex-col'>
        <div className='flex items-center justify-between py-3 first:pt-0'>
          <span className='text-foreground text-md font-medium tracking-[-0.03em]'>
            Name
          </span>
          <span className='text-foreground text-md font-bold tracking-[-0.02em]'>
            {name}
          </span>
        </div>

        <div className='flex items-center justify-between py-3'>
          <span className='text-foreground text-md font-medium tracking-[-0.03em]'>
            Email
          </span>
          <span className='text-foreground text-md font-bold tracking-[-0.02em]'>
            {email}
          </span>
        </div>

        <div className='flex items-center justify-between py-3 last:pb-0'>
          <span className='text-foreground text-md font-medium tracking-[-0.03em]'>
            Nomor Handphone
          </span>
          <span className='text-foreground text-md font-bold tracking-[-0.02em]'>
            {phone}
          </span>
        </div>
      </div>
    </div>
  );
}
