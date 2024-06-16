import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import VideoPage from './pages/VideoPage/VideoPage';
import PremierLeague from './components/PremierLeague/PremierLeague'; // パスは適宜変更してください

const dummyMatches = [
    {id:1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', thumbnail: soccer},
    {id:2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', thumbnail: soccer},
    {id:3, date: '2024-6-12', category: 'プレミアリーグ', title: 'マンチェスターシティ×エヴァートン', thumbnail:soccer},
    {id:4, date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail:soccer},
    {id:5, date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンチェスターユナイテッド', thumbnail:soccer},
    {id:6, date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail:soccer},
    // 追加するときは、ここに追加
];

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home matches={dummyMatches}/>}/>
                <Route path="/video/:id" element={<VideoPage/>} />
                <Route path="/premier-league-page" element={<PremierLeague matches={dummyMatches}/>} />
            </Routes>
        </div>
    );
}

export default App;
