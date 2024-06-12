import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import soccer from '../../assets/soccer_ball.jpg'
import MatchesPage from '../MatchesPage'

const Home = () => {
    const matches = [
        { date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', thumbnail: soccer, link:'ページ遷移'},
        { date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', thumbnail: soccer, link:'ページ遷移'},
        { date: '2024-6-12', category: 'プレミアリーグ', title: 'マンチェスターシティ×エヴァートン', thumbnail:soccer, link:'ページ遷移'},
        { date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail:soccer, link:'ページ遷移'},
        { date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンチェスターユナイテッド', thumbnail:soccer, link:'ページ遷移'},
        { date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail:soccer, link:'ページ遷移'},
        //追加するときは、ここに追加
    ];

    //最新5件取得
    const latestMatches = matches.slice(-5);

    const relatedVideos = [
        {title: '新着動画1', thumbnail: soccer, url: '#'},
        {title: '新着動画1', thumbnail: soccer, url: '#'},
        {title: '新着動画1', thumbnail: soccer, url: '#'},
        //必要に応じて新着動画を追加
    ];

    return (
    <div className='home'>
        <Navbar/>
        <div className='content'>
            <div className='grid-container'>
                {matches.map((match, index) => (
                    <div key={index} className='grid-item' data-date={match.date}>
                        <img src={match.thumbnail} alt="" />
                        <h3>{match.category}</h3>
                        <h2>{match.title}</h2>
                    </div>
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
                            <h3 style={{cursor: 'pointer' }}>{match.link}</h3>
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


// ページネーションの要素が他の要素と被るので、調整させる。
// 新着動画テキストがgrid-containerとは別のところに配置されるので、レスポンシブな対応をさせる。