import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      className={cn(
        'border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';
