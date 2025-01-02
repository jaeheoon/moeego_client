import React from "react";
import "../../css/articles/Paging.css";

const MapPaging = ({ totalPages, currentPage, onPageChange }) => {
    const pageGroupSize = 5; // 한 그룹에 표시할 페이지 수

    // 현재 그룹의 첫 페이지와 마지막 페이지 계산
    const startPage = Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

    // 페이지 변경 처리 함수
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page); // 부모 컴포넌트에서 페이지 변경 처리
        }
    };

    // 이전 그룹으로 이동
    const handlePrevGroup = () => {
        const prevPage = startPage - 1;
        if (prevPage >= 1) {
            handlePageClick(prevPage);
        }
    };

    // 다음 그룹으로 이동
    const handleNextGroup = () => {
        const nextPage = endPage + 1;
        if (nextPage <= totalPages) {
            handlePageClick(nextPage);
        }
    };

    // 현재 그룹의 페이지 번호 렌더링
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

export default MapPaging;
