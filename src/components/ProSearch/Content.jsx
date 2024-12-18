import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import apiAxios from '../../api/apiAxios';
import ProSearchPaging from './ProSearchPaging';

const Content = () => {
    const [searchListItems, setSearchListItems] = useState([]);
    const [pages, setPages] = useState(1); // 전체 페이지 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [isLoading, setIsLoading] = useState(false);

    // 데이터를 가져오는 함수
    const fetchItems = async (page) => {
        setIsLoading(true);
        try {
            const response = await apiAxios.get(`/api/pro/item?pg=${page}`);
            const { content, totalPages, currentPage } = response.data.data;
            setSearchListItems(content); // 전문가 리스트 저장
            setPages(totalPages); // 전체 페이지 수 저장
            setCurrentPage(currentPage + 1); // 0-based -> 1-based 변환
        } catch (error) {
            console.error("Error fetching items:", error); // 에러 로그 출력
        } finally {
            setIsLoading(false); // 로딩 상태 해제
        }
    };

    useEffect(() => {
        fetchItems(1); // 컴포넌트 처음 렌더링 시 1페이지 데이터 가져옴
    }, []);

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        fetchItems(page); // 해당 페이지 데이터 가져오기
    };

    return (
        <div className='ContentWrap'>
            <section>
                <SearchBar />
                {searchListItems.map(item => (
                    <SearchList key={item.proNo} item={item} />
                ))}
                {/* Paging 컴포넌트를 삽입 */}
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
