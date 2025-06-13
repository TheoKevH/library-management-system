import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    try {
      const res = await API.get(`/books?search=${search}&page=${page}`);
      setBooks(res.data.books);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, page]);

  return (
    <div className="min-h-screen">
      <div className="bg-cream w-full overflow-hidden flex justify-center px-4">
        <img
          src="/hero.png"
          alt="Book Hero"
          className="w-full max-w-4xl h-auto object-contain"
        />
      </div>

      <div className="p-6 max-w-6xl mx-auto bg-white">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="w-full p-3 border border-gray-300 rounded-full mb-6 shadow-sm"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        {books.length === 0 ? (
          <p className="text-gray-600">No books found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {books.map((book) => (
              <Link key={book._id} to={`/books/${book._id}`} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                <h2 className="text-lg font-bold mb-1">{book.title}</h2>
                <p className="text-sm text-gray-700">by {book.author}</p>
                <p className="text-xs text-gray-500 mt-2 italic">ISBN: {book.isbn}</p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-800">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookList;
