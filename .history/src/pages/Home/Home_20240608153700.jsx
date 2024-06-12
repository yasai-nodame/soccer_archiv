import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import soccer_background from '../../../public/soccer_background.jpg'

const Home = () => {
    return (
    <div className='home'>
        <div className='soccer-background'>
            <img src={soccer_background} alt="" className='banner-img'/>
        </div> {/* 背景画像のdiv */}
        <div className="overlay"></div> {/* オーバーレイのdiv */}
        <Navbar/>
    </div>
    )
}

export default Home
