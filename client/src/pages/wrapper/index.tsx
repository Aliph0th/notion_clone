import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from '../../ui/Breadcrumbs';
import { useContext } from 'react';
import { ErrorContext } from '../../context';
import Toast from '../../ui/Toast';

const Wrapper = () => {
   const { errorToasts, onToastClose } = useContext(ErrorContext);
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
