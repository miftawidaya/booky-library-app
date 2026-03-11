import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAppSelector, useAppDispatch } from '@/lib/hooks-redux';
import { selectIsAuthenticated, selectUser, setCredentials } from '../store';
import { useRegister, useLogin } from '../queries/auth.queries';
import { registerSchema, type RegisterValues } from '../types/auth.schema';

export function useRegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const { mutate: register, isPending: isRegisterPending } = useRegister();
  const { mutate: login, isPending: isLoginPending } = useLogin();
  
  const isPending = isRegisterPending || isLoginPending;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const redirectUrl = searchParams.get('redirect');

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (redirectUrl && redirectUrl !== '/') {
        router.replace(redirectUrl);
      } else {
        router.replace(user.role === 'ADMIN' ? '/admin' : '/');
      }
    }
  }, [isAuthenticated, user, router, redirectUrl]);

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
          // Auto login after successful registration
          login(
            { email: values.email, password: values.password },
            {
              onSuccess: (loginData) => {
                if (loginData.success && loginData.data?.user) {
                  dispatch(setCredentials(loginData.data.user));
                  if (redirectUrl && redirectUrl !== '/') {
                    router.push(redirectUrl);
                  } else {
                    router.push(loginData.data.user.role === 'ADMIN' ? '/admin' : '/');
                  }
                } else {
                  // Fallback if auto-login fails
                  const redirectQueryString = redirectUrl ? `&redirect=${encodeURIComponent(redirectUrl)}` : '';
                  router.push(`/login?registered=true${redirectQueryString}`);
                }
              },
              onError: () => {
                // Fallback to manual login route on error
                const redirectQueryString = redirectUrl ? `&redirect=${encodeURIComponent(redirectUrl)}` : '';
                router.push(`/login?registered=true${redirectQueryString}`);
              },
            }
          );
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
