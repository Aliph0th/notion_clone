import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Wrapper from './pages/wrapper';
import Error from './pages/Error';
import Protected from './pages/auth/Protected';
import SignUp from './pages/auth/SignUp';

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
                        <Protected>
                           <Main />
                        </Protected>
                     ),
                     index: true
                  },
                  {
                     element: <SignUp />,
                     path: 'signup'
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
