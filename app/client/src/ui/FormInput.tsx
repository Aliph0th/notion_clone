import { FC, InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FormInputProps = {
   id: string;
   register: UseFormRegisterReturn;
   error?: string;
   label?: string | ReactNode;
   placeholder?: string;
   required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({
   id,
   type = 'text',
   required = false,
   min,
   register,
   error,
   label,
   placeholder
}) => {
   return (
      <div className="mb-4">
         {label && (
            <label className="block mb-1 text-gray-700" htmlFor={id}>
               {label}
               {required && <span className="text-orange-600 ml-1">*</span>}
            </label>
         )}
         <input
            type={type}
            id={id}
            {...register}
            placeholder={placeholder}
            min={min}
            required={required}
            className={`w-full p-2 focus:ring focus:ring-blue-200 outline-none border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
         />
         {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
   );
};

export default FormInput;
