import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from '../../ui/Breadcrumbs';

const Wrapper = () => {
   return (
      <div className="h-screen flex flex-col">
         <Header />
         <main className="flex-1 px-7 flex flex-col">
            <Breadcrumbs />
            <Outlet />
         </main>
         <Footer />
      </div>
   );
};

export default Wrapper;
