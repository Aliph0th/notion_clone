import { Dispatch, ReactNode, SetStateAction } from 'react';
import { UIMatch } from 'react-router-dom';

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

export type UserContextType = {
   user?: User;
   setUser: Dispatch<SetStateAction<User>>;
   isPending: boolean;
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
