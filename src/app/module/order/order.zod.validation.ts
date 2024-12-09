import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z
  .string()
  .refine((id) => Types.ObjectId.isValid(id), { message: 'Invalid ObjectId' });

export const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  product: objectIdSchema,
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
  totalPrice: z
    .number()
    .positive({ message: 'Total price must be a positive number' }),
});
