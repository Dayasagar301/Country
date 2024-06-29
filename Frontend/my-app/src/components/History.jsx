// src/components/History.js
import React, { useEffect, useState } from 'react';

import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const History = () => {
  const { user } = useAuth();
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchSearchHistory = async () => {
        try {
          const response = await api.get(`/api/users/${user._id}/search-history`);
          setSearchHistory(response.data.searchHistory);
        } catch (error) {
          console.error('Failed to fetch search history:', error);
        }
      };
      fetchSearchHistory();
    }
  }, [user]);

  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {searchHistory.length > 0 ? (
          searchHistory.map((query, index) => (
            <li key={index}>{query}</li>
          ))
        ) : (
          <p>No search history yet.</p>
        )}
      </ul>
    </div>
  );
};

export default History;
