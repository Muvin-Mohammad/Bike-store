import { z, ZodError } from 'zod';

export const bikeValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  brand: z.string({
    required_error: 'Brand is required',
  }),
  price: z
    .number({
      required_error: 'Price is required',
    })
    .positive('Price must be a positive number'),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
    required_error: 'Category is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  quantity: z
    .number({
      required_error: 'Quantity is required',
    })
    .int('Quantity must be an integer')
    .nonnegative('Quantity cannot be negative'),
  inStock: z.boolean({
    required_error: 'InStock is required',
  }),
});

export const handleZodError = (error: ZodError) => {
  return {
    issues: error.errors.map((err) => ({
      message: err.message,
      code: err.code,
      path: err.path,
      ...(err.code === 'too_small' && { minimum: err.minimum }),
      ...(err.code === 'invalid_enum_value' && { options: err.options }),
      ...(err.received && { received: err.received }),
    })),
    stack: error.stack || 'No stack trace available',
  };
};
