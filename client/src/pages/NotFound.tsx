import { NavLink } from 'react-router-dom';

const NotFound = () => {
   return (
      <div className="flex justify-center items-center h-full flex-col">
         <h1 className="text-5xl">Page not found</h1>
         <NavLink to="/" className="underline hover:text-blue-700">
            Go to home
         </NavLink>
      </div>
   );
};

export default NotFound;
