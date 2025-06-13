import React from 'react';

const InputField = ({ label, type, name, value, onChange, error, placeholder }) => (
  <div className="mb-4">
    <label className="block mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring"
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default InputField;
