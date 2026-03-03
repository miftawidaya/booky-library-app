import { Metadata } from 'next';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your account to start borrowing books',
};

export default function RegisterPage() {
  return (
    <div className='bg-background flex min-h-screen items-center justify-center p-6 md:p-8'>
      <div className='w-full shrink-0 border-0 bg-transparent sm:max-w-100'>
        <RegisterForm />
      </div>
    </div>
  );
}
