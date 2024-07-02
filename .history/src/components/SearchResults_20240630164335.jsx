import React from 'react';
import './SearchResults.css';
import soccer_thumbnail from '../assets/soccer_ball.jpg';

const SearchResults = ({ searchResults, searchValue }) => {
    return (
        <div className='search-results-page'>
            <h2>{searchValue} の検索結果</h2>
            <div className="search-results-list">
                {searchResults.map((item, index) => (
                    <div key={index} className="search-result-item">
                        <img src={soccer_thumbnail} alt="Thumbnail" className="thumbnail" />
                        <div className="result-details">
                            <h3>{item.title}</h3>
                            <p>{item.category}</p>
                            <p>{item.date}</p>
                            {item.matchday && <p>{item.matchday}</p>}
                            {/* 他の情報を必要に応じて表示 */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
