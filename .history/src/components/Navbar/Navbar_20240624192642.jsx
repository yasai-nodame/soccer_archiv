// Navbar.jsx

import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import { Link } from 'react-router-dom';

const Navbar = ({ handlePremierLeagueClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setIsScrolled(scrollTop > 50);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        handleResize(); // 初期設定

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`navbar ${isScrolled ? 'hide' : ''}`}>
            <div className="navbar-left">
                <Link to='/'>
                    <img src={logo} alt="" className="logo"/>
                </Link>
                {!isMobile && (
                    <ul>
                        <li style={{ color: '#fff' }}>
                            <Link to="/" style={{color: '#fff', textDecoration: 'none'}}>ホーム</Link>
                        </li>
                        <li style={{ color: '#fff' }}>
                            <Link to="/premier-league-page" onClick={handlePremierLeagueClick} style={{color: '#fff', textDecoration: 'none'}}>プレミアリーグ</Link>
                        </li>
                        <li style={{ color: '#fff' }}>
                            <Link to="/fa-cup-page" style={{color: '#fff', textDecoration: 'none'}}>FAカップ</Link>
                        </li>
                    </ul>
                )}
            </div>
            <div className="search-box">
                <input type="text" placeholder="Search..."></input>
                <img src={search_icon} alt="" className='icons' />
            </div>
        </div>
    );
}

export default Navbar;
