import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import { Link } from 'react-router-dom';

const SearchResults = ({ searchResults }) => {
    return (
        <div className="search-results">
            {searchResults.map((result, index) => (
                <div key={index} className="search-result">
                    <h2>{result.title}</h2>
                    <p>{result.category}</p>
                    <p>{result.date}</p>
                    {/* 他の情報を表示する場合はここに追加 */}
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
