import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import soccer_background from '../../../public/soccer_background.jpg'

const Home = () => {
    return (
    <div className='home'>
        <Navbar/>
        <div className='soccer-background'>
            <div className="content">
                <img src={soccer_background} alt="" className='banner-img'/>
            </div>
        </div>
    </div>
    )
}

export default Home
