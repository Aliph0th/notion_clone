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
