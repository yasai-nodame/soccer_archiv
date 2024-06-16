import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './PremierLeague.css'
import MatchesPage from '../pages/MatchesPage';

const PremierLeague = ({ matches }) => {

    return (
        <div className='premier-home'>
            <Navbar />
            <div className='premier-content'>
                <h2 className='premier-league-title'>FAカップ</h2>
                <div className='premier-grid-container'>
                    {matches.map((match) => {
                        if (match.category === 'FAカップ') {
                            return (
                                <Link key={match.category} to={`/video/${match.id}`} className='premier-grid-item' data-date={match.date}>
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

export default PremierLeague;
