import { ButtonHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { buttonClassName } from './Button';

export const linkClassName = 'block text-center leading-9';

function LinkButton({ children, className, ...props }: LinkProps) {
  return (
    <Link
      className={`${buttonClassName} ${linkClassName} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
