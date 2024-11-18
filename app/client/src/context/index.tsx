import { useMutation } from '@tanstack/react-query';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { REQUESTS } from '../api';
import { User } from '../types';
import { UserContext } from './contexts';

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
   const [user, setUser] = useState<User>();

   const { mutate, isPending } = useMutation({
      mutationFn: REQUESTS.GetMyself,
      onSuccess: data => {
         setUser(data);
      }
   });
   useEffect(() => {
      mutate();
   }, [mutate]);

   return <UserContext.Provider value={{ user, setUser, isPending }}>{children}</UserContext.Provider>;
};
