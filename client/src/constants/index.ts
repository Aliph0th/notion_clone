import { ErrorToast } from '../types';

export const DEFAULT_AVATAR = 'https://raw.githubusercontent.com/mmf-web/react-features/refs/heads/main/pedro.gif';
export const HEADER_LINKS = {
   Unauthenticated: [
      {
         title: 'Sign up',
         path: '/signup'
      },
      {
         title: 'Log in',
         path: '/login'
      }
   ],
   Authenticated: [
      {
         title: 'Notes',
         path: '/notes'
      },
      {
         title: 'Settings',
         path: '/settings'
      }
   ]
};

export const QUERY_KEYS = {
   NOTES: 'notes',
   NOTE: 'note',
   USER: 'user'
};

export const DEFAULT_STATE = {
   errorToasts: [] as ErrorToast[]
};

export const ACTIONS = {
   CLOSE_TOAST: 'CLOSE_TOAST',
   PUSH_TOAST: 'PUSH_TOAST'
} as const;
