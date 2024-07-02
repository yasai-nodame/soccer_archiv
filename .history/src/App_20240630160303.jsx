import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import { Link, useHistory } from 'react-router-dom'; // Changed useNavigate to useHistory

const Navbar = ({ handlePremierLeagueClick, handleFacupClick, handleHomeClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const history = useHistory(); // Changed useNavigate to useHistory

    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        setIsScrolled(scrollTop > 50);
    };

    const handleResize = () => {
        const width = window.innerWidth;
        setIsMobile(width <= 768);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial resize check

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSearch = () => {
        history.push({
            pathname: '/search-results-page',
            state: { searchTerm } // Pass searchTerm via location state
        });
    };

    return (
        <div className={`navbar ${isScrolled ? 'hide' : ''}`}>
            <div className="navbar-left">
                <Link to='/' onClick={handleHomeClick}>
                    <img src={logo} alt="" className="logo"/>
                </Link>
                {!isMobile && (
                    <ul>
                        <li style={{ color: '#fff' }}>
                            <Link to="/" onClick={handleHomeClick} style={{ color: '#fff', textDecoration: 'none' }}>ホーム</Link>
                        </li>
                        <li style={{ color: '#fff' }}>
                            <Link to="/premier-league-page" onClick={handlePremierLeagueClick} style={{ color: '#fff', textDecoration: 'none' }}>プレミアリーグ</Link>
                        </li>
                        <li style={{ color: '#fff' }}>
                            <Link to="/fa-cup-page" onClick={handleFacupClick} style={{ color: '#fff', textDecoration: 'none' }}>FAカップ</Link>
                        </li>
                    </ul>
                )}
            </div>
            <div className="search-box">
                <input 
                    type="text" 
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img 
                    src={search_icon} 
                    alt=""
                    className='icons'
                    onClick={handleSearch}
                />
            </div>
        </div>
    );
};

export default Navbar;
