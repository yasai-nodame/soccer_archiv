import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';
import soccer_thumbnail from '../assets/soccer_ball.jpg';

const SearchResults = ({ searchResults, searchValue }) => {
    return (
        <div className='search-results-page'>
            <h2>{searchValue} の検索結果</h2>
            <div className='search-results-grid'>
                {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                        <Link key={index} to={`/video/${result.id}`} className='search-results-item'>
                            <img src={soccer_thumbnail} alt='' />
                            <h3>{result.category}</h3>
                            <h2>{result.title}</h2>
                        </Link>
                    ))
                ) : (
                    <p>一致する結果がありませんでした。</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
