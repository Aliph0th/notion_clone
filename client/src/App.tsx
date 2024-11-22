import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Wrapper from './pages/wrapper';
import Error from './pages/Error';
import AuthWrapper from './pages/auth/AuthWrapper';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Settings from './pages/settings/Settings';
import NoteList from './pages/notes/NoteList';
import UpsertNote from './pages/notes/UpsertNote';
import Note from './pages/notes/Note';

const router = createBrowserRouter(
   [
      {
         path: '/',
         element: <Wrapper />,
         handle: {
            crumb: () => 'Home'
         },
         children: [
            {
               errorElement: <Error />,
               children: [
                  {
                     element: (
                        <AuthWrapper isAuthRequired to="/login">
                           <Main />
                        </AuthWrapper>
                     ),
                     index: true
                  },
                  {
                     element: (
                        <AuthWrapper to="/">
                           <SignUp />
                        </AuthWrapper>
                     ),
                     path: 'signup',
                     handle: {
                        crumb: () => 'Sign up'
                     }
                  },
                  {
                     element: (
                        <AuthWrapper to="/">
                           <Login />
                        </AuthWrapper>
                     ),
                     path: 'login',
                     handle: {
                        crumb: () => 'Log in'
                     }
                  },
                  {
                     element: (
                        <AuthWrapper isAuthRequired to="/login">
                           <Settings />
                        </AuthWrapper>
                     ),
                     path: 'settings',
                     handle: {
                        crumb: () => 'Settings'
                     }
                  },
                  {
                     element: (
                        <AuthWrapper isAuthRequired to="/login">
                           <NoteList />
                        </AuthWrapper>
                     ),
                     path: 'notes',
                     handle: {
                        crumb: () => 'Notes'
                     }
                  },
                  {
                     element: (
                        <AuthWrapper isAuthRequired to="/login">
                           <UpsertNote />
                        </AuthWrapper>
                     ),
                     path: 'notes/create',
                     handle: {
                        crumb: () => 'Create a new note'
                     }
                  },
                  {
                     element: (
                        <AuthWrapper isAuthRequired to="/login">
                           <Note />
                        </AuthWrapper>
                     ),
                     path: 'notes/:noteID',
                     handle: {
                        crumb: (params: Record<string, string>) => `Note #${params.noteID}`
                     }
                  },
                  {
                     path: '*',
                     element: <NotFound />
                  }
               ]
            }
         ]
      }
   ],
   {
      future: {
         v7_fetcherPersist: true,
         v7_normalizeFormMethod: true,
         v7_partialHydration: true,
         v7_relativeSplatPath: true,
         v7_skipActionErrorRevalidation: true
      }
   }
);

function App() {
   return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}

export default App;
