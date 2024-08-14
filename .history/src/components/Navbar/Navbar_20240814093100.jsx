import React, { useState, useEffect } from 'react';
import './Navbar.css';
import soccer_logo from '../../assets/soccer_archive.png';
import search_icon from '../../assets/search_icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import algoliasearch from 'algoliasearch/lite'; 

// algolia情報
const ALGOLIA_APP_ID = process.env.VITE_REACT_APP_ALGOLIA_APP_ID;
const ALGOLIA_SEARCH_KEY = process.env.VITE_REACT_APP_ALGOLIA_SEARCH_KEY;
const ALGOLIA_INDEX_NAME = process.env.VITE_REACT_APP_ALGOLIA_INDEX_NAME;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);


const Navbar = ({ handlePremierLeagueClick, handleFacupClick, handleHomeClick, handleCommunityClick, handleLaligaClick, handleCopaDelReyClick, handleSupercopaClick}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // ページサイズによるnavbar表示形式変更
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
        
        handleResize(); 
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 遷移先に検索ワードを渡す処理
    const handleSearch = async() => {
        try {
            const { hits } = await index.search(searchTerm); // {hits} 分割代入
            navigate('/search-results-page', {state: {searchResults: hits, searchTerm: searchTerm}}); // /search-results-pageに値を投げる
            console.log('searchresults:', hits);
            console.log('value:',searchTerm);
        } catch (error) {
            console.error('検索エラー:', error);
        }
    }

    // Enterキーを押した際のイベント
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className={`navbar ${isScrolled ? 'hide' : ''}`}>
            <div className="navbar-left">
                <Link to='/' onClick={handleHomeClick}> 
                <img src={soccer_logo} alt="" className="logo"/>
                </Link>
                {/* isMobileがfalseの場合に右辺の()を処理する。 */}
                {!isMobile && ( 
                    <ul>
                        <li style={{ color: '#fff' }}>
                            <Link to="/" onClick={handleHomeClick} style={{color: '#fff', textDecoration: 'none'}}>ホーム</Link>
                        </li>
                        <li style={{ color: '#fff' }}>
                            <Link to="/premier-league-page" onClick={handlePremierLeagueClick} style={{color: '#fff', textDecoration: 'none'}}>プレミアリーグ</Link>
                        </li>
                        <li style={{ color: '#fff'}}>
                            <Link to='/laliga-page' onClick={handleLaligaClick} style={{color: '#fff', textDecoration: 'none'}}>ラリーガ</Link>
                        </li>
                        <li style={{ color: '#fff' }}>
                            <Link to="/fa-cup-page" onClick={handleFacupClick} style={{color: '#fff', textDecoration: 'none'}}>FAカップ</Link>
                        </li>
                        <li style={{ color: '#fff'}}>
                            <Link to="/copadelrey-page" onClick={handleCopaDelReyClick} style={{ color: '#fff', textDecoration: 'none'}}>コパ・デル・レイ</Link>
                        </li>
                        <li style={{ color: '#fff'}}>
                            <Link to="/Supercopa-page" onClick={handleSupercopaClick} style={{ color: '#fff', textDecoration: 'none'}}>スーペル・コパ</Link>
                        </li>
                        <li style={{ color: '#fff'}}>
                            <Link to="/community-shield-page" onClick={handleCommunityClick} style={{color: '#fff', textDecoration: 'none'}}>コミュニティシールド</Link>
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
    )
}

export default Navbar;
