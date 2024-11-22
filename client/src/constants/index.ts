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
         title: 'Home',
         path: '/'
      },
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
   NOTE: 'note'
};
