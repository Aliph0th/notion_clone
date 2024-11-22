import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { REQUESTS } from '../../api';
import { QUERY_KEYS } from '../../constants';
import { UserContext } from '../../context/contexts';
import Loader from '../../ui/Loader';
import { formatDateShort } from '../../utils';

const NoteList = () => {
   const { user } = useContext(UserContext);
   const { data, isLoading } = useQuery({
      queryKey: [QUERY_KEYS.NOTES],
      queryFn: () => REQUESTS.GetAllNotes(user.id),
      enabled: !!user.id,
      staleTime: 6e4
   });
   return (
      <div className="mt-3">
         <h1 className="mb-1 text-4xl font-bold">Your notes</h1>
         <NavLink
            to="/notes/create"
            className="py-2 px-3 mb-3 inline-block rounded-lg text-white hover:bg-blue-800 bg-blue-700"
         >
            Create new Note
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
                              <button className="p-1 hover:bg-gray-300 rounded">✍️</button>
                              <button className="p-1 hover:bg-gray-300 rounded">🗑</button>
                           </div>
                        </div>
                     ))}
                  </>
               )}
            </div>
         )}
      </div>
   );
};

export default NoteList;
