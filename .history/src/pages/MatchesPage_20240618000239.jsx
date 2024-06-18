import React from 'react';
import ReactPaginate from 'react-paginate';

const MatchesPage = ({ matches, onPageChange }) => {
    // 1ページあたりの表示数を設定
    const itemsPerPage = 9;

    // ページが変更されたときのハンドラー
    const handlePageChange = ({ selected }) => {
        onPageChange({ selected });
    };

    return (
        <ReactPaginate
            pageCount={Math.ceil(matches.length / itemsPerPage)} // ページの総数
            pageRangeDisplayed={5} // 表示するページ番号の数
            marginPagesDisplayed={2} // 先頭と末尾に表示するページ番号の数
            onPageChange={handlePageChange} // ページが変更されたときのハンドラー
            containerClassName='pagination' // ページネーションのスタイルクラス名
            activeClassName='active' // アクティブなページ番号のスタイルクラス名
            disableInitialCallback={true} // 初期コールバックを無効にする
            previousLabel={'←'}
            nextLabel={'→'}
        />
    );
};

export default MatchesPage;
