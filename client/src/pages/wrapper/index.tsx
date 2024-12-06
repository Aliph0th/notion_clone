import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Breadcrumbs from '../../ui/Breadcrumbs';
import Toast from '../../ui/Toast';
import Footer from './components/Footer';
import Header from './components/Header';

const Wrapper = () => {
   const dispatch = useAppDispatch();
   const errorToasts = useAppSelector(state => state.errorToasts);

   const onToastClose = (id: number) => {
      dispatch({ type: 'CLOSE_TOAST', payload: id });
   };

   return (
      <div className="h-screen flex flex-col relative">
         <Header />
         <main className="flex-1 px-7 flex flex-col">
            <Breadcrumbs />
            <Outlet />
            {errorToasts.length > 0 && (
               <div className="absolute bottom-10 right-6 flex flex-col gap-y-1">
                  {errorToasts.map(toast => (
                     <Toast key={toast.id} onClick={() => onToastClose(toast.id)} message={toast.message} />
                  ))}
               </div>
            )}
         </main>
         <Footer />
      </div>
   );
};

export default Wrapper;
