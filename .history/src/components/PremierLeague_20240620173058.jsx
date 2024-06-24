import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './PremierLeague.css';
import MatchesPage from '../pages/MatchesPage';

const PremierLeague = ({ matches }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);

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

        const fillterdMatches = matches.filter(match => match.category === 'プレミアリーグ');
        setTotalPages(Math.ceil(fillterdMatches.length / itemsPerPage));

        window.addEventListener('resize', updateItemsPerPage);
        updateItemsPerPage();

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, [matches, itemsPerPage]);

    const filteredMatches = matches.filter(match => match.category === 'プレミアリーグ');
    const offset = currentPage * itemsPerPage;
    const currentMatches = filteredMatches.slice(offset, offset + itemsPerPage);

    return (
        <div className='premier-home'>
            <Navbar />
            <div className='premier-content'>
                <h2 className='premier-league-title'>プレミアリーグ</h2>
                <div className='premier-grid-container'>
                    {currentMatches.length > 0 ? currentMatches.map((match) => (
                        <Link key={match.id} to={`/video/${match.id}`} className='premier-grid-item' data-date={match.date}>
                            <img src={match.thumbnail} alt={match.title} />
                            <h3>{match.category}</h3>
                            <h2>{match.title}</h2>
                        </Link>
                    )) : <p>表示する試合がありません</p>}
                </div>
            </div>
            <div className='pagination-container'>
                <MatchesPage matches={filteredMatches} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default PremierLeague;
