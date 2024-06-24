import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import MatchesPage from '../pages/MatchesPage';
import './FACup.css';

const FACup = ({ matches }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);

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

        window.addEventListener('resize', updateItemsPerPage);
    }, []);

    return (
        <div className='facup-home'>
            <Navbar />
            <div className='facup-content'>
                <h2 className='facup-title'>FAカップ</h2>
                <div className='facup-grid-container'>
                    {matches.map((match) => {
                        if (match.category === 'FAカップ') {
                            return (
                                <Link key={match.id} to={`/video/${match.id}`} className='facup-grid-item' data-date={match.date}>
                                    <img src={match.thumbnail} alt={match.title} />
                                    <h3>{match.category}</h3>
                                    <h2>{match.title}</h2>
                                </Link>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
            <div className='pagination-container'>
                <MatchesPage matches={matches}/>
            </div>
        </div>
    );
};

export default FACup;
