import React from "react";
import "../../css/articles/Paging.css"; // CSS 파일 경로 수정 필요

const MapPaging = ({ pages, currentPage, onPageChange }) => {
    const pageGroupSize = 5; // 한 그룹에 표시할 페이지 수

    const startPage = Math.floor((currentPage) / pageGroupSize) * pageGroupSize + 1;
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
        <div className="pagingWrap">
            {startPage > 1 && (
                <button
                    className="pagingPrevBtn"
                    onClick={handlePrevGroup}
                >
                    이전
                </button>
            )}
            <div className="pagingNumbers">{renderPageNumbers()}</div>
            {endPage < pages && (
                <button
                    className="pagingNextBtn"
                    onClick={handleNextGroup}
                >
                    다음
                </button>
            )}
        </div>
    );
};

export default MapPaging;
