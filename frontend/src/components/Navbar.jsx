import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) =>
    `px-4 py-2 rounded-full transition ${
      location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center rounded-b-2xl">
      <div className="text-xl font-bold text-blue-700">📚 MyLibrary</div>
      <div className="space-x-3">
        <Link to="/" className={linkStyle('/')}>Home</Link>
        <Link to="/books" className={linkStyle('/books')}>Books</Link>
        <Link to="/register" className={linkStyle('/register')}>Sign Up</Link>
        <Link to="/login" className={linkStyle('/login')}>Log In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
