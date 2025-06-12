import React from 'react';

const InputField = ({ label, type, name, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block mb-1 font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default InputField;
