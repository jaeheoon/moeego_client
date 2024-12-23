import React, { useEffect, useState } from "react";
import "../../css/search/Search.css";
import SearchProItem from "./SearchProItem";
import SearchArticleItem from "./SearchArticleItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiAxios from "../../api/apiAxios";
import Loading from "../loading/loading";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get("value"); // 쿼리에서 검색어 추출
    const navigate = useNavigate();
    // 상태 관리
    const [proResults, setProResults] = useState([]); // 전문가 검색 결과
    const [articleResults, setArticleResults] = useState([]); // 커뮤니티 검색 결과
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태
    const [proPagination, setProPagination] = useState({ currentPage: 0, totalPages: 0 });
    const [articlePagination, setArticlePagination] = useState({ currentPage: 0, totalPages: 0 });

    // 로컬 스토리지에 저장된 조회수 기록
    const getViewedArticles = () => JSON.parse(localStorage.getItem('viewedArticles')) || {};
    const setViewedArticles = (articles) => localStorage.setItem('viewedArticles', JSON.stringify(articles));

    // 게시글 조회수 업데이트
    const updateArticleViewCount = (articleNo) => {
        const viewedArticles = getViewedArticles();
        const currentTime = Date.now();
    
        // 이미 24시간 이내에 조회한 게시글이면 조회수 업데이트 안 함
        if (viewedArticles[articleNo] && currentTime - viewedArticles[articleNo] < 24 * 60 * 60 * 1000) {
            // 24시간 이내라면 조회수 업데이트 하지 않고 그냥 넘어감
            navigate(`/article/viewpage?article_no=${articleNo}`);
            return;
        }
    
        // 서버에 조회수 업데이트 요청 (API 호출)
        apiAxios.put(`/api/article/hit?articleNo=${articleNo}`)
            .then(() => {
                viewedArticles[articleNo] = currentTime;
                setViewedArticles(viewedArticles);
            })
            .catch((error) => {
                console.error("조회수 증가 중 오류 발생:", error);
            })
            .finally(() => {
                // 조회수 업데이트와 관계없이 글 상세 페이지로 이동
                navigate(`/article/viewpage?article_no=${articleNo}`);
            });
    };    

    // 검색 요청
    useEffect(() => {
        if (searchValue) {
            setLoading(true);
            setError(null);

            apiAxios(`api/search/item?value=${searchValue}`)
                .then((response) => {
                    const { proList = {}, articleList = {} } = response.data.data || {};

                    setProResults(proList?.content || []); // 데이터가 없으면 빈 배열
                    setArticleResults(articleList?.content || []);
                    setProPagination({
                        currentPage: proList?.currentPage || 1,
                        totalPages: proList?.totalPages || 0
                    });
                    setArticlePagination({
                        currentPage: articleList?.currentPage || 1,
                        totalPages: articleList?.totalPages || 0
                    });
                })
                .catch((error) => {
                    console.error("검색 중 오류 발생:", error);
                    setError("검색 결과를 가져오는 중 문제가 발생했습니다. 다시 시도해주세요.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [searchValue]); // 검색어가 변경될 때마다 요청

    // 더보기 핸들러 (전문가 리스트)
    const handleLoadMorePro = () => {
        const nextPage = proPagination.currentPage + 1;
        if (nextPage <= proPagination.totalPages) {
            apiAxios(`api/search/item?value=${searchValue}&pg=${nextPage}`)
                .then((response) => {
                    setProResults((prev) => [...prev, ...response.data.data.proList.content]);
                    setProPagination((prev) => ({ ...prev, currentPage: nextPage }));
                })
                .catch((error) => {
                    console.error("전문가 더보기 중 오류 발생:", error);
                    setError("전문가 데이터를 불러오는 중 문제가 발생했습니다.");
                });
        }
    };

    // 더보기 핸들러 (커뮤니티 리스트)
    const handleLoadMoreArticles = () => {
        const nextPage = articlePagination.currentPage + 1;

        if (nextPage <= articlePagination.totalPages) {
            apiAxios(`api/search/item?value=${searchValue}&pg=${nextPage}`)
                .then((response) => {
                    setArticleResults((prev) => [...prev, ...response.data.data.articleList.content]);
                    setArticlePagination((prev) => ({ ...prev, currentPage: nextPage }));
                })
                .catch((error) => {
                    console.error("커뮤니티 더보기 중 오류 발생:", error);
                    setError("커뮤니티 데이터를 불러오는 중 문제가 발생했습니다.");
                });
        }
    };

    // 게시글 클릭 시 조회수 증가
    const handleArticleClick = (articleNo) => {
        updateArticleViewCount(articleNo);
    };

    if (loading) {
        return <div><Loading /></div>; // 로딩 상태 표시
    }

    if (error) {
        return <div>{error}</div>; // 에러 메시지 표시
    }

    return (
        <div className="searchPage">
            <div className="searchPageWrap">
                <div className="searchPageHeader">
                    <h1>검색 결과</h1>
                </div>

                {/* 전문가 리스트 */}
                <div className="searchProListHeader">
                    <h2>달인찾기</h2>
                </div>
                <div>
                    {proResults.length > 0 ? (
                        proResults.map((pro, index) => (
                            <SearchProItem key={index} item={pro} />
                        ))
                    ) : (
                        <p>검색된 전문가가 없습니다.</p>
                    )}
                </div>
                {proPagination.currentPage + 1 <= proPagination.totalPages && (
                    <div className="searchBtnWrap">
                        <button onClick={handleLoadMorePro}>더보기<img src="/image/down.svg"/></button>
                    </div>
                )}

                {/* 커뮤니티 리스트 */}
                <div className="articleListWrap">
                    <div className="articleListHeader">
                        <h2>커뮤니티</h2>
                    </div>
                    <div className="articleListContent">
                        {articleResults.length > 0 ? (
                            articleResults.map((article, index) => (
                                <div key={index} onClick={() => handleArticleClick(article.articleNo)}>
                                    <SearchArticleItem item={article} />
                                </div>
                            ))
                        ) : (
                            <p>검색된 커뮤니티 글이 없습니다.</p>
                        )}
                    </div>
                    {articlePagination.currentPage + 1 <= articlePagination.totalPages && (
                        <div className="articleSearchBtnWrap">
                            <button onClick={handleLoadMoreArticles}>더보기<img src="/image/down.svg"/></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;