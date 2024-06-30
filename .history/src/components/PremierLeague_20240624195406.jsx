import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar'; //navbarをインポートしているため、navbarが子コンポーネント。premierleague.jsxは親コンポーネントとなる。
import { Link, useNavigate } from 'react-router-dom';
import './PremierLeague.css';
import MatchesPage from '../pages/MatchesPage';

const PremierLeague = ({ matches }) => {
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

        const fillterdMatches = matches.filter(match => match.category === 'プレミアリーグ');
        setTotalPages(Math.ceil(fillterdMatches.length / itemsPerPage));

        window.addEventListener('resize', updateItemsPerPage);
        updateItemsPerPage();

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, [matches, itemsPerPage]);

    // titleがプレミアリーグの要素を取得し、ウェブサイズに合わせた数ごとに表示させる
    const filteredMatches = matches.filter(match => match.category === 'プレミアリーグ');
    const offset = currentPage * itemsPerPage;
    const currentMatches = filteredMatches.slice(offset, offset + itemsPerPage);

    // プレミアリーグバーを押したら 1ページに戻るようにする
    const handlePremierLeagueClick = () => {
        setCurrentPage(0);
        navigate('/premier-league-page');
    }

    return (
        <div className='premier-home'>
            <Navbar  handlePremierLeagueClick={handlePremierLeagueClick}/>
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
                <MatchesPage pageCount={totalPages} onPageChange={handlePageChange} forcePage={currentPage} />
            </div>
        </div>
    );
};

export default PremierLeague;
