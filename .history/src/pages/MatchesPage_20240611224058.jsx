import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './MatchesPage.css'

const MatchesPage = ({}) => {
    const matches = [
        { date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', thumbnail: soccer},
        { date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', thumbnail: soccer},
        { date: '2024-6-12', category: 'プレミアリーグ', title: 'マンチェスターシティ×エヴァートン', thumbnail:soccer},
        { date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail:soccer},
        { date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンチェスターユナイテッド', thumbnail:soccer},
        { date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail:soccer},
        //追加するときは、ここに追加
    ];
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 5;
    

    // ページが変更されたときのハンドラー
    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    };

    const indexOfLastMatch = (currentPage + 1) * perPage;
    const indexOfFirstMatch = indexOfLastMatch - perPage;
    const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

    return (
    <div>
        <div className='content'>
            <div className='grid-container'>
                {matches.map((match, index) => (
                    <div key={index} className='grid-item' data-date={match.date}>
                        <img src={match.thumbnail} alt="" />
                        <h3>{match.category}</h3>
                        <h2>{match.title}</h2>
                    </div>
                ))}
            </div>
        </div>
        <ReactPaginate
            pageCount={Math.ceil(matches.length / perPage)} //ページの総数
            pageRangeDisplayed={5} //表示するページ番号の数
            marginPagesDisplayed={2} //先頭と末尾に表示するページ番号の数
            onPageChange={handlePageChange} //ページが変更されたときのハンドラー
            containerClassName='pagination' //ページネーションのスタイルクラス名
            activeClassName='active' //アクティブなページ番号のスタイルクラス名
            disableInitialCallback={true} //初期コールバックを無効にする
            previousLabel={"←"}
            nextLabel={"→"}
        />
    </div>
    );
};

export default MatchesPage

