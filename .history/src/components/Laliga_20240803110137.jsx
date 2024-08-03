import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import spinner from '../assets/spinner.gif';
import MatchesPage from '../pages/MatchesPage';

const Laliga = ({ matches, loading }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollY(0, 0);
    };

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth < 600)  {
                setItemsPerPage(6);
            } else if (window.innerWidth < 1415) {
                setItemsPerPage(8);
            } else {
                setItemsPerPage(9);
            }
        };

        const fillterdMatches = matches.filter(match => match.category === 'ラリーガ');
        setTotalPages(Math.ceil(fillterdMatches.length / itemsPerPage));

        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, [matches, itemsPerPage]);

    const fillterdMatches = matches.filter(match => match.category === 'ラリーガ');
    const offset = currentPage * itemsPerPage;
    const currentMatches = fillterdMatches.slice(offset, offset + itemsPerPage);

    const handleLaligaClick = () => {
        setCurrentPage(0);
        navigate('/laliga-page');
    }

    return (
        loading? <div className='standby-spinner'>
            <img src={spinner} alt="" />
        </div>:
        <div className='laliga-home'>
            <Navbar handleLaligaClick={handleLaligaClick} />d
            <div className='laliga-content'>
                <h2 className='laliga-title'>ラリーガ</h2>
                <div className='laliga-grid-container'>
                    {currentMatches.length > 0 ? currentMatches.map((match) => (
                        <Link key={match.id} to={`/video/${match.id}`} className='laliga-grid-item' data-date={match.date}>
                            <img src={match.thumbnail} alt={match.title} />
                            <h3>{match.category}</h3>
                            <h2>{match.title}</h2>
                        </Link>
                    )) : <p>表示する試合がありません</p>}
                </div>
            </div>
            <div className='pagination-container'>
                <MatchesPage pageCount={totalPages} onPageChange={handlePageChange} forcePage={currentPage >= totalPages ? totalPages -1 : currentPage} />
            </div>
        </div>
    );
};

export default Laliga;
