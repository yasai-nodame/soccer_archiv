import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import spinner from '../assets/spinner.gif';
import Navbar from './Navbar/Navbar';
import './SearchResults.css';
import soccer_ball from '../assets/soccer_ball.jpg';
import MatchesPage from '../pages/MatchesPage';
import { update } from 'firebase/database';

const SearchResults = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemPerPage, setItemsPerPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    
    useEffect(() => {
        if (location.state) {
            setSearchResults(location.state.searchResults || []); // Navbarのstateの値 searchResults(検索結果の要素リスト取得)
            setSearchTerm(location.state.searchTerm || ''); // Navbarで検索ワードを入力した値 searchTerm(検索ワードを取得)
        }
    })

    useEffect(() => {
        setLoading(false);
    }, [searchResults]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0);
    } 

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth < 600) {
                setItemsPerPage(6);
            } else if (window.innerWidth < 1415) {
                setItemsPerPage(8);
            } else {
                setItemsPerPage(9);
            }
        }

        setTotalPages(Math.ceil(searchResults.length / itemPerPage));

        window.addEventListener('resize', updateItemsPerPage);
        updateItemsPerPage();

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, [searchResults, itemPerPage]);

    // searchResultsの結果をsearchResults.dateの降順によって表示させる
    const sortedResults = searchResults ? [...searchResults].sort((a, b) => new Date(b.date) - new Date(a.date)) : []
    const offset = currentPage * itemPerPage;
    const currentResults = sortedResults.slice(offset, offset + itemPerPage);


    return (
        loading? <div className='standby-spinner'> 
            <img src={spinner} alt="" />
        </div>:
        <div className='search-home'>
            <Navbar/>
            <div className='search-content'>
                <h2 className='search-title'>検索結果</h2>
                <div className='search-container'>
                    {/* SearchResultsがtrue且つSearchResultsの要素数が0以上の場合マッピングする。 */}
                    {currentResults && currentResults.length > 0 ? currentResults.map((result) => ( 
                        <Link key={result.id} to={`/video/${result.id}`} className='search-grid-item' data-date={result.date}>
                            <img src={soccer_ball} alt="" />
                            <h3>{result.category}</h3>
                            <h2>{result.title}</h2>
                        </Link>
                    )) : <p> 「{searchTerm}」に一致した試合がありませんでした。</p> }
                </div>
            </div>
            <div className='pagination-container'>
            <MatchesPage pageCount={totalPages} onPageChange={handlePageChange} forcePage={currentPage >= totalPages ? totalPages -1 : currentPage} />
            </div>
        </div>
    );
}

export default SearchResults;
