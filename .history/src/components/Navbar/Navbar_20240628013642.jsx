import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';


const Navbar = ({ handlePremierLeagueClick, handleFacupClick, handleHomeClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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

    const handleSearch = async() => {
        try {
            const searchTermLower = searchTerm.toLowerCase();

            const q = query(
                collection(db, 'matches'),
                where('title', '>=', searchTermLower),
                where('title', '<=', searchTermLower + '\uf8ff')
            );

            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map(doc => doc.data());

            setSearchResults(results);
            console.log('results:', results);
        } catch (error) {
            console.error('検索エラー:', error);
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className={`navbar ${isScrolled ? 'hide' : ''}`}>
            <div className="navbar-left">
                <Link to='/' onClick={handleHomeClick}> {/* navbarのロゴもhomeのトップページも戻れるようにする */}
                <img src={logo} alt="" className="logo"/>
                </Link>
                {!isMobile && (
                    <ul>
                        <li style={{ color: '#fff' }}>
                            <Link to="/" onClick={handleHomeClick} style={{color: '#fff', textDecoration: 'none'}}>ホーム</Link>
                        </li>
                        <li style={{ color: '#fff' }}>
                            <Link to="/premier-league-page" onClick={handlePremierLeagueClick} style={{color: '#fff', textDecoration: 'none'}}>プレミアリーグ</Link>
                        </li>
                        <li style={{ color: '#fff' }}>
                            <Link to="/fa-cup-page" onClick={handleFacupClick} style={{color: '#fff', textDecoration: 'none'}}>FAカップ</Link>
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
            {/* このdivタグのせいで、searchアイコンが左に寄せられた。 */}
            <div className="search-results">
                {searchResults.map((result, index) => (
                    <div key={index}>
                        <p>{result.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Navbar;
