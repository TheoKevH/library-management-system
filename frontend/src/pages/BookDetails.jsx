import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setError('Failed to fetch book details. Please try again later.');
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/books/${book._id}`);
      navigate('/books');
    } catch (err) {
      console.error('Failed to delete book');
      setShowModal(false);
    }
  };

  if (!book && !error) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="text-center">
                <p className="text-lg font-semibold text-gray-600">Loading Book...</p>
                <div className="mt-4 w-16 h-1.5 bg-gray-200 rounded-full mx-auto overflow-hidden">
                    <div className="w-full h-full bg-blue-500 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-center p-4">
        <div>
            <p className="text-xl font-bold text-red-600">Oops!</p>
            <p className="mt-2 text-gray-700">{error}</p>
            <Link to="/books" className="mt-6 inline-block px-5 py-2.5 rounded-full font-semibold text-sm bg-blue-600 text-white transition-transform hover:scale-105">
                ← Back to All Books
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          <div className="w-full md:w-2/5 flex-shrink-0 bg-gray-100 flex items-center justify-center p-8">
            <img
              src="/cover.svg" 
              alt={`${book.title} cover`}
              className="max-w-full h-auto object-contain rounded-md shadow-lg w-full max-h-[500px]"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x800/e2e8f0/334155?text=Image+Not+Found'; }}
            />
          </div>

          <div className="w-full md:w-3/5 flex flex-col p-6 sm:p-8">
            <div className="flex-grow">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{book.title}</h1>
                <p className="text-xl text-gray-600 mt-1">by {book.author}</p>
                <p className="text-sm text-gray-500 mt-4 font-mono tracking-wide">ISBN: {book.isbn}</p>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h2 className="text-sm font-bold uppercase text-gray-500 tracking-wider">Description</h2>
                    <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-line">{book.description}</p>
                </div>
            </div>

            <div className="mt-8 flex-shrink-0">
                {user && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to={`/edit/${book._id}`} className="w-full sm:w-auto">
                      <Button text="Edit Details" className="bg-lime-500 text-white w-full" />
                    </Link>
                    <Button
                      text="Delete Book"
                      className="bg-red-600 text-white w-full sm:w-auto"
                      onClick={() => setShowModal(true)}
                    />
                  </div>
                )}

                <div className="mt-6 text-center sm:text-left">
                  <Link to="/books" className="text-lime-600 hover:text-lime-700 font-semibold transition-colors flex items-center gap-2 justify-center sm:justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Book List
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        title="Confirm Deletion"
        message={
          <>Are you sure you want to delete <strong>{book.title}</strong>?</>
        }
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};


export default BookDetails;
