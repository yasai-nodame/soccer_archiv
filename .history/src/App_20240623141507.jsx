import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import VideoPage from './pages/VideoPage/VideoPage'
import PremierLeague from './components/PremierLeague'
import soccer from './assets/soccer_ball.jpg'
import FACup from './components/FACup'
import { db } from './firebase'

const App = () => {
  const [matches_value, setMatches_value] = useState([]);

  useEffect(() => {
    const mathces_valueCollectionRef = collection(db, 'matches');
    console.log(mathces_valueCollectionRef);
  }, []);


export default App

