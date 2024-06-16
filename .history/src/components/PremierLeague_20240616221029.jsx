import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const PremierLeague = ({matches}) => {
    

    return (
        <div>
            <Navbar/>
            <div className=''>
                <h1>プレミアリーグ</h1>
                <ul>
                    {matches.map(match => {
                        if (match.category === 'プレミアリーグ') {
                            return (
                                <li key={match.category}>
                                    <p>Date: {match.date}</p>
                                    <p>Category: {match.category}</p>
                                    <p>Title: {match.title}</p>
                                    <img src={match.thumbnail} alt={match.title} />
                                </li>
                            );
                        } else {
                            return null; // プレミアリーグでない場合は何も返さない
                        }
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PremierLeague;
