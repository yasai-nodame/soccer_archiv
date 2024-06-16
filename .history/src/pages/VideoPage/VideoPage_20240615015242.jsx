import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import './VideoPage.css'


const videoData = {
    1: { src: '/videos/video1.mp4', title: 'チェルシー×アーセナル'},
    2: { src: '/videos/video2.mp4', title: 'フラム×リヴァプール'},
    // 必要に応じて他の動画のパスを追加
};

const VideoPage = () => {
    const { id } = useParams();
    const videoSrc = videoData[id];

    return (
        <div className='video-page'>
            <Navbar/>
            {/* <div className='title-container'>
                {video ? <h1>{videoSrc.title}</h1> : <p>動画が見つかりません。</p>}
            </div> */}
            <div className='video-container'>
                {videoSrc ? (
                    <video controls>
                    <source src={videoSrc} type='video/mp4' />
                    お使いのブラウザはvideoタグをサポートしていません
                    </video>
                ) : (
                    <p>動画が見つかりません。</p>
                )}
            </div>
        </div>
    );
}

export default VideoPage
