import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import spinner from '../assets/spinner.gif';
import MatchesPage from '../pages/MatchesPage';
import Navbar from './Navbar/Navbar';
import './SearchResults.css';
import soccer_ball from '../assets/soccer_ball.jpg';

const SearchResults = () => {
    const location = useLocation();
    const { searchResults } = location.state || {}; // 遷移先に値を渡した状態オブジェクトを取得 location.state なかったら空のオブジェクトを渡す{} エラー回避
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        setLoading(false);
    }, [searchResults]);

    return (
        loading? <div className='standby-spinner'> {/* firebaseのstorageからimgを反映させるまで待機も追加 */}
            <img src={spinner} alt="" />
        </div>:
        <div className='search-home'>
            <Navbar/>
            <div className='search-content'>
                <h2 className='search-title'>検索結果</h2>
                <div className='search-container'>
                    {searchResults && searchResults.length > 0 ? searchResults.map((result) => (
                        <Link key={result.id} to={`/video/${result.id}`} className='search-grid-item' data-date={result.date}>
                            <img src={soccer_ball} alt="" />
                            <h3>{result.category}</h3>
                            <h2>{result.title}</h2>
                        </Link>
                    )) : <p> {searchTerm}に一致した試合がありませんでした。</p> }
                </div> {/* 関連動画もランダムで配置 */}
            </div>
            <div className='pagination-container'>
                {/* ページネーション配置 */}
            </div>
        </div>
    );
}

export default SearchResults;