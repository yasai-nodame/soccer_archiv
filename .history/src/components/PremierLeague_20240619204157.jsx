import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './PremierLeague.css'
import MatchesPage from '../pages/MatchesPage';

const PremierLeague = ({ matches }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);

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

        window.addEventListener('resize', updateItemsPerPage);
        updateItemsPerPage();

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    // 現在のページに表示するデータを取得
    const offset = currentPage * itemsPerPage;
    const currentMatches = matches.slice(offset, offset + itemsPerPage);

    return (
        <div className='home'>
            <Navbar />
            <div className='content'>
                <div className='grid-container'>
                    {currentMatches.length > 0 ? currentMatches.map((match) => (
                        <Link key={match.id} to={`/video/${match.id}`} className='grid-item' data-date={match.date}>
                            <img src={match.thumbnail} alt='' />
                            <h3>{match.category}</h3>
                            <h2>{match.title}</h2>
                        </Link>
                    )) : <p>表示する試合がありません</p>}
                </div>
            </div>
            <div className='pagination-container'>
                <MatchesPage matches={matches} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default PremierLeague;