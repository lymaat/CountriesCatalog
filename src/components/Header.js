
import React from 'react';

function Header({ setSearchQuery, setSortOrder }) {
  return (
    <header>
      <input
        type="text"
        placeholder="Search by Country"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Sort by Name (A-Z)</option>
        <option value="desc">Sort by Name (Z-A)</option>
      </select>
    </header>
  );
}

export default Header;
