import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

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
        <div className='laliga-home'>
            <Navbar handleLaligaClick={handleLaligaClick} />
            <div className='laliga-content'>
                <h2 className='laliga-title'>ラリーガ</h2>
                <div className='laliga-grid-container'>
                    {currentMatches.length > 0 ? currentMatches.map((match) => (
                        <Link key={match.id} to={`/video/${match.id}`} className='laliga-grid-item' data-date={match.date}>
                            <img src={match.thumbnail} alt={match.title} />
                            <h3>{match.category}</h3>
                            <h2>{match.title}</h2>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Laliga
