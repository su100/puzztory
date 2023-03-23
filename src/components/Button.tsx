import { ButtonHTMLAttributes } from 'react';

export const buttonClassName = 'w-[100%] h-9 bg-slate-300 rounded-[2px]';

function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${buttonClassName} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
