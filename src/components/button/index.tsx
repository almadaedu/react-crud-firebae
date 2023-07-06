import React from 'react';
interface Props {
    children?: React.ReactNode;
}
const Button: React.FC<Props> = ({children}) => {
  return (
      <button
        type="submit"
        className="m-4 border border-purple-500 p-5 rounded-lg bg-purple-600 transition-opacity bg-opacity-40 hover:bg-opacity-50 text-slate-50"
      >
        {children}
      </button>
  );
}

export default Button;
