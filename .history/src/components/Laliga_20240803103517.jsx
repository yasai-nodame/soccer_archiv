import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Laliga = ({ matches, loading }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollY(0, 0);
    };

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth < 600)  {
                setItemsPerPage(6);
            } else if (window.innerWidth < 1415) {
                setItemsPerPage(8);
            } else {
                setItemsPerPage(9);
            }
        };

        const fillterdMatches = matches.filter(match => match.category === 'ラリーガ');
        setTotalPages(Math.ceil(fillterdMatches.length / itemsPerPage));

        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, [matches, itemsPerPage]);

    const fillterdMatches = matches.filter(match => match.category === 'ラリーガ');
    const offset = currentPage * itemsPerPage;
    const currentMatches = fillterdMatches.slice(offset, offset + itemsPerPage);

    const handleLaligaClick = () => {
        setCurrentPage(0);
        navigate('/laliga-page');
    }

    return (
        <div>
            
        </div>
    )
}

export default Laliga
