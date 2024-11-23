import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import AuthWrapper from './pages/auth/AuthWrapper';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Note from './pages/notes/Note';
import NoteList from './pages/notes/NoteList';
import UpsertNote from './pages/notes/UpsertNote';
import Settings from './pages/settings/Settings';
import Wrapper from './pages/wrapper';

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
                           <Navigate to="/notes" replace />
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
                     path: 'notes',
                     handle: {
                        crumb: () => 'Notes'
                     },
                     children: [
                        {
                           element: (
                              <AuthWrapper isAuthRequired to="/login">
                                 <NoteList />
                              </AuthWrapper>
                           ),
                           index: true
                        },
                        {
                           element: (
                              <AuthWrapper isAuthRequired to="/login">
                                 <UpsertNote />
                              </AuthWrapper>
                           ),
                           path: 'create',
                           handle: {
                              crumb: () => 'Create a new note'
                           }
                        },
                        {
                           path: ':noteID',
                           handle: {
                              crumb: (params: Record<string, string>) => `Note #${params.noteID}`
                           },
                           children: [
                              {
                                 element: (
                                    <AuthWrapper isAuthRequired to="/login">
                                       <Note />
                                    </AuthWrapper>
                                 ),
                                 index: true
                              },
                              {
                                 element: (
                                    <AuthWrapper isAuthRequired to="/login">
                                       <UpsertNote />
                                    </AuthWrapper>
                                 ),
                                 path: 'edit',
                                 handle: {
                                    crumb: () => 'Edit'
                                 }
                              }
                           ]
                        }
                     ]
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
