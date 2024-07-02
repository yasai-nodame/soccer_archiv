import React from 'react'
import { Link } from 'react-router-dom';
import './SearchResults.css';
import soccer_thumbnail from '../assets/soccer_ball.jpg';

const SearchResults = ( { searchResults, search_value }) => {
    return (
        <div className='search-results-page'>
            <h2>{search_value} の検索結果</h2>
            <p>{searchResults.length()}</p>
        </div>
    )
}

export default SearchResults
