import React, { useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'

const Navbar = () => {
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.display = 'none';
            } else {
                navbar.style.display = 'block';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
    <div className='navbar'>
        <div className="navbar-left">
            <img src={logo} alt="" />
            <ul>
                <li style={{color: '#fff'}}>ホーム</li>
                <li style={{color: '#fff'}}>プレミアリーグ</li>
                <li style={{color: '#fff'}}>FAカップ</li>
            </ul>
        </div>
        <div className="search-box">
            <input type="text" placeholder="Search..."></input>
            <img src={search_icon} alt="" className='icons'/>
        </div>
    </div>
    )
}

export default Navbar
