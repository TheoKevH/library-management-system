import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-cream px-8 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          src="/lmslogo.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />
        <a href="/books" className="text-3xl font-semibold italic text-gray-700">
          LMS
        </a>
      </div>

      <div className="space-x-5 flex items-center">
        <Link
          to="/register"
          className="text-gray-700 font-medium hover:underline"
        >
          Sign Up
        </Link>

        <Link to="/login">
          <Button
            text="Log In"
            className={location.pathname === '/login' ? '' : 'bg-lime-500'}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
