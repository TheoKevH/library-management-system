import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import InputField from '../components/InputField';
import Button from '../components/Button';

const EditBook = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', author: '', isbn: '', description: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error('Failed to load book data');
        navigate('/books');
      }
    };
    fetchBook();
  }, [id, navigate]);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await API.put(`/books/${id}`, form);
      navigate(`/book/${id}`);
    } catch (err) {
      console.error(err.response?.data?.error || 'Failed to update book');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 h-full flex flex-col">
              <div className="flex-grow">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Edit Book</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <InputField label="Title" name="title" value={form.title} onChange={handleChange} error={errors.title} />
                  <InputField label="Author" name="author" value={form.author} onChange={handleChange} error={errors.author} />
                </div>
                <div className="mt-5">
                  <InputField label="ISBN" name="isbn" value={form.isbn} onChange={handleChange} error={errors.isbn} />
                </div>
                <div className="mt-5">
                  <InputField label="Description" type="textarea" name="description" value={form.description} onChange={handleChange} error={errors.description} />
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <Button type="button" text="Cancel" className="bg-gray-300 text-gray-700 hover:bg-gray-300 w-full sm:w-auto" onClick={() => navigate(`/books/${id}`)} />
                <Button type="submit" text="Save Changes" className="bg-lime-500 hover:bg-lime-600 text-white w-full sm:w-auto" />
              </div>
            </form>
          </div>
          <div className="hidden md:flex w-1/3 bg-gray-100 p-8 flex-col justify-center items-center text-center">
            <div className="w-24 h-24 bg-lime-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;