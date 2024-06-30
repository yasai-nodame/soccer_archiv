import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const { searchResults } = location.state || {}; // 遷移先に値を渡した状態オブジェクトを取得 location.state なかったら空のオブジェクトを渡す{} エラー回避

    // firebaseのstorageから　imgを取得
    
    return (
        <div>
            <h2>検索結果</h2>
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>
                        <p>{result.title}</p>
                        <p>{result.category}</p>
                        <p>{result.date}</p>
                        {/* 他の必要な情報を表示 */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;
