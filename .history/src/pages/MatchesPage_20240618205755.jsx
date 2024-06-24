import React from 'react';
import ReactPaginate from 'react-paginate';

const MatchesPage = ({ matches, onPageChange }) => {
    const pageCount = Math.ceil(matches.length / 9);

    const handlePageChange = (selectedItem) => {
        onPageChange(selectedItem.selected);
    };

    return (
        <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName='pagination'
            activeClassName='active'
            previousLabel={'←'}
            nextLabel={'→'}
        />
    );
};

export default MatchesPage;
