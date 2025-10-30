import React from "react";

const SearchBar = ({ query, setQuery }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Rechercher..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </div>
);

export default SearchBar;
