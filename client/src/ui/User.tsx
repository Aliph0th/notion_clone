import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { User as UserType } from '../types';
import SHA256 from 'crypto-js/sha256';
import { DEFAULT_AVATAR } from '../constants';
import arrow from '../assets/arrow.svg';
import { NavLink } from 'react-router-dom';

interface IUserProps {
   user: UserType;
}

const User: FC<IUserProps> = ({ user }) => {
   const [dropped, setDropped] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const dropdownListRef = useRef(null);
   const avatarUrl = useMemo(() => {
      const hash = SHA256(user.gravatarEmail.trim().toLowerCase()).toString();

      return `https://gravatar.com/avatar/${hash}?d=${encodeURIComponent(DEFAULT_AVATAR)}&s=200`;
   }, [user.gravatarEmail]);

   const handleClick = () => setDropped(!dropped);
   const closeMenuHandler = useCallback(
      (e: MouseEvent) => {
         if (dropped && !dropdownListRef.current?.contains(e.target)) {
            setDropped(false);
         }
      },
      [dropped]
   );

   const avatarLoadHandler = () => setIsLoading(false);

   useEffect(() => {
      document.addEventListener('mousedown', closeMenuHandler);
      return () => document.removeEventListener('mousedown', closeMenuHandler);
   }, [closeMenuHandler]);

   return (
      <div className="relative" ref={dropdownListRef}>
         <div className="flex items-center select-none gap-x-2" onClick={handleClick}>
            {isLoading && <div className="w-10 rounded-full bg-gray-200 h-10"></div>}
            <img
               src={avatarUrl}
               className={`${isLoading ? 'hidden' : ''} rounded-full w-10`}
               onLoad={avatarLoadHandler}
               alt="gravatar"
            />
            <img
               src={arrow}
               className={`${dropped ? '-rotate-90' : 'rotate-90'} w-2 transition-transform`}
               alt="arrow"
            />
         </div>

         <div
            className={`${dropped ? '' : 'opacity-0'} transition-opacity absolute z-10 right-1 top-11 bg-white divide-y divide-gray-300/60 rounded-lg border border-gray-300 w-44`}
         >
            <div className="px-4 py-3 text-sm text-gray-900">
               <span>
                  Hello, <span className="font-medium">{user.username || user.email}</span>
               </span>
            </div>
            <ul className="py-2 text-sm text-gray-700">
               <li>
                  <NavLink to="/settings" onClick={handleClick} className="block px-4 py-2 hover:bg-gray-100">
                     Settings
                  </NavLink>
               </li>
            </ul>
            <div className="py-2">
               <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white">
                  Sign out
               </a>
            </div>
         </div>
      </div>
   );
};

export default User;
