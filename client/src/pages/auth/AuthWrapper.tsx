import { FC, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/contexts';
import Loader from '../../ui/Loader';

interface IAuthWrapperProps {
   isAuthRequired?: boolean;
   to: string;
   children: ReactNode;
}

const AuthWrapper: FC<IAuthWrapperProps> = ({ children, to, isAuthRequired = false }) => {
   const { user, isPending } = useContext(UserContext);

   if (isPending) {
      return <Loader />;
   }

   if ((!user && isAuthRequired) || (user && !isAuthRequired)) {
      return <Navigate to={to} replace />;
   }

   return children;
};

export default AuthWrapper;
