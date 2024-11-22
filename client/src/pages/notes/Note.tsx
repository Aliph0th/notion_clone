import { useParams } from 'react-router-dom';

const Note = () => {
   const { noteID } = useParams();
   return <div>Note: {noteID}</div>;
};

export default Note;
