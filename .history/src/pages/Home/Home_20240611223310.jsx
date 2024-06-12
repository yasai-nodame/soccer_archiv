import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import soccer from '../../assets/soccer_ball.jpg'
import MatchesPage from '../MatchesPage'

const Home = () => {

    const relatedVideos = [
        {title: '関連動画1', thumbnail: soccer, url: '#'},
        {title: '関連動画1', thumbnail: soccer, url: '#'},
        {title: '関連動画1', thumbnail: soccer, url: '#'},
        //必要に応じて関連動画を追加
    ];

    return (
    <div className='home'>
        <Navbar/>
        <MatchesPage/>
        <div className='related-videos'>
            <h2>関連動画</h2>
            <div className='video-list'>
                {relatedVideos.map((video, index) => (
                    <div key={index} className='video-item'>
                        <img src={video.thumbnail} alt="" />
                        <h3>{video.title}</h3>
                        {/* 必要に応じて動画へのリンクを追加 */}

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


// 右端に、もしほしいならば、関連動画も掲載させる。