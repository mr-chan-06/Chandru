import React from 'react';

const Pagination = ({ page, setPage }) => {
    return (
        <div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <button onClick={() => setPage(page + 1)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
