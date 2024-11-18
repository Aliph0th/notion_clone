import { useForm } from 'react-hook-form';
import { registrationSchema } from '../../utils';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../ui/FormInput';
import { ApiError, ErrorToast, RegistrationForm } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { REQUESTS } from '../../api';
import Loader from '../../ui/Loader';
import Toast from '../../ui/Toast';
import { useContext, useState } from 'react';
import { AxiosError } from 'axios';
import { UserContext } from '../../context/contexts';

const SignUp = () => {
   const {
      register,
      handleSubmit,
      formState: { errors, isDirty }
   } = useForm<RegistrationForm>({
      resolver: zodResolver(registrationSchema),
      defaultValues: {
         email: '',
         password: '',
         repeatedPassword: ''
      },
      reValidateMode: 'onChange'
   });

   const [errorToasts, setErrorToasts] = useState<ErrorToast[]>([]);
   const { setUser } = useContext(UserContext);
   const mutation = useMutation({
      mutationFn: REQUESTS.Register,
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

   const onSubmit = (data: RegistrationForm) => {
      mutation.mutate(data);
   };
   return (
      <div className="flex items-center justify-center h-full">
         <div className="p-6 rounded-lg shadow border border-gray-500/30 w-9/12">
            <h2 className="text-xl font-bold mb-4">Sign up</h2>
            <form className="grid gap-x-4 grid-cols-2 grid-rows-[1fr_auto]" onSubmit={handleSubmit(onSubmit)}>
               <div>
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
                     hint="Password must contain at least one capital letter, lowercase letter and digit and be 8 characters long at least"
                  />
                  <FormInput
                     id="repeatedPassword"
                     register={register('repeatedPassword')}
                     type="password"
                     error={errors?.repeatedPassword?.message}
                     label="Repeat password"
                     required
                  />
                  <span className="text-gray-500 text-sm">
                     <span className="text-orange-600">*</span> is required
                  </span>
               </div>
               <div>
                  <FormInput
                     id="age"
                     register={register('age')}
                     type="number"
                     min="1"
                     error={errors?.age?.message}
                     label="Age"
                  />
                  <FormInput
                     id="username"
                     register={register('username')}
                     error={errors?.username?.message}
                     label="Username"
                  />
                  <FormInput
                     id="gravatarEmail"
                     register={register('gravatarEmail')}
                     type="email"
                     error={errors?.gravatarEmail?.message}
                     label={
                        <>
                           Email for&nbsp;
                           <a className="text-blue-500 hover:underline" href="https://gravatar.com/">
                              Gravatar
                           </a>
                        </>
                     }
                     placeholder="example@gmail.com"
                     hint="Your email will be used as email for gravatar by default"
                  />
               </div>

               <button
                  type="submit"
                  disabled={mutation.isPending || !isDirty}
                  className="flex items-center justify-center gap-x-2 col-start-2 bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 hover:bg-blue-700"
               >
                  Sign Up
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

export default SignUp;
