import React from "react";
import "../../css/articles/Paging.css";

const MyPaging = ({ totalItems, currentPage, itemsPerPage, onPageChange }) => {
    const pageGroupSize = itemsPerPage; // 한 그룹에 표시할 페이지 수
    const totalPages = totalItems;
    const normalizedCurrentPage = Math.max(currentPage, 1); // 음수 방지
    const pageGroup = Math.floor((normalizedCurrentPage - 1) / pageGroupSize);

    const startPage = Math.max(pageGroup * pageGroupSize + 1, 1); // 최소 1
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const handleNextGroup = () => {
        if (endPage < totalPages) {
            handlePageClick(endPage + 1);
        }
    };

    const handlePrevGroup = () => {
        if (startPage > 1) {
            handlePageClick(startPage - 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`page-button ${i === currentPage ? "active" : ""}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="pagination-container">
            {startPage > 1 && (
                <button className="nav-button" onClick={handlePrevGroup}>
                    이전
                </button>
            )}
            {renderPageNumbers()}
            {endPage < totalPages && (
                <button className="nav-button" onClick={handleNextGroup}>
                    다음
                </button>
            )}
        </div>
    );
};

export default MyPaging;