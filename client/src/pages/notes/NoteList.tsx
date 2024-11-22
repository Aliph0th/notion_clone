import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { QUERY_KEYS } from '../../constants';
import { REQUESTS } from '../../api';
import { useContext } from 'react';
import { UserContext } from '../../context/contexts';
import Loader from '../../ui/Loader';

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
         <h1 className="text-4xl font-bold">Your notes</h1>
         <NavLink
            to="/notes/create"
            className="py-2 px-3 my-1 inline-block rounded-lg text-white hover:bg-blue-800 bg-blue-700"
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
                        <NavLink key={note.id} to="324">
                           {note.name}
                        </NavLink>
                     ))}
                  </>
               )}
            </div>
         )}
      </div>
   );
};

export default NoteList;
