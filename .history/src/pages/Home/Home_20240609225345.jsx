import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import soccer from '../../assets/soccer_ball.jpg'

const Home = () => {
    const matches = [
        {title: 'チェルシー×アーセナル', thumbnail: {soccer}}
        //追加するときは、ここに追加
    ]

    return (
    <div className='home'>
        <Navbar/>
        <div className='grid-container'>
            {matches.map((match, index)=>(
                <div key={index} className='grid-item'>
                    <img src={match.thumbnail} alt="" />
                    <h2>{match.title}</h2>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Home
