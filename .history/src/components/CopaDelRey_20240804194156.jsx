import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CopaDelRey = ({ matches, loading }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0);
    };

    return (
        <div>
            
        </div>
    )
}

export default CopaDelRey
