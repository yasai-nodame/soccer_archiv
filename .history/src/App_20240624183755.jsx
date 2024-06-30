import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import VideoPage from './pages/VideoPage/VideoPage'
import PremierLeague from './components/PremierLeague'
import soccer from './assets/soccer_ball.jpg'
import FACup from './components/FACup'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'
import { getAuth, signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth/web-extension'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'


const initialMatches = [
  {id:1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', matchday: '第1節', thumbnail: soccer},
  {id:2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', matchday: '第1節', thumbnail: soccer},
  {id:3, date: '2024-6-12', category: 'プレミアリーグ', title: 'マンC×エヴァートン', matchday: '第1節', thumbnail:soccer},
  {id:4, date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム', thumbnail:soccer},
  {id:5, date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンU', matchday: '第1節', thumbnail:soccer},
  {id:6, date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト', thumbnail:soccer},
  {id:7, date: '2024-6-14', category: 'プレミアリーグ', title:'ニューカッスル×クリスタル・パレス', matchday: '第1節', thumbnail:soccer},
  {id:8, date: '2024-6-14', category: 'プレミアリーグ', title:'ブライトン×ブレントフォード', matchday: '第1節', thumbnail:soccer},
  {id:9, date: '2024-6-14', category: 'プレミアリーグ', title:'ウエストハム×アストンヴィラ', matchday: '第1節', thumbnail:soccer},
];

const App = () => {
  const [matches_value, setMatches_value] = useState(initialMatches);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMatches = async() => {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, process.env.VITE_REACT_APP_IMAGE);
        const imageUrl = await getDownloadURL(imageRef);


        const matchesCollectionRef = collection(db, 'matches');
        const querySnapshot = await getDocs(matchesCollectionRef);
        const matchesData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          thumbnail: imageUrl
      })).sort((a, b) => a.id - b.id);
      setMatches_value(matchesData);
      } catch (error) {
        console.error("Error fetcing matches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home matches={matches_value} loading={loading}/>}/>
        <Route path='/video/:id' element={<VideoPage relatedVideos={matches_value}/>} />
        <Route path='/premier-league-page' element={<PremierLeague matches={matches_value}/>} />
        <Route path='/fa-cup-page' element={<FACup matches={matches_value}/>} />
      </Routes>
    </div>
  );
};

export default App

