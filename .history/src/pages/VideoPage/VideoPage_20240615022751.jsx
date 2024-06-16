import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import './VideoPage.css'

const videoData = {
    1: { src: '/videos/video1.mp4', date: '2024-6-11', title: '第1節 チェルシー×アーセナル' },
    2: { src: '/videos/video2.mp4', date: '2024-6-11', title: '第1節 フラム×リヴァプール' },
    // 必要に応じて他の動画のパスを追加
};

const relatedVideos = [
    {id:1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', thumbnail: soccer},
    {id:2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', thumbnail: soccer},
    {id:3, date: '2024-6-12', category: 'プレミアリーグ', title: 'マンチェスターシティ×エヴァートン', thumbnail:soccer},
    {id:4, date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail:soccer},
    {id:5, date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンチェスターユナイテッド', thumbnail:soccer},
    {id:6, date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail:soccer},
    //追加するときは、ここに追加
]

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
                {video ? (
                    <>
                        <h1>{video.date}</h1>
                        <h1>{video.title}</h1>
                    </>
                ) : null}
            </div>
            
        </div>
    );
}

export default VideoPage
