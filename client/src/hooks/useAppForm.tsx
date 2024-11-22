import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiError, AppFormHookParams, ErrorToast } from '../types';

export const useAppForm = <T, K>({
   onSuccess,
   defaultValues,
   mutationFn,
   schema,
   mutateDataIDs: dataIDs
}: AppFormHookParams<T, K>) => {
   const {
      register,
      handleSubmit,
      formState: { errors, isDirty }
   } = useForm<T>({
      resolver: zodResolver(schema),
      defaultValues,
      reValidateMode: 'onChange'
   });

   const [errorToasts, setErrorToasts] = useState<ErrorToast[]>([]);
   const onToastClose = (id: number) => {
      setErrorToasts(errorToasts.filter(toast => toast.id !== id));
   };

   const mutation = useMutation({
      mutationFn,
      onError: (error: AxiosError<ApiError>) =>
         setErrorToasts([
            ...errorToasts,
            { message: error.response?.data?.message || 'Something went wrong', id: Date.now() }
         ]),
      onSuccess
   });

   const onSubmit = handleSubmit((data: T) => {
      mutation.mutate({ ...dataIDs, data });
   });

   return { onSubmit, errorToasts, onToastClose, register, errors, isDirty, isPending: mutation.isPending };
};
