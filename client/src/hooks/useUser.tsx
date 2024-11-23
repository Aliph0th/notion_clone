import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { REQUESTS } from '../api';
import { User } from '../types';
import { useCallback } from 'react';

export const useUser = () => {
   const queryClient = useQueryClient();
   const { data, isLoading } = useQuery({ queryKey: [QUERY_KEYS.USER], queryFn: REQUESTS.GetMyself, staleTime: 3e5 });
   const setUser = useCallback((user: User) => queryClient.setQueryData([QUERY_KEYS.USER], user), [queryClient]);
   const invalidateUser = useCallback(
      () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] }),
      [queryClient]
   );
   return { user: data, isLoading, setUser, invalidateUser };
};
