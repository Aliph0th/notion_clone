import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Wrapper from './pages/wrapper';
import Error from './pages/Error';
import Protected from './pages/auth/Protected';

const router = createBrowserRouter([
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
                  path: '*',
                  element: <NotFound />
               }
            ]
         }
      ]
   }
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
