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

export type UserContextType = {
   user?: User;
   setUser: Dispatch<SetStateAction<User>>;
};

export type RegistrationForm = {
   email: string;
   password?: string;
   repeatedPassword?: string;
   username?: string;
   age?: number;
   gravatarEmail?: string;
};

export type ErrorToast = { message: string; id: number };
export type ApiError = { message: string; errors: unknown[] };
