import React from "react";
import "../css/components/SearchForm.css";

function SearchForm({ searchQuery, setSearchQuery, handleSearch }) {
    return (
        <form onSubmit={handleSearch} className="searchForm-form">
            <input 
                type="text" 
                placeholder="Search for movies..." 
                className="searchForm-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="searchForm-button">Search</button>
        </form>
    );
}

export default SearchForm;