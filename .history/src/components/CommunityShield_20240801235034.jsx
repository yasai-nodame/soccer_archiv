import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import './CommunityShield.css';
import MatchesPage from '../pages/MatchesPage';
import spinner from '../assets/spinner.gif';

const CommunityShield = ({matches, loading}) => {
    const {currentPage, setCurrentPage} = useState(0);
    const {itemPerPage, setItemsPerPage} = useState(9);
    const {totalPages, setTotalPages} = useState(0);
    const navigate = useNavigate();

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0);
    }
    useEffect (() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth < 600) {
                setItemsPerPage(6);
            } else if (window.innerWidth < 1415) {
                setItemsPerPage(8);
            } else {
                setItemsPerPage(9);
            }
        }

        const fillterdMatches = matches.filter(match => match.category === 'コミュニティシールド');
        setTotalPages(Math.ceil(fillterdMatches.length / itemPerPage));

        window.addEventListener('resize', updateItemsPerPage);
    }, [matches, setItemsPerPage]);

    const filteredMatches = matches.filter(match => match.category === 'コミュニティシールド');
    const offset = currentPage * setItemsPerPage;
    const currentMatches = fillterdMatches.slice(offset, offset + setItemsPerPage);

    const handleCommunityClick = () => {
        setCurrentPage(0);
        navigate('/community-shield-page');
    }

    return (
        loading?<div className='standby-spinner'>
            <img src={spinner} alt=""/>
        </div>:
        <div className='commyunity-home'>
            <Navbar handleCommunityClick={handleCommunityClick}/>
            <div className='community-content'>
                <h2 className='community-title'>コミュニティシールド</h2>
                <div className='community-grid-container'>
                    {currentMatches.length > 0 ? currentMatches.map((match) => {
                        <Link key={match.id} to={`/video/${match.id}`} className='community-grid-item' data-date={match.date}>
                            <img src={match.thumbnail} alt={match.title} />
                            <h3>{match.category}</h3>
                            <h2>{match.title}</h2>
                        </Link>
                    }) : <p>表示する試合がありません</p>}
                </div>
            </div>
            <div className='pagination-container'>
                <MatchesPage pageCount={totalPages} onPageChange={handleCommunityClick} forcePage={currentPage >= totalPages ? totalPages -1 : currentPage}/>
            </div>
        </div>
    )
}

export default CommunityShield
