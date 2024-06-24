import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './VideoPage.css';
import { Link } from 'react-router-dom';

const videoData = {
    1: { src: '/videos/video1.mp4', date: '2024-6-11', title: '第1節 チェルシー×アーセナル' },
    2: { src: '/videos/video2.mp4', date: '2024-6-11', title: '第1節 フラム×リヴァプール' },
    // 必要に応じて他の動画のパスを追加
};


const VideoPage = ({relatedVideos}) => {
    const { id } = useParams();
    const video = videoData[id];

    // 関連動画をシャッフルして表示
    const shuffleArray =  (array) => {
        for (let i=array.length - 1; i>0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledVideos = shuffleArray([...relatedVideos]); // reletedVideosをコピーして新しい配列をshuffleVideosに代入
    const limitedRelatedVideos = shuffledVideos.slice(0, 16);


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
                    {limitedRelatedVideos.map((relatedVideo) => (
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
