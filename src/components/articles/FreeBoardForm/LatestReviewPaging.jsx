import React from 'react';

const LatestReviewPaging = ({ currentPage, totalPages, onPageChange }) => {
    const pageGroupSize = 5; // 한 그룹에 표시할 페이지 수
    const normalizedCurrentPage = Math.max(currentPage, 1); // 음수 방지
    const pageGroup = Math.floor((normalizedCurrentPage - 1) / pageGroupSize);

    const startPage = Math.max(pageGroup * pageGroupSize + 1, 1); // 최소 1
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages || 1); // 최소 1 페이지

    // 페이지 클릭 처리
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    // 다음 그룹으로 이동
    const handleNextGroup = () => {
        if (endPage < totalPages) {
            handlePageClick(endPage + 1);
        }
    };

    // 이전 그룹으로 이동
    const handlePrevGroup = () => {
        if (startPage > 1) {
            handlePageClick(startPage - 1);
        }
    };

    // 페이지 번호 버튼 렌더링
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
            {/* 이전 그룹 버튼 */}
            {startPage > 1 && (
                <button className="nav-button" onClick={handlePrevGroup}>
                    이전
                </button>
            )}
            
            {/* 페이지 번호들 */}
            {renderPageNumbers()}

            {/* 다음 그룹 버튼 */}
            {endPage < totalPages && (
                <button className="nav-button" onClick={handleNextGroup}>
                    다음
                </button>
            )}
        </div>
    );
};

export default LatestReviewPaging;
