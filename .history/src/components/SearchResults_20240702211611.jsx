import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import spinner from '../assets/spinner.gif';

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
        </div>
        <div>
            <h2>検索結果</h2>
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>
                        <p>{result.title}</p>
                        <p>{result.category}</p>
                        <p>{result.date}</p>
                        {imageUrls[result.id] && <img src={imageUrls[result.id]} alt="" />} {/* imageURLs[result.id]がtrueの場合、右のimgを表示 */}
                        {/* 他の必要な情報を表示 */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;
