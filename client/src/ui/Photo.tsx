import { FC, useState } from 'react';
import { Photo as PhotoType } from '../types';
import placeholder from '../assets/placeholder.png';

interface IPhotoProps {
   photo: PhotoType;
}
const Photo: FC<IPhotoProps> = ({ photo }) => {
   const [loading, setLoading] = useState(true);
   const onPhotoLoaded = () => setLoading(false);
   return (
      <div className="bg-gray-100 rounded-lg border border-gray-300">
         {loading && <img src={placeholder} alt="placeholder" className="w-fit rounded-t-lg" />}
         <img
            className={`${loading ? 'hidden' : ''} w-full rounded-t-lg`}
            src={photo.thumbnailUrl}
            alt={photo.title}
            onLoad={onPhotoLoaded}
         />
         <div className="px-3 py-2">{photo.title}</div>
      </div>
   );
};

export default Photo;
