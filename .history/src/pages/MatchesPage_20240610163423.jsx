import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const MatchesPage = ({matches}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 5;

    // マッチデータをページごとに分割する関数
    const displayMatches = () => {
        const startIndex = currentPage * perPage;
        const endIndex = startIndex + perPage;
        return matches.slice(startIndex, endIndex);
    };

    // ページが変更されたときのハンドラー
    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    };


    return (
    <div>
        {/* ページごとのマッチデータを表示 */}
        {displayMatches().map((match, index) =>(
            <div key={index}>
                <img src={match.thumbnail} alt="" />
                <h3>{match.category}</h3>
                <h2>{match.title}</h2>
            </div>
        ))}
        <ReactPaginate
            pageCount={Math.ceil(matches.length / perPage)} //ページの総数
            pageRangeDisplayed={5} //表示するページ番号の数
            marginPagesDisplayed={2} //戦闘と末尾に表示するページ番号の数
            onPageChange={handlePageChange} //ページが変更されたときのハンドラー
            containerClassName='pagination' //ページネーションのスタイルクラス名
            activeClassName='active' //アクティブなページ番号のスタイルクラス名
        />
    </div>
    );
};

export default MatchesPage
