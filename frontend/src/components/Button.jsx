import React from 'react';

const Button = ({
  text,
  type = 'button',
  onClick,
  className = '',
}) => {
  const baseStyle = 'px-6 py-2 rounded-full font-semibold transition-transform duration-300 ease-in-out hover:scale-105';
  const defaultStyle = 'text-white';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${defaultStyle} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
