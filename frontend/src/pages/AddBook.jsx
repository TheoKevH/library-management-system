import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import InputField from '../components/InputField';
import Button from '../components/Button';

const AddBook = () => {
  const [form, setForm] = useState({ title: '', author: '', isbn: '', description: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = 'Title is required';
    if (!form.author) newErrors.author = 'Author is required';
    if (!form.isbn) newErrors.isbn = 'ISBN is required';
    if (!form.description) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
        const newErrors = { ...errors };
        delete newErrors[e.target.name];
        setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await API.post('/books', form);
      navigate('/books');
    } catch (err) {
      console.error(err.response?.data?.error || 'Failed to add book');
      setErrors({ form: err.response?.data?.error || 'Failed to add book' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden md:flex">
          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 h-full flex flex-col">
              <div className="flex-grow">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Add a New Book</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <InputField label="Title" name="title" value={form.title} onChange={handleChange} error={errors.title} required />
                  <InputField label="Author" name="author" value={form.author} onChange={handleChange} error={errors.author} required />
                </div>
                <div className="mt-5">
                  <InputField label="ISBN" name="isbn" value={form.isbn} onChange={handleChange} error={errors.isbn} required />
                </div>
                <div className="mt-5">
                  <InputField label="Description" type="textarea" name="description" value={form.description} onChange={handleChange} error={errors.description} required />
                </div>
                 {errors.form && <p className="text-red-500 text-sm mt-4 text-center">{errors.form}</p>}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <Button type="button" text="Cancel" className="bg-gray-300 hover:bg-gray-300 w-full sm:w-auto" onClick={() => navigate('/books')} />
                <Button type="submit" text="Add Book" className="bg-lime-500 text-white w-full sm:w-auto" />
              </div>
            </form>
          </div>
          <div className="hidden md:flex w-1/3 bg-gray-100 p-8 flex-col justify-center items-center text-center">
            <div className="w-24 h-24 bg-lime-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

