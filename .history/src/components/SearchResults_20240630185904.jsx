import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const { searchResults } = location.state || {};

    
    return (
        <div>
            <h2>検索結果</h2>
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>
                        <p>{result.title}</p>
                        <p>{result.category}</p>
                        <p>{result.date}</p>
                        {/* 他の必要な情報を表示 */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;
