import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { REQUESTS } from '../api';
import { User } from '../types';

export const useUser = () => {
   const queryClient = useQueryClient();
   const { data, isLoading } = useQuery({ queryKey: [QUERY_KEYS.USER], queryFn: REQUESTS.GetMyself, staleTime: 3e5 });
   const setUser = (user: User) => queryClient.setQueryData([QUERY_KEYS.USER], user);
   const invalidateUser = () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
   return { user: data, isLoading, setUser, invalidateUser };
};
