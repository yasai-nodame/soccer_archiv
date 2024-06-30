import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import MatchesPage from '../pages/MatchesPage';
import './FACup.css';
import spinner from '../assets/spinner.gif'

const FACup = ({ matches, loading }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth < 600) {
                setItemsPerPage(6);
            } else if (window.innerWidth < 1415) {
                setItemsPerPage(8);
            } else {
                setItemsPerPage(9);
            }
        };

        const fillterdMatches = matches.filter(match => match.category === 'FAカップ');
        setTotalPages(Math.ceil(fillterdMatches.length / itemsPerPage));

        window.addEventListener('resize', updateItemsPerPage);
        updateItemsPerPage();
    }, [matches, itemsPerPage]);

    const fillterdMatches = matches.filter(match => match.category === 'FAカップ');
    const offset = currentPage * itemsPerPage;
    const currentMatches = fillterdMatches.slice(offset, offset + itemsPerPage);

    const handleFacupPage = () => {
        setCurrentPage(0);
        navigate('/fa-cup-page');
    }

    return (
        loading?<div className='standby-spinner'>
            <img src={spinner} alt="" />
        </div>:
        <div className='facup-home'>
            <Navbar handleFacupPage={handleFacupPage}/>
            <div className='facup-content'>
                <h2 className='facup-title'>FAカップ</h2>
                <div className='facup-grid-container'>
                    {currentMatches.length > 0 ? currentMatches.map((match) => (
                        <Link key={match.id} to={`/video/${match.id}`} className='facup-grid-item' data-date={match.date}>
                            <img src={match.thumbnail} alt={match.title} />
                            <h3>{match.category}</h3>
                            <h2>{match.title}</h2>
                        </Link>
                    )) : <p>表示する試合がありません</p>}
                </div>
            </div>
            <div className='pagination-container'>
                {/* forcePageに指定する値はpageCountと同等かpageCount - 1の範囲内である必要がある。だからcurrentPageにtotalPages - 1の値を代入する。*/}
            <MatchesPage pageCount={totalPages} onPageChange={handlePageChange} forcePage={currentPage >= totalPages ? totalPages -1 : currentPage}/>
                {console.log('FA pageCount:', currentPage)}
                {console.log('FA forcepage:', totalPages)}
            </div>
        </div>
    );
};

export default FACup;
