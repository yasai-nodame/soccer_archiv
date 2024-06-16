import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './VideoPage.css';
import soccer from '../../assets/soccer_ball.jpg'; // サムネイル画像の仮のインポート
import { Link } from 'react-router-dom';

const videoData = {
    1: { src: '/videos/video1.mp4', date: '2024-6-11', title: '第1節 チェルシー×アーセナル' },
    2: { src: '/videos/video2.mp4', date: '2024-6-11', title: '第1節 フラム×リヴァプール' },
    // 必要に応じて他の動画のパスを追加
};

const relatedVideos = [
    { id: 1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', thumbnail: soccer },
    { id: 2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', thumbnail: soccer },
    { id: 3, date: '2024-6-12', category: 'プレミアリーグ', title: 'マンチェスターシティ×エヴァートン', thumbnail: soccer },
    { id: 4, date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail: soccer },
    { id: 5, date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンチェスターユナイテッド', thumbnail: soccer },
    { id: 6, date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail: soccer },
    // 追加するときは、ここに追加
];

const VideoPage = () => {
    const { id } = useParams();
    const video = videoData[id];

    return (
        <div className='video-page'>
            <Navbar />
            <div className='video-container'>
                {video ? (
                    <video controls>
                        <source src={video.src} type='video/mp4' />
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
                            <img src={relatedVideo.thumbnail} alt='' />
                            <div className='video-infomation'>
                                <p>{`${relatedVideo.date} ${relatedVideo.category}`}</p>
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


// 関連動画を横向きに調整する。
// 最大16個くらい用意。 @mediaでレスポンシブに対応させる。