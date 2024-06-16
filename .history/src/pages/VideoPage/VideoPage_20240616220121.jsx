import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './VideoPage.css';
import soccer from '../../assets/soccer_ball.jpg';
import { Link } from 'react-router-dom';

const videoData = {
    1: { src: '/videos/video1.mp4', date: '2024-6-11', title: '第1節 チェルシー×アーセナル' },
    2: { src: '/videos/video2.mp4', date: '2024-6-11', title: '第1節 フラム×リヴァプール' },
    // 必要に応じて他の動画のパスを追加
};


const VideoPage = ({relatedVideos}) => {
    const { id } = useParams();
    const video = videoData[id];

    return (
        <div className='video-page'>
            <Navbar />
            <div className='video-container'>
                {video ? (
                    <video key={video?.src} controls>
                        <source src={video?.src} type='video/mp4' />
                        お使いのブラウザはvideoタグをサポートしていません
                    </video>
                ) : (
                    <p>動画が見つかりません。</p>
                )}
            </div>
            <div className='title-container'>
                {video && (
                    <>
                        <h1>{video.date}</h1>
                        <h1>{video.title}</h1>
                    </>
                )}
            </div>
            <div className='horizontal-videos'>
                <h2>関連動画</h2>
                <div className='video-listbox'>
                    {relatedVideos.map((relatedVideo) => (
                        <div key={relatedVideo.id} className='video-itembox'>
                            <img src={relatedVideo.thumbnail} alt='' className='video-thumbnail' />
                            <div className='video-infomation'>
                                <div>
                                    <p>{relatedVideo.date}</p>
                                    <p>{relatedVideo.category}</p>
                                </div>
                                <h3>{relatedVideo.title}</h3>
                                <Link to={`/video/${relatedVideo.id}`} style={{ cursor: 'pointer', color: 'white' }}>
                                    詳細を見る
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
