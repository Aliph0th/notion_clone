import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { ApiError, AppFormHookParams } from '../types';
import { useContext } from 'react';
import { ErrorContext } from '../context';

export const useAppForm = <T, K = unknown>({
   onSuccess,
   onError,
   defaultValues,
   mutationFn,
   schema,
   mutateDataIDs: dataIDs
}: AppFormHookParams<T, K>) => {
   const {
      register,
      handleSubmit,
      formState: { errors, isDirty },
      reset
   } = useForm<T>({
      resolver: zodResolver(schema),
      defaultValues,
      reValidateMode: 'onChange'
   });
   const { pushToast } = useContext(ErrorContext);

   const defaultError = (error: AxiosError<ApiError>) => pushToast(error?.response?.data?.message);
   const mutation = useMutation({
      mutationFn,
      onError: onError || defaultError,
      onSuccess: (data: K) => {
         onSuccess(data);
         reset();
      }
   });

   const onSubmit = handleSubmit((data: T) => {
      mutation.mutate({ ...dataIDs, data });
   });

   return { onSubmit, register, errors, isDirty, isPending: mutation.isPending };
};
