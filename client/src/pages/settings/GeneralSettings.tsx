import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { REQUESTS } from '../../api';
import { useAppForm, useUser } from '../../hooks';
import { ApiError, ChangeInfoForm, SettingsResult, User } from '../../types';
import ChangesResult from '../../ui/ChangesResult';
import FormInput from '../../ui/FormInput';
import { formatDate, generalInfoSchema } from '../../utils';
import Loader from '../../ui/Loader';

interface IGeneralSettingsProps {
   user: User;
}

const GeneralSettings: FC<IGeneralSettingsProps> = ({ user }) => {
   const { onSubmit, register, errors, isDirty, isPending } = useAppForm<ChangeInfoForm>({
      defaultValues: {
         age: user.age,
         gravatarEmail: user.gravatarEmail,
         username: user.username
      },
      mutationFn: REQUESTS.PatchUser,
      schema: generalInfoSchema,
      onSuccess: () => {
         setResult({ type: 'success', message: 'Changes saved successfully' });
         invalidateUser();
      },
      onError: (error: AxiosError<ApiError>) => {
         setResult({ type: 'error', message: error.response?.data?.message || 'Something went wrong' });
      },
      mutateDataIDs: { userID: user.id }
   });

   const [result, setResult] = useState<SettingsResult | null>(null);
   const { invalidateUser } = useUser();
   const handleHideResult = () => setResult(null);

   return (
      <div className="p-6 rounded-lg shadow border border-gray-500/30 w-3/12 h-fit">
         <h2 className="text-xl font-bold mb-4">General information</h2>
         <form onSubmit={onSubmit}>
            <p className="text-md mb-1">
               Email: <span className="font-bold">{user.email}</span>
               <small className="text-gray-400 block">You cannot change your email</small>
            </p>
            <p className="text-md mb-4">
               Registration date: <span className="font-bold">{formatDate(new Date(user.registrationDate))}</span>
            </p>
            <FormInput
               id="username"
               register={register('username')}
               error={errors?.username?.message}
               type="text"
               label="Username"
            />
            <FormInput
               id="age"
               register={register('age')}
               error={errors?.age?.message}
               type="number"
               min={0}
               label="Age"
            />
            <FormInput
               id="gravatar"
               type="email"
               register={register('gravatarEmail')}
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

            <button
               type="submit"
               disabled={isPending || !isDirty}
               className="flex items-center justify-center gap-x-2 bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 hover:bg-blue-700"
            >
               Save changes
               {isPending && <Loader sm />}
            </button>
         </form>
         <ChangesResult result={result} onHideClick={handleHideResult} />
      </div>
   );
};

export default GeneralSettings;
