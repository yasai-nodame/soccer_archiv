import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const MatchesPage = ({ matches, onPageChange }) => {
    const pageCount = Math.ceil(matches.length / 9);

    // ページが変更されたときのハンドラー
    const handlePageChange = ({ selected }) => {
        onPageChange({ selected });
    };

    return (
            <ReactPaginate
                pageCount={pageCount} // ページの総数
                pageRangeDisplayed={5} // 表示するページ番号の数
                marginPagesDisplayed={2} // 先頭と末尾に表示するページ番号の数
                onPageChange={handlePageChange} // ページが変更されたときのハンドラー
                containerClassName='pagination' // ページネーションのスタイルクラス名
                activeClassName='active' // アクティブなページ番号のスタイルクラス名
                previousLabel={'←'}
                nextLabel={'→'}
            />
    );
};

export default MatchesPage;
