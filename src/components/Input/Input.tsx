import cn from 'classnames';
import { forwardRef, type DetailedHTMLProps, type ForwardedRef, type InputHTMLAttributes } from 'react';

interface propsInput extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef(({ className, ...props }: propsInput, ref: ForwardedRef<HTMLInputElement>) => (
  <input
    ref={ref}
    className={cn(
      'px-2 text-[16px]/[1.2] w-full py-2 h-9 border-none bg-white shadow-[0_2px_4px_0px_rgba(0,0,0,0.25)] rounded-[5px] placeholder:text-gray-400 ',
      className
    )}
    {...props}
  />
));
