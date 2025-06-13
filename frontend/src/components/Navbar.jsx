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
    <nav className="bg-cream px-8 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img
          src="/lmslogo.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />
        <a href='/books' className="text-3xl font-bold text-gray-800">LMS</a>
      </div>

      <div className="space-x-4">
        <Link to="/register" className={linkStyle('/register')}>
          Sign Up
        </Link>
        <Link to="/login" className={linkStyle('/login')}>
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
