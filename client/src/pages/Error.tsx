import { NavLink } from 'react-router-dom';

const Error = () => {
   return (
      <div className="flex justify-center items-center h-full flex-col">
         <h1 className="text-5xl text-red-600 font-bold">Some error is occur</h1>
         <NavLink to="/" className="underline hover:text-blue-700">
            Go to home
         </NavLink>
      </div>
   );
};

export default Error;
