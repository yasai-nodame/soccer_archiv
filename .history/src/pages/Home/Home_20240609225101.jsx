import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import soccer from '../../assets/soccer-ball.jpg'

const Home = () => {
    const matches = [
        {title: 'チェルシー×アーセナル', thumbnail: {soccer}}
    ]

    return (
    <div className='home'>
        <Navbar/>
        
    </div>
    )
}

export default Home
