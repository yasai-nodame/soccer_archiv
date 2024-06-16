import React from 'react'
import Navbar from '../components/Navbar/Navbar'

const PremierLeague = ({matches}) => {
    

    return (
        <div>
            <h1>プレミアリーグ</h1>
            <ul>
                {matches.map(match => (
                    <li key={match.id}>{match.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PremierLeague;
