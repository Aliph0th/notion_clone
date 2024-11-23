import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { REQUESTS } from '../../api';
import { QUERY_KEYS } from '../../constants';
import { useUser } from '../../hooks';
import { ApiError, ErrorToast } from '../../types';
import Loader from '../../ui/Loader';
import Toast from '../../ui/Toast';
import { formatDateShort } from '../../utils';

const NoteList = () => {
   const { user } = useUser();
   const { data, isLoading } = useQuery({
      queryKey: [QUERY_KEYS.NOTES],
      queryFn: () => REQUESTS.GetAllNotes({ userID: user.id }),
      enabled: !!user.id,
      staleTime: 6e4
   });

   const [errorToasts, setErrorToasts] = useState<ErrorToast[]>([]);
   const queryClient = useQueryClient();
   const mutation = useMutation({
      mutationFn: REQUESTS.DeleteNote,
      onError: (error: AxiosError<ApiError>) =>
         setErrorToasts([
            ...errorToasts,
            { message: error.response?.data?.message || 'Something went wrong', id: Date.now() }
         ]),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTES] });
      }
   });

   const onToastClose = (id: number) => {
      setErrorToasts(errorToasts.filter(toast => toast.id !== id));
   };

   const onDeleteNote = (noteID: number) => {
      mutation.mutate({ noteID });
   };

   return (
      <div className="mt-3">
         <h1 className="mb-1 text-4xl font-bold">Your notes</h1>
         <NavLink
            to="/notes/create"
            className="py-2 px-3 mb-3 inline-block rounded-lg text-white hover:bg-blue-800 bg-blue-700"
         >
            Create new note
         </NavLink>
         {isLoading ? (
            <Loader />
         ) : (
            <div>
               {!data.length ? (
                  <span className="text-gray-400 font-medium text-md">No notes found yet</span>
               ) : (
                  <>
                     {data.map(note => (
                        <div
                           key={note.id}
                           className="flex mb-2 justify-between items-center divide-x divide-gray-400/50 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-lg border border-gray-500"
                        >
                           <NavLink to={`${note.id}`} className="block px-4 py-3 w-full hover:underline">
                              {note.name}
                           </NavLink>

                           <div className="flex items-center justify-between gap-1 px-4">
                              <span className="text-gray-500">{formatDateShort(new Date(note.createdAt))}</span>
                              <NavLink to={`${note.id}/edit`} className="p-1 hover:bg-gray-300 rounded">
                                 ✍️
                              </NavLink>
                              <button onClick={() => onDeleteNote(note.id)} className="p-1 hover:bg-gray-300 rounded">
                                 🗑
                              </button>
                           </div>
                        </div>
                     ))}
                  </>
               )}
            </div>
         )}
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

export default NoteList;
