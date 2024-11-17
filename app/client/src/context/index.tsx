import { FC, PropsWithChildren, useState } from 'react';
import { UserContext } from './contexts';
import { User } from '../types';

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
   const [user, setUser] = useState<User>();
   return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
