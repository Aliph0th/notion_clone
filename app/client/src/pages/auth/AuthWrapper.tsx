import { FC, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/contexts';

interface IAuthWrapperProps {
   isAuthRequired?: boolean;
   to: string;
   children: ReactNode;
}

const AuthWrapper: FC<IAuthWrapperProps> = ({ children, to, isAuthRequired = false }) => {
   const { user } = useContext(UserContext);

   if ((!user && isAuthRequired) || (user && !isAuthRequired)) {
      return <Navigate to={to} replace />;
   }

   return children;
};

export default AuthWrapper;
