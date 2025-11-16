import cn from 'classnames';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary';
  className?: string;
}

export const Button = ({ variant = 'primary', children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center text-white justify-center rounded-lg font-medium text-sm px-4 py-2 transition-colors duration-300 ease-in-out cursor-pointer shadow-sm',
        {
          'bg-blue-700 text-white hover:bg-blue-800': variant === 'primary',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
