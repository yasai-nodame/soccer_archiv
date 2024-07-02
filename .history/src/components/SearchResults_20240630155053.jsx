import React from 'react'
import { Link } from 'react-router-dom';
import './SearchResults.css';
import soccer_thumbnail from '../assets/soccer_ball.jpg';

const SearchResults = ( { searchResults, search_value }) => {
    const results = Object.values(searchResults); // hitsの中身をオブジェクト型から配列に変換する
    
    return (
        <div className='search-results-page'>
            <h2>{search_value} の検索結果</h2>
            <div className='search-results-grid'>
                {searchResults && searchResults.length > 0 ? searchResults.map((result, index) => (
                    <Link key={index} to={`/video/${result.id}`} className='search-results-item'>
                        <img src={soccer_thumbnail} alt='' />
                        <h3>{result.category}</h3>
                        <h2>{result.title}</h2>
                    </Link>
                )) : <p>一致する結果がありませんでした。</p> }
            </div>
        </div>
    )
}

export default SearchResults
