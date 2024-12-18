import React from "react";
import "../../css/articles/Paging.css";

const ProSearchPaging = ({ pages, currentPage, onPageChange }) => {
    const pageGroupSize = 5; // 한 그룹에 표시할 페이지 수

    const startPage = Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, pages);

    const handlePageClick = (page) => {
        if (page >= 1 && page <= pages) {
            onPageChange(page); // 부모 컴포넌트에서 페이지 변경 처리
        }
    };

    const handlePrevGroup = () => {
        if (startPage > 1) {
            handlePageClick(startPage - 1);
        }
    };

    const handleNextGroup = () => {
        if (endPage < pages) {
            handlePageClick(endPage + 1);
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
            {endPage < pages && (
                <button className="nav-button" onClick={handleNextGroup}>
                    다음
                </button>
            )}
        </div>
    );
};

export default ProSearchPaging;
