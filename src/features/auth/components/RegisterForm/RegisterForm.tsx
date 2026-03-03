'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

import { useRegisterForm } from '../../hooks/useRegisterForm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

export function RegisterForm() {
  const {
    form,
    onSubmit,
    isPending,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errorMsg,
  } = useRegisterForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className='flex w-full flex-col items-start gap-5'>
      {/* Logo */}
      <div className='flex shrink-0 items-start justify-center'>
        <Logo className='text-primary [&>span]:text-foreground' size='lg' />
      </div>

      {/* Header */}
      <div className='flex w-full flex-col gap-0.5 self-stretch md:gap-2'>
        <h1 className='text-foreground text-2xl font-bold tracking-tight md:text-3xl'>
          Register
        </h1>
        <p className='text-sm font-semibold tracking-tight text-neutral-700 md:text-base'>
          Create your account to start borrowing books.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-col items-center gap-4 self-stretch'
      >
        {errorMsg && (
          <div className='bg-destructive/10 text-destructive w-full rounded-xl p-3 text-sm font-semibold'>
            {errorMsg}
          </div>
        )}

        {/* Name Input */}
        <div className='flex w-full flex-col gap-0.5 self-stretch'>
          <label className='text-foreground text-sm font-bold tracking-tight'>
            Name
          </label>
          <Input
            type='text'
            placeholder='John Doe'
            {...register('name')}
            aria-invalid={!!errors.name}
            className='h-12'
          />
          {errors.name && (
            <p className='text-destructive mt-0.5 text-xs font-semibold'>
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className='flex w-full flex-col gap-0.5 self-stretch'>
          <label className='text-foreground text-sm font-bold tracking-tight'>
            Email
          </label>
          <Input
            type='email'
            placeholder='johndoe@email.com'
            {...register('email')}
            aria-invalid={!!errors.email}
            className='h-12'
          />
          {errors.email && (
            <p className='text-destructive mt-0.5 text-xs font-semibold'>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div className='flex w-full flex-col gap-0.5 self-stretch'>
          <label className='text-foreground text-sm font-bold tracking-tight'>
            Nomor Handphone
          </label>
          <Input
            type='tel'
            placeholder='081234567890'
            {...register('phone')}
            aria-invalid={!!errors.phone}
            className='h-12'
          />
          {errors.phone && (
            <p className='text-destructive mt-0.5 text-xs font-semibold'>
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className='flex w-full flex-col gap-0.5 self-stretch'>
          <label className='text-foreground text-sm font-bold tracking-tight'>
            Password
          </label>
          <div className='relative w-full'>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='johndoe123'
              {...register('password')}
              aria-invalid={!!errors.password}
              className='h-12 pr-12'
            />
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className='focus-visible:ring-ring absolute top-1/2 right-4 -translate-y-1/2 text-neutral-950 transition-colors focus:outline-none focus-visible:ring-2'
            >
              {showPassword ? (
                <EyeOff className='size-5' />
              ) : (
                <Eye className='size-5' />
              )}
            </button>
          </div>
          {errors.password && (
            <p className='text-destructive mt-0.5 text-xs font-semibold'>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className='flex w-full flex-col gap-0.5 self-stretch'>
          <label className='text-foreground text-sm font-bold tracking-tight'>
            Confirm Password
          </label>
          <div className='relative w-full'>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='johndoe123'
              {...register('confirmPassword')}
              aria-invalid={!!errors.confirmPassword}
              className='h-12 pr-12'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword ? 'Hide password' : 'Show password'
              }
              className='focus-visible:ring-ring absolute top-1/2 right-4 -translate-y-1/2 text-neutral-950 transition-colors focus:outline-none focus-visible:ring-2'
            >
              {showConfirmPassword ? (
                <EyeOff className='size-5' />
              ) : (
                <Eye className='size-5' />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className='text-destructive mt-0.5 text-xs font-semibold'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type='submit'
          className='h-12 w-full text-base font-bold tracking-tight disabled:opacity-70'
          disabled={isPending}
        >
          {isPending ? 'Registering...' : 'Submit'}
        </Button>

        {/* Login Prompt */}
        <div className='flex flex-row items-center justify-center gap-1 self-stretch pt-2'>
          <span className='text-foreground text-sm font-semibold tracking-tight md:text-base'>
            Already have an account?
          </span>
          <Link
            href='/login'
            className='text-primary hover:text-primary-400 text-sm font-bold tracking-tight transition-colors md:text-base'
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}
