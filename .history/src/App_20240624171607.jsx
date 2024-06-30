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

const App = () => {
  const [matches_value, setMatches_value] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMatches = async() => {
      const storage = getStorage();
      const imageRef = ref(storage, process.env.VITE_REACT_APP_IMAGE);
      const imageUrl = await getDownloadURL(imageRef);


      const matchesCollectionRef = collection(db, 'matches');
      const querySnapshot = await getDocs(matchesCollectionRef);
      const matchesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        thumbnail: imageUrl
      }));
      setMatches_value(matchesData);
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home matches={matches_value}/>}/>
        <Route path='/video/:id' element={<VideoPage relatedVideos={matches_value}/>} />
        <Route path='/premier-league-page' element={<PremierLeague matches={matches_value}/>} />
        <Route path='/fa-cup-page' element={<FACup matches={matches_value}/>} />
      </Routes>
    </div>
  );
};

export default App

