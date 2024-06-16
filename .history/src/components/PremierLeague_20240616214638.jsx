import React from 'react'
import Navbar from '../components/Navbar/Navbar'

const PremierLeague = () => {
    const matches = [
        {id:1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', thumbnail: soccer},
        {id:2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', thumbnail: soccer},
        {id:3, date: '2024-6-12', category: 'プレミアリーグ', title: 'マンチェスターシティ×エヴァートン', thumbnail:soccer},
        {id:4, date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail:soccer},
        {id:5, date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンチェスターユナイテッド', thumbnail:soccer},
        {id:6, date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail:soccer},
        //追加するときは、ここに追加
    ];


    return (
        <div>
            <h1>プレミアリーグ</h1>
            <div>
                {matches.map((match) => (
                    <Link key={match.id} to={`/video/${match.id}`} className='grid-item' data-date={match.date}>
                        <img src={match.thumbnail} alt="" />
                        <h3>{match.category}</h3>
                        <h2>{match.title}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PremierLeague;
