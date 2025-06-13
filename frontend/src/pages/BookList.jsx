import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button'; 


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();


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
      <div className="bg-cream w-full overflow-hidden flex justify-center px-4 mb-4">
        <img
          src="/hero.png"
          alt="Book Hero"
          className="w-full max-w-4xl h-auto object-contain"
        />
      </div>

      <div className="p-6 max-w-6xl mx-auto bg-white">
        <SearchBar
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search by title or author"
        />

        {user && (
            <Button
            text="Add Book"
            className="bg-lime-500 hover:bg-lime-600 mb-4 justify-end"
            onClick={() => navigate('/add')}
            />
        )}

        {books.length === 0 ? (
          <p className="text-gray-600">No books found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {books.map((book) => (
              <Link key={book._id} to={`/books/${book._id}`}   className="p-4 flex flex-col items-center text-center">  
                <img
                    src="/cover.svg"
                    alt={`${book.title} cover`}
                    className="h-60 w-auto object-contain mb-4 hover:scale-[1.02] transition-transform duration-100"
                />
                <h2 className="text-lg font-bold mb-1">{book.title}</h2>
                <p className="text-sm text-gray-700">by {book.author}</p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center items-center flex-wrap gap-2">
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-3 py-2 rounded-full font-medium ${
                page === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-lime-500 text-white hover:bg-lime-600'
                }`}
            >
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                key={pg}
                onClick={() => setPage(pg)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    pg === page
                    ? 'bg-lime-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                >
                {pg}
                </button>
            ))}

            <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className={`px-3 py-2 rounded-full font-medium ${
                page === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-lime-500 text-white hover:bg-lime-600'
                }`}
            >
                Next
            </button>
            </div>

      </div>
    </div>
  );
};

export default BookList;
