import React from 'react'
import Navbar from '../components/Navbar/Navbar'

const PremierLeague = ({ matches }) => {
    // 一時的な固定のデータ
    const dummyMatches = [
        { id: 1, title: "Match 1" },
        { id: 2, title: "Match 2" },
        { id: 3, title: "Match 3" }
    ];

    return (
        <div>
            <h1>プレミアリーグ</h1>
            <ul>
                {dummyMatches.map(match => (
                    <li key={match.id}>{match.title}</li>
                ))}
            </ul>
        </div>
    );
};


export default PremierLeague;
