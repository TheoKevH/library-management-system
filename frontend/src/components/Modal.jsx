import React from 'react';
import Button from './Button';

const Modal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <Button text="Cancel" className="bg-gray-300 text-black" onClick={onCancel} />
          <Button text="Yes, Delete" className="bg-red-500 hover:bg-red-600" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
