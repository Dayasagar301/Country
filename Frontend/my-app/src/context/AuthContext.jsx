import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Handle parsing error (optional)
      }
    }
  }, []);
  

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
