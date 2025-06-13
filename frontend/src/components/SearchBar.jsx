import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-full mb-6 shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500"
    />
  );
};

export default SearchBar;
