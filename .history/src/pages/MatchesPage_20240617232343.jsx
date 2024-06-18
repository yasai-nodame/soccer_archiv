import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import soccer from './assets/soccer_ball.jpg'; // サムネイル画像のパスを正しく設定してください

const matches = [
    { id: 1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', matchday: '第1節', thumbnail: soccer },
    { id: 2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', matchday: '第1節', thumbnail: soccer },
    { id: 3, date: '2024-6-12', category: 'プレミアリーグ', title: 'マンチェスターシティ×エヴァートン', matchday: '第1節', thumbnail: soccer },
    { id: 4, date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail: soccer },
    { id: 5, date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンチェスターユナイテッド', matchday: '第1節', thumbnail: soccer },
    { id: 6, date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail: soccer },
    { id: 7, date: '2024-6-14', category: 'プレミアリーグ', title: 'ニューカッスル×クリスタル・パレス', matchday: '第1節', thumbnail: soccer },
    { id: 8, date: '2024-6-14', category: 'プレミアリーグ', title: 'ブライトン×ブレントフォード', matchday: '第1節', thumbnail: soccer },
    { id: 9, date: '2024-6-14', category: 'プレミアリーグ', title: 'ウエストハム×アストンヴィラ', matchday: '第1節', thumbnail: soccer },
    { id: 10, date: '2024-6-15', category: 'プレミアリーグ', title: 'アーセナル×ブレントフォード', matchday: '第2節', thumbnail: soccer },
    { id: 11, date: '2024-6-15', category: 'プレミアリーグ', title: 'ウルブス×エヴァートン', matchday: '第2節', thumbnail: soccer },
    { id: 12, date: '2024-6-15', category: 'プレミアリーグ', title: 'マンチェスターユナイテッド×マンチェスターシティ', matchday: '第2節', thumbnail: soccer },
    // 追加するときは、ここに追加
    // FAカップは　matchdayを定義しない。
];

const MatchesPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 3; // 1ページあたりの matches の数を3に設定

    // ページが変更されたときのハンドラー
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // 現在のページに表示する matches を取得
    const offset = currentPage * perPage;
    const currentMatches = matches.slice(offset, offset + perPage);

    return (
        <div>
            <h1>Matches Page</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {currentMatches.map((match, index) => (
                    <div key={index} style={{ flex: '1 0 30%', margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
                        <img src={match.thumbnail} alt={match.title} style={{ width: '100%' }} />
                        <h2>{match.title}</h2>
                        <p>{match.date}</p>
                        <p>{match.category}</p>
                        {match.matchday && <p>{match.matchday}</p>}
                    </div>
                ))}
            </div>
            <ReactPaginate
                previousLabel={"← 前"}
                nextLabel={"次 →"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(matches.length / perPage)} // ページの総数
                marginPagesDisplayed={2} // 先頭と末尾に表示するページ番号の数
                pageRangeDisplayed={5} // 表示するページ番号の数
                onPageChange={handlePageChange} // ページが変更されたときのハンドラー
                containerClassName={"pagination"} // ページネーションのスタイルクラス名
                subContainerClassName={"pages pagination"} // サブコンテナのスタイルクラス名
                activeClassName={"active"} // アクティブなページ番号のスタイルクラス名
                forcePage={currentPage} // 現在のページを強制的に設定
            />
        </div>
    );
};

export default MatchesPage;
