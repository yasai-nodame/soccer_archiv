import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const PremierLeague = ({ matches }) => {
    return (
        <div className='home'>
            <Navbar />
            <div className='content'>
                <div className='grid-container'>
                    {matches.map((match) => {
                        if (match.category === 'プレミアリーグ') {
                            return (
                                <Link key={match.category} to={`/video/${match.id}`} className='grid-item' data-date={match.date}>
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
        </div>
    );
};

export default PremierLeague;
