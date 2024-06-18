import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const MatchesPage = ({ matches }) => {
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
            <ul>
                {currentMatches.map((match, index) => (
                    <li key={index}>{match.name}</li>
                ))}
            </ul>
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
