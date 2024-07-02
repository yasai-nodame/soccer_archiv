import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const { searchResults } = location.state || {};

    console.log(searchResults);
    return (
        <div>
            <h1>検索結果ページ</h1>
            {searchResults ? <SearchResults searchResults={searchResults} /> : <p>検索結果0件</p>} 
        </div>
    );
};

export default SearchResults;
