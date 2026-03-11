import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { paths } from '@/config/routes';

import { useAppSelector, useAppDispatch } from '@/lib/hooks-redux';
import { selectIsAuthenticated, selectUser, setCredentials } from '../store';
import { useLogin } from '../queries/auth.queries';
import { loginSchema, type LoginValues } from '../types/auth.schema';

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const { mutate: login, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const redirectUrl = searchParams.get('redirect');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (redirectUrl && redirectUrl !== '/') {
        router.replace(redirectUrl);
      } else {
        router.replace(user.role === 'ADMIN' ? paths.admin.dashboard : paths.public.home);
      }
    }
  }, [isAuthenticated, user, router, redirectUrl]);

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
          if (redirectUrl && redirectUrl !== '/') {
            router.push(redirectUrl);
          } else {
            router.push(data.data.user.role === 'ADMIN' ? paths.admin.dashboard : paths.public.home);
          }
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
