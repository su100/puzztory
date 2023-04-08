import { HTMLProps } from 'react';

interface InputProps extends HTMLProps<HTMLInputElement> {
  errorMsg?: string[];
}

function Input({ errorMsg, ...props }: InputProps) {
  return (
    <div>
      <input className="input" {...props} />
      {errorMsg?.map((m) => (
        <p key={m} className="text-red-500">
          {m}
        </p>
      ))}
    </div>
  );
}

export default Input;
