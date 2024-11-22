import { FC } from 'react';
import { SettingsResult } from '../types';

interface IChangesResult {
   result?: SettingsResult;
   onHideClick: () => void;
}

const ChangesResult: FC<IChangesResult> = ({ result, onHideClick }) => {
   return (
      <>
         {result && (
            <div
               className={`${result.type === 'success' ? 'bg-green-600' : 'bg-red-700'} rounded px-3 py-1 mt-3 text-white flex justify-between`}
            >
               {result.message}
               <button onClick={onHideClick} className="text-lg">
                  &times;
               </button>
            </div>
         )}
      </>
   );
};

export default ChangesResult;
