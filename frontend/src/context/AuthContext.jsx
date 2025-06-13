import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return username && token ? { username, token } : null;
  });

  const login = (username, token) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    setUser({ username, token });
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
