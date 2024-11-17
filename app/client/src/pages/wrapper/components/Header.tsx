import { NavLink } from 'react-router-dom';
import { HEADER_LINKS } from '../../../constants';
import { useContext } from 'react';
import { UserContext } from '../../../context/contexts';

const Header = () => {
   const { user } = useContext(UserContext);
   return (
      <header>
         <nav className="bg-white border-gray-200">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4 w-full md:block md:w-auto border-b border-gray-400">
               <ul className="font-medium flex flex-row border-gray-700 rounded-lg space-x-8 mt-0">
                  {HEADER_LINKS[user ? 'Authenticated' : 'Unauthenticated'].map(link => (
                     <li key={link.title}>
                        <NavLink
                           to={link.path}
                           className={({ isActive }) =>
                              `${isActive ? 'bg-gray-200' : ''} text-blue-700 p-3 rounded-lg hover:underline`
                           }
                        >
                           {link.title}
                        </NavLink>
                     </li>
                  ))}
               </ul>
            </div>
         </nav>
      </header>
   );
};

export default Header;
