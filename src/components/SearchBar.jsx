import React from 'react';
import { specializationsList } from '../services/mockData';

export default function SearchBar({ searchQuery, onSearchChange, selectedSpec, onSpecChange, onSearchSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="search-input-wrap">
        <input
          type="text"
          className="search-input"
          placeholder="Search doctor by name or condition..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="search-input-wrap">
        <select
          className="search-select"
          value={selectedSpec}
          onChange={(e) => onSpecChange(e.target.value)}
        >
          {specializationsList.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        🔍 Search
      </button>
    </form>
  );
}
