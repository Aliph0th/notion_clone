import { z } from 'zod';

export const registrationSchema = z
   .object({
      email: z.string().email('Invalid email'),
      password: z
         .string()
         .min(8, "Password's length must be at least 8 characters")
         .refine(
            value => [/[A-Z]/, /[a-z]/, /\d/].every(regex => regex.test(value)),
            'Password must contain at least one capital letter, lowercase letter and digit'
         ),
      repeatedPassword: z
         .string()
         .min(8, "Password's length must be at least 8 characters")
         .refine(
            value => [/[A-Z]/, /[a-z]/, /\d/].every(regex => regex.test(value)),
            'Password must contain at least one capital letter, lowercase letter and digit'
         ),
      age: z.preprocess(
         value => (value ? value : undefined),
         z.coerce.number().int().min(1, 'Age must be greater than 0').optional()
      ),
      username: z.preprocess(
         value => (value ? value : undefined),
         z
            .string()
            .refine(
               value => value.length >= 1 && value.length <= 20,
               'Username must be a string from 1 to 20 characters long'
            )
            .optional()
      ),
      gravatarEmail: z.preprocess(value => (value ? value : undefined), z.string().email('Invalid email').optional())
   })
   .refine(data => data.password === data.repeatedPassword, {
      message: "Passwords don't match",
      path: ['repeatedPassword']
   });
