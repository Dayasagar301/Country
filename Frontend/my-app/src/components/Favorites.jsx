// src/components/Favorites.js
import React, { useEffect, useState } from 'react';

import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const response = await api.get(`/api/users/${user._id}/favorites`);
          setFavorites(response.data.favorites);
        } catch (error) {
          console.error('Failed to fetch favorites:', error);
        }
      };
      fetchFavorites();
    }
  }, [user]);

  return (
    <div>
      <h2>Favorites</h2>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((country) => (
            <div key={country.code} className="country-card">
              <img src={`https://flagsapi.com/${country.code.toLowerCase()}/shiny/64.png`} alt={country.name} />
              <h3>{country.name}</h3>
              <p>Capital: {country.capital}</p>
              <p>Currency: {country.currency}</p>
              <p>Languages: {country.languages.join(', ')}</p>
              {/* Add other details as needed */}
            </div>
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
