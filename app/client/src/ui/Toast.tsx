import { FC } from 'react';

interface IToastProps {
   className?: string;
   onClick: () => void;
   message: string;
}

const Toast: FC<IToastProps> = ({ className, onClick, message }) => {
   return (
      <div className={`${className} max-w-md bg-red-700 text-sm text-white rounded-xl shadow-lg`}>
         <div className="flex items-center justify-evenly p-4">
            {message}
            <button
               type="button"
               onClick={onClick}
               className="ml-3 text-lg rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
            >
               &times;
            </button>
         </div>
      </div>
   );
};

export default Toast;
