import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useAppSelector, useAppDispatch } from '@/lib/hooks-redux';
import { selectIsAuthenticated, setCredentials } from '../store';
import { useLogin } from '../queries/auth.queries';
import { loginSchema, type LoginValues } from '../types/auth.schema';

export function useLoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { mutate: login, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginValues) => {
    setErrorMsg('');
    login(values, {
      onSuccess: (data) => {
        if (data.success && data.data?.user) {
          dispatch(setCredentials(data.data.user));
          router.push('/');
        } else {
          setErrorMsg(data.message || 'Login failed');
        }
      },
      onError: (err: any) => {
        setErrorMsg(
          err.response?.data?.message || 'An error occurred during login'
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
    errorMsg,
  };
}
