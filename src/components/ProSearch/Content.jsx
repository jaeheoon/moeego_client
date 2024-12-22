import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import apiAxios from "../../api/apiAxios";
import ProSearchPaging from "./ProSearchPaging";

const Content = () => {
    const [searchListItems, setSearchListItems] = useState([]);
    const [pages, setPages] = useState(1); // 전체 페이지 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [isLoading, setIsLoading] = useState(false);

    const [service, setService] = useState("서비스");
    const [area, setArea] = useState("지역");
    const [keyword, setKeyword] = useState("");

    // 데이터를 가져오는 함수
    const fetchItems = async (page = 1) => {
        setIsLoading(true);
        try {
            const response = await apiAxios.get("/api/pro/item", {
                params: {
                    subCateNo: service !== "서비스" ? service : undefined,
                    location: area !== "지역" ? area : undefined,
                    keyword: keyword || undefined,
                    pg: page,
                },
            });
            const { content, totalPages, currentPage } = response.data.data;
            setSearchListItems(content || []);
            setPages(totalPages);
            setCurrentPage(currentPage + 1); // 페이지 번호 조정 (1부터 시작)
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleServiceAreaChange = (selectedService, selectedArea) => {
        setService(selectedService);
        setArea(selectedArea);
    };

    const handleSearch = (searchKeyword) => {
        setKeyword(searchKeyword);
    };

    useEffect(() => {
        fetchItems(1);
    }, [service, area, keyword]); // service, area, keyword 값이 변경되면 API 호출

    const handlePageChange = (page) => {
        fetchItems(page);
    };

    return (
        <div className="ContentWrap">
            <section>
                <SearchBar onSearch={handleSearch} />
                {searchListItems.map((item) => (
                    <SearchList
                        key={item.proNo}
                        item={item}
                        proNo={item.proNo}
                    />
                ))}
                <ProSearchPaging
                    pages={pages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </section>
        </div>
    );
};

export default Content;
