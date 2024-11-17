import { useForm } from 'react-hook-form';
import { registrationSchema } from '../../utils';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../ui/FormInput';
import { RegistrationForm } from '../../types';

const SignUp = () => {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<RegistrationForm>({
      resolver: zodResolver(registrationSchema),
      defaultValues: {
         age: null,
         username: null,
         gravatarEmail: null
      },
      reValidateMode: 'onChange'
   });

   const onSubmit = (data: RegistrationForm) => {
      console.log(data);
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
                  />
                  <FormInput
                     id="repeatedPassword"
                     register={register('repeatedPassword')}
                     type="password"
                     error={errors?.repeatedPassword?.message}
                     label="Repeat password"
                     required
                  />
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
                  />
               </div>

               <button type="submit" className="col-start-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
                  Sign Up
               </button>
            </form>
         </div>
      </div>
   );
};

export default SignUp;
