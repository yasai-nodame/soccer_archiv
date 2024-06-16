import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const PremierLeague = ({ matches }) => {
    return (
        <div className='home'>
            <Navbar />
            <div className='content'>
                <h2>プレミアリーグ</h2>
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
            <div className='related-videos'>
                <h2>新着動画</h2>
                <div className='video-list'>
                    {latestMatches.map((match, index) => (
                        <div key={index} className='video-item'>
                            <img src={match.thumbnail} alt="" />
                            <div className="video-info">
                                <p>{`${match.date} ${match.category}`}</p>
                                <h3>{match.title}</h3>
                                <Link to={`/video/${match.id}`} style={{cursor: 'pointer', color: 'white'}}>詳細を見る</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PremierLeague;
