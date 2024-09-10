import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import VideoPage from './pages/VideoPage/VideoPage'
import PremierLeague from './components/PremierLeague'
import soccer from './assets/soccer_ball.jpg'
import FACup from './components/FACup'
import Laliga from './components/Laliga'
import { db, storage } from './firebase'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { collection, getDocs } from 'firebase/firestore'
import SearchResults from './components/SearchResults'
import CommunityShield from './components/CommunityShield'
import CopaDelRey from './components/CopaDelRey'
import Supercopa from './components/Supercopa'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'fffffff

const App = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [matches_value, setMatches_value] = useState([]);
  const [loading, setLoading] = useState(true);


  // firebase authenicationを使って、ログインし、firebase storageから画像を取得して、firestoreからデータを取得できるようにした。
  // 初回レンダリング時にユーザー権限で拒否され、表示されなかったのを解決。
  const auth = getAuth(); // firebaseのauthenicationのインスタンスを取得
  const storage = getStorage(); // firebase storageのインスタンス取得


  // firebaseの認証により、初回レンダリング時に表示できるようになった。
  useEffect(() => {
    const authenticateAndFetchData = async () => {
      try {
        // Firebase Authentication によるログイン
        await signInWithEmailAndPassword(auth, 'yasainiwaka@gmail.com', 'danngomaru02');

        // ストレージから画像を取得
        const storageRef = ref(storage, 'soccer_ball.jpg');
        const url = await getDownloadURL(storageRef);
        setImageSrc(url);

        // Firestore からデータを取得
        const matchesCollectionRef = collection(db, 'matches');
        const querySnapshot = await getDocs(matchesCollectionRef);
        const matchesData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          thumbnail: url // 取得した画像URLをサムネイルとして設定
        })).sort((a, b) => a.id - b.id); 
        setMatches_value(matchesData);
      } catch (error) {
        console.error('Error:', error);
      } finally { 
        setLoading(false);
      }
    };

    authenticateAndFetchData();
  }, []); // 空の依存配列で初回レンダリング時にのみ実行

  useEffect(() => {
    if (!imageSrc) return; // imageSrc がまだ設定されていない場合は fetchMatches を実行しない

    const fetchMatches = async () => {
      try {
        const matchesCollectionRef = collection(db, 'matches');
        const querySnapshot = await getDocs(matchesCollectionRef);
        const matchesData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          thumbnail: imageSrc 
        })).sort((a, b) => a.id - b.id); 
        setMatches_value(matchesData);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally { 
        setLoading(false);
      }
    };

    fetchMatches();
  }, [imageSrc]); // imageSrc が変更されたときにのみ実行される

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home matches={matches_value} loading={loading}/>}/>
        <Route path='/video/:id' element={<VideoPage relatedVideos={matches_value} loading={loading}/>} />
        <Route path='/premier-league-page' element={<PremierLeague matches={matches_value} loading={loading} />} />
        <Route path='/laliga-page' element={<Laliga matches={matches_value} loading={loading} />} />
        <Route path='/fa-cup-page' element={<FACup matches={matches_value} loading={loading}/>} />
        <Route path='/copadelrey-page' element={<CopaDelRey matches={matches_value} loading={loading} />} />
        <Route path='/supercopa-page' element={<Supercopa matches={matches_value} loading={loading} />} />
        <Route path='/community-shield-page' element={<CommunityShield matches={matches_value} loading={loading}/>} />
        <Route path='/search-results-page' element={<SearchResults/>} />
      </Routes>
    </div>
  );
};

export default App;
