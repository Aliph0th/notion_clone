import { FC, PropsWithChildren, useContext } from 'react';
import { UserContext } from '../../context/contexts';
import { Navigate } from 'react-router-dom';

const Protected: FC<PropsWithChildren> = ({ children }) => {
   const { user } = useContext(UserContext);

   if (!user) {
      return <Navigate to="/login" replace />;
   }

   return children;
};

export default Protected;
