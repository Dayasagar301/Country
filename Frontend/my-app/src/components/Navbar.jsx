// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li><Link to="/">Search</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
