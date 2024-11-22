import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { REQUESTS } from '../../api';
import { QUERY_KEYS } from '../../constants';
import { useUser } from '../../hooks';
import Loader from '../../ui/Loader';
import { formatDate } from '../../utils';

const Note = () => {
   const { noteID } = useParams();
   const { user } = useUser();
   const { data, isLoading } = useQuery({
      queryKey: [QUERY_KEYS.NOTE, noteID],
      queryFn: () => REQUESTS.GetNote({ userID: user.id, noteID: +noteID }),
      enabled: !!noteID && !!user,
      staleTime: 6e4
   });
   if (isLoading) {
      return <Loader />;
   }
   if (!data && !isLoading) {
      return <span className="font-bold block text-center text-gray-500 text-lg">No such note found</span>;
   }
   return (
      <div>
         <h1 className="text-4xl font-bold mt-4">{data.name}</h1>
         <p className="text-sm text-gray-400">Created at {formatDate(new Date(data.createdAt))}</p>
         {data.createdAt !== data.updatedAt && (
            <p className="text-sm text-gray-400">Edited at {formatDate(new Date(data.updatedAt))}</p>
         )}
         <p className="text-gray-800 mt-5">{data.content}</p>
      </div>
   );
};

export default Note;
