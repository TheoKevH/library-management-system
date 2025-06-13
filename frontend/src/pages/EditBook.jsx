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
        alert('Failed to load book data');
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
      alert('Book updated successfully');
      navigate(`/book/${id}`);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update book');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Book</h2>

        <InputField label="Title" type="text" name="title" value={form.title} onChange={handleChange} error={errors.title} />
        <InputField label="Author" type="text" name="author" value={form.author} onChange={handleChange} error={errors.author} />
        <InputField label="ISBN" type="text" name="isbn" value={form.isbn} onChange={handleChange} error={errors.isbn} />
        
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <Button type="submit" text="Save Changes" />
      </form>
    </div>
  );
};

export default EditBook;
