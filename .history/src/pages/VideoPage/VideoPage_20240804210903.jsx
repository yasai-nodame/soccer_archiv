import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './VideoPage.css';
import { Link } from 'react-router-dom';
import spinner from '../../assets/spinner.gif';
import { getDownloadURL, listAll, ref, getStorage } from 'firebase/storage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const VideoPage = ({ relatedVideos, loading }) => {
    const { id } = useParams(); // idはstringで返している。
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [videosLoading, setVideosLoading] = useState(true); //loadingはページが開くまでの間で、videosLoadingは動画が開くまでの間スピナー（待機）画面
    const [matchDocument, setMatchDocument] = useState(null);

    const videoRef = useRef(null);

    const playvideo = () => {
        videoRef.current.play();
    };

    const pauseVideo = () => {
        videoRef.current.pause();
    };

    const stopVideo = () => {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    };

    const storage = getStorage();

    // firebaseのstorageに格納されている、videoをリストで取得して、sortし、useParamsのidと一致したvideoをsetCurrentVideoにセットする。
    useEffect(() => {
        const fetchVideos = async () => {
            setVideosLoading(true);
            const listRef = ref(storage, 'videos/');
            const res = await listAll(listRef);

            const videoPromises = res.items
                .filter(itemRef => itemRef.name.endsWith('.mp4'))
                .sort((a, b) => {
                    const numA = parseInt(a.name.match(/\d+/)[0], 10); // \d+は1文字以上の数字にマッチした値を取得。[0]は最初にマッチした数字列を取得。
                    const numB = parseInt(b.name.match(/\d+/)[0], 10); // parseIntでintにキャスト。 10は10進数を表している。
                    return numA - numB;
                })
                .map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef); //itemRefのダウンロードURLを取得。
                    return { name: itemRef.name, url };
                });

            const videoURLs = await Promise.all(videoPromises); // promiseは非同期処理。並列処理が完了するまで待機。非同期だからawaitを使っている。
            setVideos(videoURLs); //videoURLsには、name:itemRef.name　と　urlのリストが格納されている。

            const matchingVideo = videoURLs.find(v => v.name === `video${id}.mp4`); //nameとidを含んだnameが一致したら currentvideoにセットする
            setCurrentVideo(matchingVideo);
            setVideosLoading(false);
        };

        fetchVideos();
    }, [id]);

    // ページIDとドキュメントのIDフィールドが一致したらドキュメント内のtitleとdateを表示させる。 依存配列はidが変動したときなのでidを格納。
    useEffect(() => {
        const fetchMatchDocuments = async() => {
            const querySnapshot = await getDocs(collection(db, 'matches'));
            const matchDoc = querySnapshot.docs.find(doc => doc.data().id === parseInt(id)); //ドキュメントのIDとuseParamsのidが一致したらセットする
            if (matchDoc) {
                setMatchDocument(matchDoc.data());
            } else {
                console.log(`Document with id ${id} not found`);
            }
        }
        fetchMatchDocuments();
    }, [id]);


    // 関連動画をシャッフル表示
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    

    const shuffledVideos = shuffleArray([...relatedVideos]); // relatedVideosをコピーして新しい配列で処理
    const limitedRelatedVideos = shuffledVideos.slice(0, 16);

    return (
        /* サイトが開くまでの間(loading)と動画が開くまでの間(videoLoading)待機する */
        (loading || videosLoading) ? (
            <div className='standby-spinner'>
                <img src={spinner} alt="" />
            </div>
        ) : (
            <div className='video-page'>
                <Navbar />
                <div className='video-container'>
                    {currentVideo ? (
                        <video key={currentVideo?.url} controls>
                            <source src={currentVideo?.url} type='video/mp4' />
                            お使いのブラウザはvideoタグをサポートしていません
                        </video>
                    ) : (
                        <p>動画が見つかりません。</p>
                    )}
                </div>
                <div className='title-container'>
                    {matchDocument && (
                        <div>
                            <h1>{matchDocument.date}</h1>
                            <h1>{matchDocument.title}</h1>
                        </div>
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
                                    <Link to={`/video/${relatedVideo.value}`} style={{ cursor: 'pointer', color: 'white' }}>
                                        詳細を見る
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
};

export default VideoPage;
