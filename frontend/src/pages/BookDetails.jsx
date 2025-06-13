import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';
import Button from '../components/Button';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch book');
      }
    };

    fetchBook();
  }, [id]);

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>{error}</p>
        <Link to="/books" className="text-blue-600 underline">← Back to books</Link>
      </div>
    );
  }

  if (!book) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  return (
  <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md mt-6">
    <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
    <p className="text-lg text-gray-700 mb-1"><strong>Author:</strong> {book.author}</p>
    <p className="text-sm text-gray-500 mb-4"><strong>ISBN:</strong> {book.isbn}</p>
    <p className="text-base text-gray-800 whitespace-pre-line">{book.description}</p>

    <div className="mt-6 flex gap-4">
      <Link to={`/edit/${book._id}`}>
        <Button text="Edit" />
      </Link>
      <Button
        text="Delete"
        className="bg-red-500 hover:bg-red-600"
        onClick={async () => {
          const confirmed = window.confirm('Are you sure you want to delete this book?');
          if (!confirmed) return;
          try {
            await API.delete(`/books/${book._id}`);
            alert('Book deleted successfully');
            window.location.href = '/books';
          } catch (err) {
            alert(err.response?.data?.error || 'Failed to delete book');
          }
        }}
      />
    </div>

    <div className="mt-4">
      <Link to="/books" className="text-blue-600 hover:underline">← Back to Book List</Link>
    </div>
  </div>
);
};

export default BookDetails;
