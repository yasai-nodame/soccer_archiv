import React, { useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import MatchesPage from '../MatchesPage';
import { Link } from 'react-router-dom';

const Home = ({ matches }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 9;

    // 最新5件取得
    const latestMatches = matches.slice(-5);

    // ページが変更されたときのハンドラー
    const handlePageChange = ({ selected }) => {
        console.log('selected page:', selected);
        setCurrentPage(selected);
    };

    // 現在のページに表示するデータを取得
    const offset = currentPage * perPage;
    const currentMatches = matches.slice(offset, offset + perPage);

    // ページング時に表示する最大数の要素を計算
    const maxItemsPerPage = perPage;

    // 空の要素を追加するための関数
    const addEmptyItemsIfNeeded = (items) => {
        const emptyItemCount = maxItemsPerPage - items.length;
        if (emptyItemCount > 0) {
            for (let i = 0; i < emptyItemCount; i++) {
                items.push(null); // ダミーの空の要素を追加
            }
        }
        return items;
    };

    return (
        <div className='home'>
            <Navbar />
            <div className='content'>
                <div className='grid-container'>
                    {addEmptyItemsIfNeeded(currentMatches).map((match, index) => (
                        match ? (
                            <Link key={match.id} to={`/video/${match.id}`} className='grid-item' data-date={match.date}>
                                <img src={match.thumbnail} alt='' />
                                <h3>{match.category}</h3>
                                <h2>{match.title}</h2>
                            </Link>
                        ) : (
                            <div key={index} className='grid-item empty'></div>
                        )
                    ))}
                </div>
            </div>
            <div className='related-videos'>
                <h2>新着動画</h2>
                <div className='video-list'>
                    {latestMatches.map((match, index) => (
                        <div key={index} className='video-item'>
                            <img src={match.thumbnail} alt='' />
                            <div className='video-info'>
                                <p>{`${match.date} ${match.category}`}</p>
                                <h3>{match.title}</h3>
                                <Link to={`/video/${match.id}`} style={{ cursor: 'pointer', color: 'white' }}>
                                    詳細を見る
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='pagination-container'>
                <MatchesPage matches={matches} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default Home;
