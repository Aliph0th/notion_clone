import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { REQUESTS } from '../../api';
import { QUERY_KEYS } from '../../constants';
import { useAppForm, useUser } from '../../hooks';
import { Note, NoteForm } from '../../types';
import FormInput from '../../ui/FormInput';
import Loader from '../../ui/Loader';
import Toast from '../../ui/Toast';
import { noteSchema } from '../../utils';

const UpsertNote = () => {
   const { noteID } = useParams();
   const { user } = useUser();
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const { data, isLoading } = useQuery({
      queryKey: [QUERY_KEYS.NOTE, noteID],
      queryFn: () => REQUESTS.GetNote({ userID: user.id, noteID: +noteID! }),
      enabled: !!noteID && !!user,
      staleTime: 6e4
   });

   const { onSubmit, register, errors, errorToasts, isDirty, onToastClose, isPending } = useAppForm<NoteForm, Note>({
      schema: noteSchema,
      defaultValues: { content: data?.content || '', name: data?.name || '' },
      mutationFn: REQUESTS[noteID ? 'PatchNote' : 'CreateNote'],
      onSuccess: (data: Note) => {
         navigate(`/notes/${data.id}`, { replace: true });
         if (noteID) {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTE, noteID] });
         }
         queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTES] });
      },
      mutateDataIDs: { noteID: +noteID }
   });

   if (isLoading) {
      return <Loader />;
   }

   return (
      <div className="h-full flex items-center flex-col">
         <h1 className="text-4xl font-bold mt-4">{data ? 'Edit note' : 'Create a new note'}</h1>
         <form className="mt-10 w-9/12" onSubmit={onSubmit}>
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
               disabled={isPending || !isDirty}
               className="flex items-center justify-center gap-x-2 w-60 bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 hover:bg-blue-700"
            >
               Save note
               {isPending && <Loader sm />}
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
