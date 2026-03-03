import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/lib/hooks-redux';
import { selectIsAuthenticated } from '../store';
import { useRegister } from '../queries/auth.queries';
import { registerSchema, type RegisterValues } from '../types/auth.schema';

export function useRegisterForm() {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { mutate: register, isPending } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: RegisterValues) => {
    setErrorMsg('');
    register(values, {
      onSuccess: (data) => {
        if (data.success) {
          // The API notes say "After registration, user needs to login via POST /api/auth/login to get authentication token"
          // So we should redirect to login page after successful registration
          router.push('/login?registered=true');
        } else {
          setErrorMsg(data.message || 'Registration failed');
        }
      },
      onError: (err: any) => {
        setErrorMsg(
          err.response?.data?.message || 'An error occurred during registration'
        );
      },
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errorMsg,
  };
}
