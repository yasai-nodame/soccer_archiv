import React from 'react'

const PremierLeague = () => {
    const matches = [
        {id:1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', thumbnail: soccer},
        {id:2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', thumbnail: soccer},
        {id:3, date: '2024-6-12', category: 'プレミアリーグ', title: 'マンチェスターシティ×エヴァートン', thumbnail:soccer},
        {id:4, date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンチェスターユナイテッド', thumbnail:soccer},
        //追加するときは、ここに追加
    ];


    return (
        <div>
            <h1>プレミアリーグ</h1>
            <ul>
                {matches.map(match => (
                    <li key={match.id}>{match.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default PremierLeague
