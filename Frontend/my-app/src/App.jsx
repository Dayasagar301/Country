import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


import PrivateRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './components/Search';
import Favorites from './components/Favorites';
import History from './components/History';

const App = () => {
  return (

        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/history" element={<History />} />
            </Route>
          </Routes>
        </div>
   
  );
};

export default App;
