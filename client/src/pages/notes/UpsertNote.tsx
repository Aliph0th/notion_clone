import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ApiError, ErrorToast, NoteForm } from '../../types';
import FormInput from '../../ui/FormInput';
import { noteSchema } from '../../utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { REQUESTS } from '../../api';
import Toast from '../../ui/Toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../ui/Loader';
import { QUERY_KEYS } from '../../constants';

const UpsertNote = () => {
   const {
      register,
      handleSubmit,
      formState: { errors, isDirty }
   } = useForm<NoteForm>({
      resolver: zodResolver(noteSchema),
      defaultValues: {
         name: '',
         content: ''
      },
      reValidateMode: 'onChange'
   });

   const [errorToasts, setErrorToasts] = useState<ErrorToast[]>([]);
   const onToastClose = (id: number) => {
      setErrorToasts(errorToasts.filter(toast => toast.id !== id));
   };
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const mutation = useMutation({
      mutationFn: REQUESTS.CreateNote,
      onError: (error: AxiosError<ApiError>) =>
         setErrorToasts([
            ...errorToasts,
            { message: error.response?.data?.message || 'Something went wrong', id: Date.now() }
         ]),
      onSuccess: data => {
         navigate(`/notes/${data.id}`, { replace: true });
         queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTES] });
      }
   });

   const onSubmit = (data: NoteForm) => {
      mutation.mutate(data);
   };

   return (
      <div className="h-full flex items-center flex-col">
         <h1 className="text-4xl font-bold mt-4">Create a new note</h1>
         <form className="mt-10 w-9/12" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
               id="name"
               register={register('name')}
               type="text"
               error={errors?.name?.message}
               label="Name"
               placeholder="Write title of the note here"
               required
            />
            <div className="mb-4">
               <label className="block mb-1 text-gray-700" htmlFor="content">
                  Content
                  <span className="text-orange-600 ml-1">*</span>
               </label>
               <textarea
                  id="content"
                  required
                  placeholder="Write your thoughts about note"
                  rows={10}
                  {...register('content')}
                  className={`w-full resize-none p-2 focus:ring focus:ring-blue-200 outline-none border rounded ${errors?.content?.message ? 'border-red-500' : 'border-gray-300'}`}
               ></textarea>
               {errors?.content?.message && <p className="text-red-500 text-sm">{errors?.content?.message}</p>}
            </div>
            <button
               type="submit"
               disabled={mutation.isPending || !isDirty}
               className="flex items-center justify-center gap-x-2 w-60 bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 hover:bg-blue-700"
            >
               Save note
               {mutation.isPending && <Loader sm />}
            </button>
         </form>
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

export default UpsertNote;
