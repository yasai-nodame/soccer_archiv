import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './PremierLeague.css'
import MatchesPage from '../pages/MatchesPage';
import './FACup.css'

const PremierLeague = ({ matches }) => {

    return (
        <div className='facup-home'>
            <Navbar />
            <div className='facup-content'>
                <h2 className='facup-title'>FAカップ</h2>
                <div className='facup-grid-container'>
                    {matches.map((match) => {
                        if (match.category === 'FAカップ') {
                            return (
                                <Link key={match.category} to={`/video/${match.id}`} className='facup-grid-item' data-date={match.date}>
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
