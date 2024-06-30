import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import { Link } from 'react-router-dom';


const Navbar = ({ handlePremierLeagueClick, handleFacupPage, handleHomeClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 768) { 
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        // resizeの初期時のみ実行 resize初期値を取得
        handleResize(); 
        
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
                            <Link to="/fa-cup-page" onClick={handleFacupPage} style={{color: '#fff', textDecoration: 'none'}}>FAカップ</Link>
                        </li>
                    </ul>
                )}
            </div>
            <div className="search-box">
                <input type="text" placeholder="Search..."></input>
                <img src={search_icon} alt="" className='icons' />
            </div>
        </div>
    )
}

export default Navbar;
