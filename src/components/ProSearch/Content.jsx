import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import apiAxios from "../../api/apiAxios";
import ProSearchPaging from "./ProSearchPaging";
import { ProContext } from "../../context/pro/ProContext";

const Content = () => {
    const { service, area, keyword } = useContext(ProContext);
    const [searchListItems, setSearchListItems] = useState([]);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const noneStyle = {
        marginTop: "2rem",
        borderTop: "1px solid #ccc",
        borderBottom: "1px solid #ccc",
        padding: "1rem",
        display: "flex",
        width: "95%",
        boxSizing: "borderBox",
    }

    const fetchItems = async (page = 1) => {
        setIsLoading(true);
        try {
            const params = {
                pg: page,
            };

            // 'service'가 있으면 params에 추가
            if (service !== "") {
                params.subCateNo = service;
            }

            // 'area'가 '지역' 또는 '전국'이 아니면 params에 추가
            if (area !== "지역" && area !== "전국") {
                params.location = area;
            }

            // 'keyword'가 있으면 params에 추가
            if (keyword) {
                params.value = keyword;
            }

            const response = await apiAxios.get("/api/pro/item", { params });

            const { content, totalPages } = response.data.data;
            setSearchListItems(content || []);
            setPages(totalPages);
            setCurrentPage(page);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems(1);
    }, [service, area, keyword]); // keyword도 의존성에 포함시킴

    return (
        <div className="ContentWrap">
            <section>
                <SearchBar
                    pages={pages}
                    currentPage={currentPage}
                    onPageChange={(page) => fetchItems(page)}
                    searchListItems={searchListItems} />
                {searchListItems.length > 0 ? (searchListItems.map((item) => (
                    <SearchList key={item.proNo} item={item} proNo={item.proNo} />
                ))) : (
                    <div style={noneStyle}>등록된 달인과 서비스가 없습니다.</div>
                )}
                <ProSearchPaging
                    pages={pages}
                    currentPage={currentPage}
                    onPageChange={(page) => fetchItems(page)}
                />
            </section>
        </div>
    );
};

export default Content;