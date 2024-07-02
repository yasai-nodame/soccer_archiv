import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import spinner from '../assets/spinner.gif';
import MatchesPage from '../pages/MatchesPage';
import Navbar from './Navbar/Navbar';

const SearchResults = ({ loading }) => {
    const location = useLocation();
    const { searchResults } = location.state || {}; // 遷移先に値を渡した状態オブジェクトを取得 location.state なかったら空のオブジェクトを渡す{} エラー回避
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchImages = async() => {
            const storage = getStorage();
            const newImageUrls = {};

            for (const result of searchResults) {  // forループ　searchResultsリストを定数resultにいれて　処理させていく
                try {
                    const imageRef = ref(storage, process.env.VITE_REACT_APP_IMAGE);
                    const url = await getDownloadURL(imageRef);
                    newImageUrls[result.id] = url;
                } catch (error) {
                    console.error('画像の取得に失敗しました。', error);
                }
            }
            setImageUrls(newImageUrls);
        }
        if (searchResults) { //searchResultsに要素があったら実行する。
            fetchImages();
        }
    }, [searchResults]); // 依存配列をsearchResultsに設定　searchResultsが更新されると、実行される。
    
    return (
        loading? <div className='standby-spinner'>
            <img src={spinner} alt="" />
        </div>:
        <div className='search-home'>
            <Navbar/>
            <div className='search-content'>
                <h2 className='search-title'>検索結果</h2>
                <div className='search-container'>
                    {searchResults.length > 0 ? searchResults.map((result) => (
                        <Link key={result.id} to={`/video/${result.id}`} className='search-grid-item'>
                            {imageUrls[result.id] && <img src={imageUrls[result.id]} alt="" />}
                            <h3>{result.category}</h3>
                            <h2>{result.title}</h2>
                        </Link>
                    )) : <p> に一致した試合がありませんでした。</p> }
                </div>
            </div>
            <div className='pagination-container'>
                {/* ページネーション配置 */}
            </div>
        </div>
    );
}

export default SearchResults;