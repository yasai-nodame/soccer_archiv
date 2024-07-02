import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    console.log('lcoation:', location);
    const { searchResults } = location.state || {};
    console.log('引数:', searchResults);

    
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
