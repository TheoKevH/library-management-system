import React, { useEffect, useState } from 'react';
import API from '../utils/api';

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
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📚 Book List</h1>

      <input
        type="text"
        placeholder="Search by title or author..."
        className="w-full p-2 border rounded-lg mb-4"
        value={search}
        onChange={(e) => {
          setPage(1); 
          setSearch(e.target.value);
        }}
      />

      {books.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {books.map((book) => (
            <div key={book._id} className="border rounded-lg p-4 shadow-sm bg-white">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
