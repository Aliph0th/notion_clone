import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { ErrorToast } from '../types';
import { ErrorContext } from './contexts';
import { useLocation } from 'react-router-dom';
export const ErrorContextProvider: FC<PropsWithChildren> = ({ children }) => {
   const [errorToasts, setErrorToasts] = useState<ErrorToast[]>([]);
   const location = useLocation();

   const onToastClose = useCallback(
      (id: number) => {
         setErrorToasts(errorToasts.filter(toast => toast.id !== id));
      },
      [errorToasts]
   );

   const pushToast = (message = 'Something went wrong') => {
      setErrorToasts([...errorToasts, { message, id: Date.now() }]);
   };

   useEffect(() => {
      setErrorToasts([]);
   }, [location]);

   return <ErrorContext.Provider value={{ errorToasts, onToastClose, pushToast }}>{children}</ErrorContext.Provider>;
};
