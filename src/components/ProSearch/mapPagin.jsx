import React from "react";

const mapPaging = ({ pages, currentPage, onPageChange }) => {
    const handlePageClick = (page) => {
        onPageChange(page);
    };

    const pageNumbers = [...Array(pages).keys()].map((i) => i + 1);

    return (
        <div className="pagingWrap">
            <button
                className="pagingPrevBtn"
                disabled={currentPage === 1}
                onClick={() => handlePageClick(currentPage - 1)}
            >
                {"<"}
            </button>
            <ul className="pagingNumbers">
                {pageNumbers.map((page) => (
                    <li
                        key={page}
                        className={currentPage === page ? "active" : ""}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </li>
                ))}
            </ul>
            <button
                className="pagingNextBtn"
                disabled={currentPage === pages}
                onClick={() => handlePageClick(currentPage + 1)}
            >
                {">"}
            </button>
        </div>
    );
};

export default mapPaging;
