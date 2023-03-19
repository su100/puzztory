import { HTMLProps } from 'react';

interface InputProps extends HTMLProps<HTMLInputElement> {
  errorMsg?: string[];
}

function Input({ errorMsg, ...props }: InputProps) {
  return (
    <div>
      <input
        className="w-[100%] p-2 border-b-2 border-solid border-gray-300 font-medium outline-none"
        {...props}
      />
      {errorMsg?.map((m) => (
        <p key={m} className="text-red-500">
          {m}
        </p>
      ))}
    </div>
  );
}

export default Input;
