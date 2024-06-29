// src/components/Search.js
import React, { useState } from 'react';

import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Search = () => {
  const { user } = useAuth();
  const [currencyCode, setCurrencyCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/api/countries/${currencyCode}`);
      setSearchResult(response.data);
      saveSearchHistory(currencyCode);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const saveSearchHistory = async (query) => {
    try {
      await api.post(`/api/users/${user._id}/search-history`, { query });
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  };

  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Enter currency code"
        value={currencyCode}
        onChange={(e) => setCurrencyCode(e.target.value)}
        required
      />
      <button onClick={handleSearch}>Search</button>

      {searchResult && (
        <div className="country-card">
          <img src={`https://flagsapi.com/${searchResult.code.toLowerCase()}/shiny/64.png`} alt={searchResult.name} />
          <h3>{searchResult.name}</h3>
          <p>Capital: {searchResult.capital}</p>
          <p>Currency: {searchResult.currency}</p>
          <p>Languages: {searchResult.languages.join(', ')}</p>
          {/* Add other details as needed */}
        </div>
      )}
    </div>
  );
};

export default Search;
