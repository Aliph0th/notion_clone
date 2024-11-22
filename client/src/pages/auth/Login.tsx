import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { REQUESTS } from '../../api';
import { ApiError, ErrorToast, LoginForm } from '../../types';
import FormInput from '../../ui/FormInput';
import Loader from '../../ui/Loader';
import Toast from '../../ui/Toast';
import { loginSchema } from '../../utils';
import { useUser } from '../../hooks';

const Login = () => {
   const {
      register,
      handleSubmit,
      formState: { errors, isDirty }
   } = useForm<LoginForm>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: ''
      },
      reValidateMode: 'onChange'
   });

   const [errorToasts, setErrorToasts] = useState<ErrorToast[]>([]);
   const { setUser } = useUser();
   const mutation = useMutation({
      mutationFn: REQUESTS.Login,
      onError: (error: AxiosError<ApiError>) =>
         setErrorToasts([
            ...errorToasts,
            { message: error.response?.data?.message || 'Something went wrong', id: Date.now() }
         ]),
      onSuccess: data => {
         localStorage.setItem('token', data.accessToken);
         setUser(data.user);
      }
   });

   const onToastClose = (id: number) => {
      setErrorToasts(errorToasts.filter(toast => toast.id !== id));
   };

   const onSubmit = (data: LoginForm) => {
      mutation.mutate({ data });
   };
   return (
      <div className="flex items-center justify-center h-full">
         <div className="p-6 rounded-lg shadow border border-gray-500/30 w-7/12">
            <h2 className="text-xl font-bold mb-4">Log in</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
               <FormInput
                  id="email"
                  register={register('email')}
                  type="email"
                  error={errors?.email?.message}
                  label="Email"
                  placeholder="example@gmail.com"
                  required
               />
               <FormInput
                  id="password"
                  register={register('password')}
                  type="password"
                  error={errors?.password?.message}
                  label="Password"
                  required
               />
               <span className="text-gray-500 text-sm mb-3 block">
                  <span className="text-orange-600">*</span> is required
               </span>

               <button
                  type="submit"
                  disabled={mutation.isPending || !isDirty}
                  className="flex items-center justify-center gap-x-2 w-60 bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 hover:bg-blue-700"
               >
                  Log in
                  {mutation.isPending && <Loader sm />}
               </button>
            </form>
         </div>
         {errorToasts.length > 0 && (
            <div className="absolute bottom-10 right-6 flex flex-col gap-y-1">
               {errorToasts.map(toast => (
                  <Toast key={toast.id} onClick={() => onToastClose(toast.id)} message={toast.message} />
               ))}
            </div>
         )}
      </div>
   );
};

export default Login;
