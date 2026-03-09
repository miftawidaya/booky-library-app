'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { updateProfile, type UpdateProfileRequest } from '../api/profile.api';
import {
  updateProfileSchema,
  type UpdateProfileValues,
} from '../types/profile.schema';
import { setCredentials } from '@/features/auth/store/auth.slice';
import type { RootState } from '@/lib/store';

interface UpdateProfileDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

export function UpdateProfileDialog({
  open,
  onOpenChange,
}: UpdateProfileDialogProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    mode: 'onChange',
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      profilePhoto: undefined,
    },
  });

  React.useEffect(() => {
    if (open && user) {
      form.reset({
        name: user.name || '',
        phone: user.phone || '',
        profilePhoto: undefined,
      });
      setPhotoPreview(user.profilePhoto || null);
    }
  }, [open, user, form]);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onMutate: async (values) => {
      const previousUser = user;

      const optimisticUser = {
        ...user,
        name: values.name || user?.name || '',
        phone: values.phone || user?.phone || '',
      };

      if (values.profilePhoto instanceof File) {
        optimisticUser.profilePhoto = URL.createObjectURL(values.profilePhoto);
      }

      if (user) {
        dispatch(setCredentials(optimisticUser as NonNullable<typeof user>));
      }

      onOpenChange(false);
      return { previousUser };
    },
    onSuccess: (response) => {
      toast.success('Profile updated successfully');

      const updatedUser = (response.data as any).profile || response.data;
      if (user && updatedUser) {
        dispatch(setCredentials({ ...user, ...updatedUser }));
      }
    },
    onError: (error: Error, _variables, context) => {
      if (context?.previousUser) {
        dispatch(setCredentials(context.previousUser));
      }
      toast.error(error.message || 'Failed to update profile');
    },
  });

  const onSubmit = (values: UpdateProfileValues) => {
    const payload: UpdateProfileRequest = {
      name: values.name,
      phone: values.phone || undefined,
    };
    if (values.profilePhoto instanceof File) {
      payload.profilePhoto = values.profilePhoto;
    }
    mutation.mutate(payload);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a blob URL for preview
      const objectUrl = URL.createObjectURL(file);
      setPhotoPreview(objectUrl);
      form.setValue('profilePhoto', file, { shouldValidate: true });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-full max-w-[90vw] rounded-2xl p-6 md:max-w-100'>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-display-xs text-foreground font-bold'>
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5'
        >
          {/* Avatar Edit Area */}
          <div className='flex flex-col items-center gap-3'>
            <div className='bg-secondary relative size-20 overflow-hidden rounded-full'>
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt='Preview'
                  fill
                  sizes='80px'
                  className='object-cover'
                />
              ) : (
                <div className='flex size-full items-center justify-center'>
                  <Icon
                    icon='ri:user-line'
                    className='text-muted-foreground size-10'
                  />
                </div>
              )}
            </div>
            <div>
              <input
                type='file'
                id='profilePhoto'
                accept='image/png, image/jpeg, image/jpg'
                className='hidden'
                onChange={handleFileChange}
              />
              <label
                htmlFor='profilePhoto'
                className='text-primary cursor-pointer text-sm font-bold hover:underline'
              >
                Change Photo
              </label>
            </div>
            {form.formState.errors.profilePhoto && (
              <p className='text-destructive text-sm font-medium'>
                {form.formState.errors.profilePhoto.message as string}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-4'>
            {/* Name Field */}
            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='name'
                className='text-foreground text-sm font-bold'
              >
                Name
              </label>
              <input
                {...form.register('name')}
                id='name'
                type='text'
                placeholder='Enter your name'
                className='border-input placeholder:text-muted-foreground focus-visible:ring-ring bg-background text-foreground h-11 w-full rounded-lg border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none'
              />
              {form.formState.errors.name && (
                <p className='text-destructive text-sm font-medium'>
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='phone'
                className='text-foreground text-sm font-bold'
              >
                Nomor Handphone
              </label>
              <input
                {...form.register('phone')}
                id='phone'
                type='tel'
                placeholder='081234567890'
                className='border-input placeholder:text-muted-foreground focus-visible:ring-ring bg-background text-foreground h-11 w-full rounded-lg border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none'
              />
              {form.formState.errors.phone && (
                <p className='text-destructive text-sm font-medium'>
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <Button type='submit' className='h-11 w-full rounded-full font-bold'>
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
