import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Wrapper from './pages/wrapper';
import Error from './pages/Error';
import AuthWrapper from './pages/auth/AuthWrapper';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';

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
