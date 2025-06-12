import React from 'react';

const Button = ({ text, className = 'bg-lime-500 text-white', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold transition-transform duration-300 ease-in-out hover:scale-105 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;