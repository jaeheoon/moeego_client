import React from "react";
import "../../css/articles/Paging.css";

const ProViewPaging = ({ pages, currentPage, onPageChange }) => {
    const pageGroupSize = 5; // 한 그룹에 표시할 페이지 수
    const startPage =
        Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, pages);

    // 페이지 변경 함수
    const handlePageClick = (page) => {
        if (page >= 1 && page <= pages) {
            onPageChange(page); // 부모 컴포넌트의 페이지 변경 함수 호출
        }
    };

    // 이전 그룹으로 이동
    const handlePrevGroup = () => {
        if (startPage > 1) {
            handlePageClick(startPage - 1); // 이전 그룹의 마지막 페이지로 이동
        }
    };

    // 다음 그룹으로 이동
    const handleNextGroup = () => {
        if (endPage < pages) {
            handlePageClick(endPage + 1); // 다음 그룹의 첫 페이지로 이동
        }
    };

    // 페이지 번호 렌더링
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`page-button ${
                        i === currentPage ? "active" : ""
                    }`}
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
            {/* 이전 그룹으로 이동 버튼 */}
            {startPage > 1 && (
                <button className="nav-button" onClick={handlePrevGroup}>
                    이전
                </button>
            )}

            {/* 페이지 번호 */}
            {renderPageNumbers()}

            {/* 다음 그룹으로 이동 버튼 */}
            {endPage < pages && (
                <button className="nav-button" onClick={handleNextGroup}>
                    다음
                </button>
            )}
        </div>
    );
};

export default ProViewPaging;
