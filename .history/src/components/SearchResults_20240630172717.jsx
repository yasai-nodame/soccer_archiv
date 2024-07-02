import React from 'react';

const SearchResults = ({ searchResults }) => {
    return (
        <div className="search-results">
            <h2>Search Results</h2>
            <ul>
                {searchResults && searchResults.map((result, index) => (
                    <li key={index}>
                        {/* ヒットしたデータをここに表示する */}
                        <p>{result.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
