import { MutationFunction } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { DefaultValues } from 'react-hook-form';
import { UIMatch } from 'react-router-dom';
import { z } from 'zod';

export type BreadcrumbMatch = UIMatch<unknown, { crumb?: (_: unknown) => ReactNode }>;

export type User = {
   id: number;
   email: string;
   username?: string;
   age?: number;
   gravatarEmail: string;
   registrationDate: Date;
};

export type Note = {
   id: number;
   name: string;
   content: string;
   userID: number;
   createdAt: Date;
   updatedAt: Date;
};

export type RegistrationForm = {
   email: string;
   password: string;
   repeatedPassword?: string;
   username?: string;
   age?: number;
   gravatarEmail?: string;
};
export type LoginForm = Pick<RegistrationForm, 'email' | 'password'>;
export type ChangeInfoForm = Pick<RegistrationForm, 'username' | 'age' | 'gravatarEmail'>;
export type ChangePasswordForm = Pick<Required<RegistrationForm>, 'password' | 'repeatedPassword'> & {
   currentPassword: string;
};
export type NoteForm = {
   name: string;
   content: string;
};

export type ErrorToast = { message: string; id: number };
export type ApiError = { message: string; errors: unknown[] };
export type SettingsResult = { type: 'success' | 'error'; message: string };

export type AuthSuccessResult = {
   accessToken: string;
   user: User;
};

export type AppFormHookParams<T, K> = {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   mutationFn: MutationFunction<K, any>;
   onSuccess?: (_: K) => void;
   defaultValues: DefaultValues<T>;
   schema: z.Schema<unknown, unknown>;
   mutateDataIDs?: { userID?: number; noteID?: number };
};
