import React from 'react';

interface OptionBtnProps {
  children: React.ReactNode;
  index: number;
}

export const OptionButton = ({ children, index }: OptionBtnProps) => {
  return (
    <button className="border border-gray-700 border-2 text-gray-800 rounded-lg py-4 text-left hover:bg-blue-700 hover:text-gray-100">
      <span className="px-4 mr-4">{String.fromCharCode(65 + index)}.</span>
      {children}
    </button>
  );
};

export const DefButton = ({ children }: OptionBtnProps) => {
  return (
    <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-sm text-lg px-5 py-4 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
      {children}
    </button>
  );
};
