import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks';
import Loader from '../../ui/Loader';

interface IAuthWrapperProps {
   isAuthRequired?: boolean;
   to: string;
   children: ReactNode;
}

const AuthWrapper: FC<IAuthWrapperProps> = ({ children, to, isAuthRequired = false }) => {
   const { user, isLoading } = useUser();

   if (isLoading) {
      return <Loader />;
   }

   if ((!user && isAuthRequired) || (user && !isAuthRequired)) {
      return <Navigate to={to} replace />;
   }

   return children;
};

export default AuthWrapper;
