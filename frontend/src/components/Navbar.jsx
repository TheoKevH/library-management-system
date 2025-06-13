import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/books');
  };


  return (
    <nav className="sticky top-0 z-50 bg-cream px-8 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src="/lmslogo.png" alt="Logo" className="h-10 w-10 object-contain" />
        <Link to="/books" className="text-3xl font-semibold italic text-gray-700">
          LMS
        </Link>
      </div>

      <div className="relative flex items-center space-x-4">
        {!user ? (
          <>
            <Link to="/register" className="text-gray-700 font-medium hover:underline">
              Sign Up
            </Link>
            <Link to="/login">
              <Button
                text="Log In"
                className={location.pathname === '/login' ? '' : 'bg-lime-500'}
              />
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl text-gray-700 focus:outline-none"
            >
              <FaUserCircle />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-36 w-48 bg-white shadow-md rounded-lg py-2 z-50">
                <p className="px-4 py-2 text-gray-700 font-medium border-b">
                  Hello, <span className="font-semibold">{user.username}</span>
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Log Out
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
