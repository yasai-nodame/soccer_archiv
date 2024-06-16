import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import './VideoPage.css'

const videoData = {
    1: { src: '/videos/video1.mp4', date: '2024-6-11', title: '1節 チェルシー×アーセナル' },
    2: { src: '/videos/video2.mp4', date: '2024-6-11', title: '1節 フラム×リヴァプール' },
    // 必要に応じて他の動画のパスを追加
};

const VideoPage = () => {
    const { id } = useParams();
    const video = videoData[id];

    return (
        <div className='video-page'>
            <Navbar/>
            <div className='video-container'>
                {video ? (
                    <>
                        <video controls>
                            <source src={video.src} type='video/mp4' />
                            お使いのブラウザはvideoタグをサポートしていません
                        </video>
                    </>
                ) : (
                    <p>動画が見つかりません。</p>
                )}
            </div>
            <div className='title-container'>
                <h1>{video.date} {video.title}</h1>
            </div>
        </div>
    );
}

export default VideoPage
