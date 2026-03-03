import { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to access the library application',
};

export default function LoginPage() {
  return (
    <div className='bg-background flex min-h-screen items-center justify-center p-6 md:p-8'>
      <div className='w-full shrink-0 border-0 bg-transparent sm:max-w-100'>
        <LoginForm />
      </div>
    </div>
  );
}
