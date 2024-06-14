import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import soccer from '../../assets/soccer_ball.jpg'
import MatchesPage from '../MatchesPage'
import { Link } from 'react-router-dom'

const Home = () => {
    const matches = [
        {id:1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', thumbnail: soccer},
        {id:2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', thumbnail: soccer},
        {id:3, date: '2024-6-12', category: 'プレミアリーグ', title: 'マンチェスターシティ×エヴァートン', thumbnail:soccer},
        {id:4, date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail:soccer},
        {id:5, date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンチェスターユナイテッド', thumbnail:soccer},
        {id:6, date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail:soccer},
        //追加するときは、ここに追加
    ];

    //最新5件取得
    const latestMatches = matches.slice(-5);

    return (
    <div className='home'>
        <Navbar/>
        <div className='content'>
            <div className='grid-container'>
                {matches.map((match, index) => (
                    <Link key={match.id} to={`/video/${match.id}`} className='grid-item' data-date={match.date}>
                        <img src={match.thumbnail} alt="" />
                        <h3>{match.category}</h3>
                        <h2>{match.title}</h2>
                    </Link>
                ))}
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
        <div className='pagination-container'>
            <MatchesPage matches={matches}/>
        </div>
    </div>
    )
}

export default Home


// ページ遷移したときに、関連動画を表示させる　8つくらい。
// ページ遷移の一番下の枠を使う。