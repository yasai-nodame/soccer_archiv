import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const MatchesPage = () => {
    const [matches, setMatches] = useState([]);
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
    }


    return (
    <div>
        {/* ページごとのマッチデータを表示 */}
        
    </div>
    )
}

export default MatchesPage
