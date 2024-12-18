import { z } from 'zod';

export const registrationSchema = z
   .object({
      email: z.string().email('Invalid email'),
      password: z
         .string()
         .min(8, "Password's length must be at least 8 characters")
         .refine(value => [/[A-Z]/, /[a-z]/, /\d/].every(regex => regex.test(value)), 'Password is weak'),
      repeatedPassword: z
         .string()
         .min(8, "Password's length must be at least 8 characters")
         .refine(value => [/[A-Z]/, /[a-z]/, /\d/].every(regex => regex.test(value)), 'Password is weak'),
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

export const loginSchema = z.object({
   email: z.string().email('Invalid email'),
   password: z.string().min(8, "Password's length must be at least 8 characters")
});

export const changePasswordSchema = z
   .object({
      currentPassword: z.string().min(8, "Password's length must be at least 8 characters"),
      password: z
         .string()
         .min(8, "Password's length must be at least 8 characters")
         .refine(value => [/[A-Z]/, /[a-z]/, /\d/].every(regex => regex.test(value)), 'Password is weak'),
      repeatedPassword: z
         .string()
         .min(8, "Password's length must be at least 8 characters")
         .refine(value => [/[A-Z]/, /[a-z]/, /\d/].every(regex => regex.test(value)), 'Password is weak')
   })
   .refine(data => data.password === data.repeatedPassword, {
      message: "Passwords don't match",
      path: ['repeatedPassword']
   });

export const generalInfoSchema = z.object({
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
});

export const noteSchema = z.object({
   name: z
      .string()
      .refine(
         value => value.length >= 1 && value.length <= 256,
         'Name of the note must consist of at least 1 character and be no longer than 256'
      ),
   content: z
      .string()
      .refine(
         value => value.length >= 1 && value.length <= 1000,
         'Content of the note must consist of at least 1 character and be no longer than 1000'
      )
});
