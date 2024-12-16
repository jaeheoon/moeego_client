import React, { useContext } from "react";
import { ArticleContext } from "../../context/article/ArticleContext";
import "../../css/articles/Paging.css";
const Paging = ({ categoryId }) => {
    const { pages, articleCurrentPage, changePage } = useContext(ArticleContext);
    
    const pageGroupSize = 5; // 한 그룹에 표시할 페이지 수
    const normalizedCurrentPage = Math.max(articleCurrentPage, 1); // 음수 방지
    const pageGroup = Math.floor((normalizedCurrentPage - 1) / pageGroupSize);

    const startPage = Math.max(pageGroup * pageGroupSize + 1, 1); // 최소 1
    const endPage = Math.min(startPage + pageGroupSize - 1, pages || 1); // 최소 1 페이지

    const handlePageClick = (page) => {
        if (page >= 1 && page <= pages) {
            // 카테고리가 있으면 해당 카테고리로 페이지 변경, 없으면 전체 게시글
            changePage(page, categoryId);
        }
    };    

    const handleNextGroup = () => {
        if (endPage < pages) {
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
                    className={`page-button ${i === articleCurrentPage ? "active" : ""}`}
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

export default Paging;