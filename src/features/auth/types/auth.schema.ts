import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email cannot exceed 255 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(255, 'Name cannot exceed 255 characters'),
    email: z
      .string()
      .email('Invalid email address')
      .max(255, 'Email cannot exceed 255 characters'),
    phone: z
      .string()
      .min(10, 'Phone must be at least 10 characters')
      .max(20, 'Phone cannot exceed 20 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
