import { REQUESTS } from '../../api';
import { useAppForm, useUser } from '../../hooks';
import { AuthSuccessResult, LoginForm } from '../../types';
import FormInput from '../../ui/FormInput';
import Loader from '../../ui/Loader';
import { loginSchema } from '../../utils';

const Login = () => {
   const { setUser } = useUser();

   const { onSubmit, register, errors, isDirty, isPending } = useAppForm<LoginForm, AuthSuccessResult>({
      schema: loginSchema,
      mutationFn: REQUESTS.Login,
      defaultValues: { email: '', password: '' },
      onSuccess: (data: AuthSuccessResult) => {
         localStorage.setItem('token', data.accessToken);
         setUser(data.user);
      }
   });

   return (
      <div className="flex items-center justify-center h-full">
         <div className="p-6 rounded-lg shadow border border-gray-500/30 w-7/12">
            <h2 className="text-xl font-bold mb-4">Log in</h2>
            <form onSubmit={onSubmit}>
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
                  disabled={isPending || !isDirty}
                  className="flex items-center justify-center gap-x-2 w-60 bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 hover:bg-blue-700"
               >
                  Log in
                  {isPending && <Loader sm />}
               </button>
            </form>
         </div>
      </div>
   );
};

export default Login;
