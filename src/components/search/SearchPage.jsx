import React, { useEffect, useState } from "react";
import "../../css/search/Search.css";
import SearchProItem from "./SearchProItem";
import SearchArticleItem from "./SearchArticleItem";
import { useSearchParams } from "react-router-dom";
import apiAxios from "../../api/apiAxios";
import Loading from "../loading/loading";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get("value"); // 쿼리에서 검색어 추출

    // 상태 관리
    const [proResults, setProResults] = useState([]); // 전문가 검색 결과
    const [articleResults, setArticleResults] = useState([]); // 커뮤니티 검색 결과
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태
    const [proPagination, setProPagination] = useState({ currentPage: 0, totalPages: 0 });
    const [articlePagination, setArticlePagination] = useState({ currentPage: 0, totalPages: 0 });

    // 검색 요청
    useEffect(() => {
        if (searchValue) {
            setLoading(true);
            setError(null);
    
            apiAxios(`api/search/item?value=${searchValue}`)
                .then((response) => {
                    console.log("API 응답 데이터:", response.data.data.articleList);
    
                    const { proList = {}, articleList = {} } = response.data.data || {};
    
                    setProResults(proList?.content || []); // 데이터가 없으면 빈 배열
                    setArticleResults(articleList?.content || []);
                    setProPagination({
                        currentPage: proList?.currentPage || 0,
                        totalPages: proList?.totalPages || 0
                    });
                    setArticlePagination({
                        currentPage: articleList?.currentPage || 0,
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
    }, [searchValue]);
     // 검색어가 변경될 때마다 요청

    // 더보기 핸들러 (전문가 리스트)
    const handleLoadMorePro = () => {
        const nextPage = proPagination.currentPage + 1;

        if (nextPage < proPagination.totalPages) {
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

        if (nextPage < articlePagination.totalPages) {
            apiAxios(`api/search/item?value=${searchValue}&articlePage=${nextPage}`)
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
                    <h1>검색 결과: "{searchValue}"</h1>
                </div>

                {/* 전문가 리스트 */}
                <div className="searchProListHeader">
                    <h2>달인찾기</h2>
                </div>
                <div>
                    {proResults.length > 0 ? (
                        proResults.map((pro, index) => (
                            <SearchProItem key={index} data={pro} />
                        ))
                    ) : (
                        <p>검색된 전문가가 없습니다.</p>
                    )}
                </div>
                {proPagination.currentPage + 1 < proPagination.totalPages && (
                    <div className="searchBtnWrap">
                        <button onClick={handleLoadMorePro}>더보기</button>
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
                                <SearchArticleItem key={index} data={article} />
                            ))
                        ) : (
                            <p>검색된 커뮤니티 글이 없습니다.</p>
                        )}
                    </div>
                    {articlePagination.currentPage + 1 < articlePagination.totalPages && (
                        <div className="searchBtnWrap">
                            <button onClick={handleLoadMoreArticles}>더보기</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;