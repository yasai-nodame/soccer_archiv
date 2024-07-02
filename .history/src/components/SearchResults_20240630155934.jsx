import React from 'react'
import { Link } from 'react-router-dom';
import './SearchResults.css';
import soccer_thumbnail from '../assets/soccer_ball.jpg';

const SearchResults = ( { searchResults, search_value }) => {


    // const results = Object.values(searchResults); // hitsの中身をオブジェクト型から配列に変換する

    return (
        <div className='search-results-page'>
            <h2>{search_value} の検索結果</h2>
        </div>
    )
}

export default SearchResults
