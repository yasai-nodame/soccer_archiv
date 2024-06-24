import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './PremierLeague.css'
import MatchesPage from '../pages/MatchesPage';

const PremierLeague = ({ matches }) => {
    const [premierCurrentPage, setPremierCurrentPage] = useState(0);
    const [premierPerPage, setPremierItemsPage] = useState(9);

    const premierHandlePageChange = ({ selected }) => {
        setPremierCurrentPage(selected);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const premierUpdateItemsPerPage () => {
            if (window.innerWidth < 600) {
                setPremierItemsPage(6);
            } else if (window.innerWidth < 1415) {
                setPremierItemsPage(8);
            } else {
                setPremierItemsPage(9);
            }
        };
    }, []);

    return (
        <div className='premier-home'>
            <Navbar />
            <div className='premier-content'>
                <h2 className='premier-league-title'>プレミアリーグ</h2>
                <div className='premier-grid-container'>
                    {matches.map((match) => {
                        if (match.category === 'プレミアリーグ') {
                            return (
                                <Link key={match.id} to={`/video/${match.id}`} className='premier-grid-item' data-date={match.date}>
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
                <MatchesPage matches={matches} onPageChange={premierHandlePageChange}/>
            </div>
        </div>
    );
};

export default PremierLeague;
