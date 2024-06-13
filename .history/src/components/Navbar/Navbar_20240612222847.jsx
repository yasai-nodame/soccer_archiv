import React, { useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'

const Navbar = () => {

    return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className={`navbar-left ${isScrolled ? 'hide' : ''}`}>
            <img src={logo} alt=""  className='logo'/>
            <ul>
                <li style={{color: '#fff'}}>ホーム</li>
                <li style={{color: '#fff'}}>プレミアリーグ</li>
                <li style={{color: '#fff'}}>FAカップ</li>
            </ul>
        </div>
        <div className={`search-box ${isScrolled ? 'hide' : ''}`}>
            <input type="text" placeholder="Search..."></input>
            <img src={search_icon} alt="" className='icons'/>
        </div>
    </div>
    )
}

export default Navbar
