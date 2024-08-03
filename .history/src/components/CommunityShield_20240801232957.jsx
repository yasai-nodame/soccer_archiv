import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const CommunityShield = ({matches, loading}) => {
    const {currentPage, setCurrentPage} = useState(0);
    const {itemPerPage, setItemsPerPage} = useState(9);
    const {totalPages, setTotalPages} = useState(0);
    const navigate = useNavigate();


  return (
    <div>
      
    </div>
  )
}

export default CommunityShield
