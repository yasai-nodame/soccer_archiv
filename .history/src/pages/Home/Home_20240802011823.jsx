import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import MatchesPage from '../MatchesPage';
import { Link, useNavigate } from 'react-router-dom';
import spinner from '../../assets/spinner.gif';

const Home = ({ matches, loading }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    // 最新5件取得
    const latestMatches = [...matches]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    // ページが変更されたときのハンドラー
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth < 600) {
                setItemsPerPage(6);
            } else if (window.innerWidth < 1415) {
                setItemsPerPage(8);
            } else {
                setItemsPerPage(9);
            }
        };

        const updateTotalPages = () => {
            setTotalPages(Math.ceil(matches.length / itemsPerPage));
        };

        window.addEventListener('resize', updateItemsPerPage);
        updateItemsPerPage();
        updateTotalPages();

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, [matches.length, itemsPerPage]);

    // 現在のページに表示するデータを取得
    const offset = currentPage * itemsPerPage; 
    const currentMatches = matches.slice(offset, offset + itemsPerPage);

    const handleHomeClick = () => {
        setCurrentPage(0);
        navigate('/');
    }

    return (
        loading?<div className='standby-spinner'>
            <img src={spinner} alt="" />
        </div>:
        <div className='home'>
            <Navbar handleHomeClick={handleHomeClick}/>
            <div className='content'>
                <div className='grid-container'>
                    {currentMatches.map((match) => (
                        <Link key={match.id} to={`/video/${match.id}`} className='grid-item' data-date={match.date}>
                            <img src={match.thumbnail} alt='' />
                            <h3>{match.category}</h3>
                            <h2>{match.title}</h2>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='related-videos'>
                <h2>新着動画</h2>
                <div className='video-list'>
                    {latestMatches.map((match, index) => (
                        <div key={index} className='video-item'>
                            <img src={match.thumbnail} alt='' />
                            <div className='video-info'>
                                <p>{`${match.date} ${match.category}`}</p>
                                <h3>{match.title}</h3>
                                <Link to={`/video/${match.id}`} style={{ cursor: 'pointer', color: 'white' }}>
                                    詳細を見る
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='pagination-container'>
                {/* forcePageに指定する値はpageCountと同等かpageCount - 1の範囲内である必要がある。だからcurrentPageにtotalPages - 1の値を代入する。*/}
            <MatchesPage pageCount={totalPages} onPageChange={handlePageChange} forcePage={currentPage >= totalPages ? totalPages -1 : currentPage}/>
            </div>
        </div>
    );
};

export default Home;

