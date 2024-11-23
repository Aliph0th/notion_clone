import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { REQUESTS } from '../../api';
import { useAppForm } from '../../hooks';
import { ApiError, ChangePasswordForm, SettingsResult } from '../../types';
import ChangesResult from '../../ui/ChangesResult';
import FormInput from '../../ui/FormInput';
import Loader from '../../ui/Loader';
import { changePasswordSchema } from '../../utils';

interface IChangePasswordProps {
   userID: number;
}

const ChangePassword: FC<IChangePasswordProps> = ({ userID }) => {
   const { onSubmit, register, errors, isDirty, isPending } = useAppForm<ChangePasswordForm>({
      defaultValues: {
         currentPassword: '',
         password: '',
         repeatedPassword: ''
      },
      mutationFn: REQUESTS.ChangePassword,
      schema: changePasswordSchema,
      onSuccess: () => {
         setResult({ type: 'success', message: 'Password changed successfully' });
      },
      onError: (error: AxiosError<ApiError>) => {
         setResult({ type: 'error', message: error.response?.data?.message || 'Something went wrong' });
      },
      mutateDataIDs: { userID }
   });

   const [result, setResult] = useState<SettingsResult | null>(null);
   const handleHideResult = () => setResult(null);

   return (
      <div className="p-6 rounded-lg shadow border border-gray-500/30 w-4/12 h-fit">
         <h2 className="text-xl font-bold mb-4">Change password</h2>
         <form onSubmit={onSubmit}>
            <FormInput
               id="currentPassword"
               type="password"
               register={register('currentPassword')}
               error={errors?.currentPassword?.message}
               label="Current password"
               required
            />
            <FormInput
               id="password"
               type="password"
               register={register('password')}
               error={errors?.password?.message}
               label="New password"
               hint="Password must contain at least one capital letter, lowercase letter and digit and be 8 characters long at least"
               required
            />
            <FormInput
               id="repeatedPassword"
               register={register('repeatedPassword')}
               error={errors?.repeatedPassword?.message}
               type="password"
               label="Repeat new password"
               required
            />
            <span className="text-gray-500 text-sm block -mt-2 mb-3">
               <span className="text-orange-600">*</span> is required
            </span>

            <button
               type="submit"
               disabled={!isDirty || isPending}
               className="flex items-center justify-center gap-x-2 bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 hover:bg-blue-700"
            >
               Save password
               {isPending && <Loader sm />}
            </button>
         </form>
         <ChangesResult result={result} onHideClick={handleHideResult} />
      </div>
   );
};

export default ChangePassword;
