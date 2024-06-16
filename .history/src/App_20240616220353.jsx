import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import VideoPage from './pages/VideoPage/VideoPage'
import PremierLeague from './components/PremierLeague'
import soccer from './assets/soccer_ball.jpg'

const App = () => {

  const matches = [
    {id:1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', thumbnail: soccer},
    {id:2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', thumbnail: soccer},
    {id:3, date: '2024-6-12', category: 'プレミアリーグ', title: 'マンチェスターシティ×エヴァートン', thumbnail:soccer},
    {id:4, date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail:soccer},
    {id:5, date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンチェスターユナイテッド', thumbnail:soccer},
    {id:6, date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail:soccer},
    // 追加するときは、ここに追加
];
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home matches={matches}/>}/>
        <Route path='/video/:id' element={<VideoPage relatedVideos={matches}/>} />
        <Route path='/premier-league-page' element={<PremierLeague matches={matches}/>} />
      </Routes>
    </div>
  )
}

export default App
