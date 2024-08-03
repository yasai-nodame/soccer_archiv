import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import './CommunityShield.css';
import MatchesPage from '../pages/MatchesPage';
import spinner from '../assets/spinner.gif';

const CommunityShield = ({matches, loading}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
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
        console.log('communityShield');
        console.log(fillterdMatches);
        setTotalPages(Math.ceil(fillterdMatches.length / itemsPerPage));

        window.addEventListener('resize', updateItemsPerPage);
    }, [matches, itemsPerPage]);

    const filteredMatches = matches.filter(match => match.category === 'コミュニティシールド');
    const offset = currentPage * itemsPerPage;
    const currentMatches = filteredMatches.slice(offset, offset + itemsPerPage);
    console.log('currentMatches');
    console.log(currentMatches);

    const handleCommunityClick = () => {
        setCurrentPage(0);
        navigate('/community-shield-page');
    }

    return (
        loading?<div className='standby-spinner'>
            <img src={spinner} alt=""/>
        </div>:
        <div className='community-home'>
            <Navbar handleCommunityClick={handleCommunityClick}/>
            <div className='community-content'>
                <h2 className='community-title'>コミュニティシールド</h2>
                <div className='community-grid-container'>
                    {currentMatches.length > 0 ? currentMatches.map((match) => {
                        <Link key={match.id} to={`/video/${match.id}`} className='community-grid-item' data-date={match.date}>
                            <img src={match.thumbnail} alt={match.title} />
                            {console.log('match.category')}
                            {console.log(match.category)}
                            <h3>{match.category}</h3>
                            <h2>{match.title}</h2>
                        </Link>
                    }) : <p>表示する試合がありません</p>}
                </div>
            </div>
            <div className='pagination-container'>
                <MatchesPage pageCount={totalPages} onPageChange={handlePageChange} forcePage={currentPage >= totalPages ? totalPages -1 : currentPage}/>
            </div>
        </div>
    )
}

export default CommunityShield
