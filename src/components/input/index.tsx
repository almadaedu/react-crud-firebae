import React, { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ value ,type = 'text', ...props }, ref) => {
  return (
    <>
      <input
        type="text"
        value={value}
        placeholder="url"
        className="m-4 text-slate-50 bg-transparent border border-slate-700 focus:ring-slate-400 focus:outline-none p-4 rounded-lg"
        ref={ref}
        {...props}
      />
    </>
  );
});

export default Input;
