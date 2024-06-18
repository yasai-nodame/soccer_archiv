import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const MatchesPage = ({ matches, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 9;

    // ページが変更されたときのハンドラー
    const handlePageChange = ({ selected }) => {
        console.log('selected page:', selected);
        setCurrentPage(selected);
        onPageChange({ selected });
    };

    // 現在のページに表示するデータを取得
    const offset = currentPage * perPage;
    const currentMatches = matches.slice(offset, offset + perPage);

    return (
        <div>
            <div className='grid-container'>
                {currentMatches.map((match) => (
                    <Link key={match.id} to={`/video/${match.id}`} className='grid-item' data-date={match.date}>
                        <img src={match.thumbnail} alt='' />
                        <h3>{match.category}</h3>
                        <h2>{match.title}</h2>
                    </Link>
                ))}
            </div>
            <ReactPaginate
                pageCount={Math.ceil(matches.length / perPage)} // ページの総数
                pageRangeDisplayed={5} // 表示するページ番号の数
                marginPagesDisplayed={2} // 先頭と末尾に表示するページ番号の数
                onPageChange={handlePageChange} // ページが変更されたときのハンドラー
                containerClassName='pagination' // ページネーションのスタイルクラス名
                activeClassName='active' // アクティブなページ番号のスタイルクラス名
                disableInitialCallback={true} // 初期コールバックを無効にする
                previousLabel={'←'}
                nextLabel={'→'}
            />
        </div>
    );
};

export default MatchesPage;
