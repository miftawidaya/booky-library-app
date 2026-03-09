import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
]);

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name cannot exceed 255 characters'),
  phone: z
    .string()
    .min(8, 'Phone must be at least 8 characters')
    .max(20, 'Phone cannot exceed 20 characters')
    .regex(/^\d+$/, 'Phone must contain only numbers')
    .or(z.literal(''))
    .optional(),
  profilePhoto: z
    .any()
    .refine((file) => {
      if (!file) return true;
      if (file instanceof File) return file.size <= MAX_FILE_SIZE;
      return true;
    }, 'Max image size is 5MB')
    .refine((file) => {
      if (!file) return true;
      if (file instanceof File) return ACCEPTED_IMAGE_TYPES.has(file.type);
      return true;
    }, 'Only .jpg, .jpeg, .png, .webp and .gif formats are supported')
    .optional(),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;
