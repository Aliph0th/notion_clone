import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { ApiError, AppFormHookParams } from '../types';
import { useContext } from 'react';
import { ErrorContext } from '../context';

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
   const { pushToast } = useContext(ErrorContext);

   const mutation = useMutation({
      mutationFn,
      onError: (error: AxiosError<ApiError>) => pushToast(error?.response?.data?.message),
      onSuccess
   });

   const onSubmit = handleSubmit((data: T) => {
      mutation.mutate({ ...dataIDs, data });
   });

   return { onSubmit, register, errors, isDirty, isPending: mutation.isPending };
};
