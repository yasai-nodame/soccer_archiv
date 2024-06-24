import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import VideoPage from './pages/VideoPage/VideoPage'
import PremierLeague from './components/PremierLeague'
import soccer from './assets/soccer_ball.jpg'
import FACup from './components/FACup'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

const App = () => {
  const [matches_value, setMatches_value] = useState([]);

  useEffect(() => {
    const mathces_valueCollectionRef = collection(db, 'matches');
    getDocs(mathces_valueCollectionRef).then((querysnapshot) => {
      querysnapshot.docs.forEach((doc) => console.log(doc));
    })
  }, []);


  const matches = [
    {id:1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', matchday: '第1節', thumbnail: soccer},
    {id:2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', matchday: '第1節', thumbnail: soccer},
    {id:3, date: '2024-6-12', category: 'プレミアリーグ', title: 'マンC×エヴァートン', matchday: '第1節', thumbnail:soccer},
    {id:4, date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail:soccer},
    {id:5, date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンU', matchday: '第1節', thumbnail:soccer},
    {id:6, date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail:soccer},
    {id:7, date: '2024-6-14', category: 'プレミアリーグ', title:'ニューカッスル×クリスタル・パレス', matchday: '第1節', thumbnail:soccer},
    {id:8, date: '2024-6-14', category: 'プレミアリーグ', title:'ブライトン×ブレントフォード', matchday: '第1節', thumbnail:soccer},
    {id:9, date: '2024-6-14', category: 'プレミアリーグ', title:'ウエストハム×アストンヴィラ', matchday: '第1節', thumbnail:soccer},
    {id:10, date: '2024-6-15', category: 'プレミアリーグ', title:'アーセナル×ブレントフォード', matchday: '第2節', thumbnail:soccer},
    {id:11, date: '2024-6-15', category: 'プレミアリーグ', title:'ウルブス×エヴァートン', matchday: '第2節', thumbnail:soccer},
    {id:12, date: '2024-6-15', category: 'プレミアリーグ', title:'マンU×マンC', matchday: '第2節', thumbnail:soccer},
    {id:13, date: '2024-6-15', category: 'プレミアリーグ', title:'トッテナム×ルートンタウン', matchday: '第2節', thumbnail:soccer},
    {id:14, date: '2024-6-15', category: 'プレミアリーグ', title:'リヴァプール×ボーンマス', matchday: '第2節', thumbnail:soccer},
    {id:15, date: '2024-6-15', category: 'プレミアリーグ', title:'フラム×ノッティンガムフォレスト', matchday: '第2節', thumbnail:soccer},
    {id:16, date: '2024-6-15', category: 'プレミアリーグ', title:'バーンリー×チェルシー', matchday: '第2節', thumbnail:soccer},
    {id:17, date: '2024-6-15', category: 'プレミアリーグ', title:'ウエストハム×ニューカッスル', matchday: '第2節', thumbnail:soccer},
    {id:18, date: '2024-6-15', category: 'プレミアリーグ', title:'クリスタルパレス×アストンヴィラ', matchday: '第2節', thumbnail:soccer},
    {id:19, date: '2024-6-15', category: 'プレミアリーグ', title:'トッテナム×ルートンタウン', matchday: '第2節', thumbnail:soccer},
    {id:20, date: '2024-6-15', category: 'プレミアリーグ', title:'リヴァプール×ボーンマス', matchday: '第2節', thumbnail:soccer},
    {id:21, date: '2024-6-15', category: 'プレミアリーグ', title:'フラム×ノッティンガムフォレスト', matchday: '第2節', thumbnail:soccer},
    {id:22, date: '2024-6-15', category: 'プレミアリーグ', title:'バーンリー×チェルシー', matchday: '第2節', thumbnail:soccer},
    {id:23, date: '2024-6-15', category: 'プレミアリーグ', title:'ウエストハム×ニューカッスル', matchday: '第2節', thumbnail:soccer},
    {id:24, date: '2024-6-15', category: 'プレミアリーグ', title:'クリスタルパレス×アストンヴィラ', matchday: '第2節', thumbnail:soccer},
    {id:25, date: '2024-6-15', category: 'プレミアリーグ', title:'クリスタルパレス×アストンヴィラ', matchday: '第2節', thumbnail:soccer},
    {id:26, date: '2024-6-15', category: 'FAカップ', title:'ウエストハム×ニューカッスル', thumbnail:soccer},
    {id:27, date: '2024-6-15', category: 'FAカップ', title:'クリスタルパレス×アストンヴィラ', thumbnail:soccer},
    {id:28, date: '2024-6-15', category: 'FAカップ', title:'トッテナム×ルートンタウン', thumbnail:soccer},
    {id:29, date: '2024-6-15', category: 'FAカップ', title:'リヴァプール×ボーンマス', thumbnail:soccer},
    {id:30, date: '2024-6-15', category: 'FAカップ', title:'フラム×ノッティンガムフォレスト', thumbnail:soccer},
    {id:31, date: '2024-6-15', category: 'FAカップ', title:'バーンリー×チェルシー', thumbnail:soccer},
    {id:32, date: '2024-6-15', category: 'FAカップ', title:'ウエストハム×ニューカッスル', thumbnail:soccer},
    {id:33, date: '2024-6-15', category: 'FAカップ', title:'クリスタルパレス×アストンヴィラ', thumbnail:soccer},
    {id:34, date: '2024-6-15', category: 'FAカップ', title:'クリスタルパレス×アストンヴィラ', thumbnail:soccer},
    {id:35, date: '2024-6-15', category: 'プレミアリーグ', title:'クリスタルパレス×アストンヴィラ', thumbnail:soccer},
    {id:36, date: '2024-6-15', category: 'プレミアリーグ', title:'クリスタルパレス×アストンヴィラ', thumbnail:soccer},
    // 追加するときは、ここに追加
    // FAカップは　matchdayを定義しない。
];

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home matches={matches}/>}/>
        <Route path='/video/:id' element={<VideoPage relatedVideos={matches}/>} />
        <Route path='/premier-league-page' element={<PremierLeague matches={matches}/>} />
        <Route path='/fa-cup-page' element={<FACup matches={matches}/>} />
      </Routes>
    </div>
  );
};

export default App

