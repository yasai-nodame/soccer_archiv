import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import VideoPage from './pages/VideoPage/VideoPage'
import PremierLeague from './components/PremierLeague'

const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/video/:id' element={<VideoPage/>} />
        <Route path='/premier-league-page' element={<PremierLeague/>} />
      </Routes>
    </div>
  )
}

export default App
