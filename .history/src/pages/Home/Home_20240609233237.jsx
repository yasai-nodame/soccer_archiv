import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import soccer from '../../assets/soccer_ball.jpg'

const Home = () => {
    const matches = [
        {category: 'プレミアリーグ', title: 'チェルシー×アーセナル', thumbnail: soccer},
        {category: 'プレミアリーグ', title: 'フラム×リヴァプール', thumbnail: soccer},
        {category: 'プレミアリーグ', title: 'マンチェスターシティ×エヴァートン', thumbnail:soccer},
        {category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail:soccer},
        {category: 'プレミアリーグ', title: 'ウルブス×マンチェスターユナイテッド', thumbnail:soccer},
        {category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail:soccer},
        //追加するときは、ここに追加
    ]

    return (
    <div className='home'>
        <Navbar/>
        <div className='content'>
            <div className='grid-container'>
                {matches.map((match, index) => (
                    <div key={index} className='grid-item'>
                        <img src={match.thumbnail} alt="" />
                        <h3>{match.category}</h1>
                        <h2>{match.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Home
