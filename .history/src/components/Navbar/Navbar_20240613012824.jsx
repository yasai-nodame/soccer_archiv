import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';

const Navbar = () => {
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
        
        // resizeの初期時に実行
        handleResize(); 
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`navbar ${isScrolled ? 'hide' : ''}`}>
            <div className="navbar-left">
                <img src={logo} alt="" className="logo"/>
                {!isMobile && (
                    <ul>
                        <li style={{ color: '#fff' }}>ホーム</li>
                        <li style={{ color: '#fff' }}>プレミアリーグ</li>
                        <li style={{ color: '#fff' }}>FAカップ</li>
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
