import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import apiAxios from '../../api/apiAxios';
import "../../css/mypage/BookMarkPro.css";
import Loading from '../loading/loading';

const BookMarkPro = () => {
    const [favoritePro, setFavoritePro] = useState([]); // 즐겨찾기 프로필 데이터
    const [userno] = useState(localStorage.getItem("userno")); // 로컬 스토리지에서 userno 가져오기
    const [page, setPage] = useState(1); // 현재 페이지 번호
    const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [selectedPro, setSelectedPro] = useState([]); // 선택된 항목들
    const [allSelected, setAllSelected] = useState(false); // 전체선택 상태
    const observer = useRef();

    const lastProElementRef = useCallback(
        (node) => {
            if (loading || !hasMore) return; // 로딩 중이거나 더 이상 데이터가 없으면 반환
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1); // 페이지 증가
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    // 체크박스 상태 변경 처리
    const handleCheckboxChange = (proNo) => {
        setSelectedPro((prevSelected) =>
            prevSelected.includes(proNo)
                ? prevSelected.filter((id) => id !== proNo)
                : [...prevSelected, proNo]
        );
    };

    // 전체 선택/해제 처리
    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedPro([]);
        } else {
            setSelectedPro(favoritePro.map((pro) => pro.proNo));
        }
        setAllSelected(!allSelected);
    };

    const handleDeleteSelected = async () => {
        if (selectedPro.length === 0) {
            return;
        }
    
        try {
            const response = await apiAxios.delete('/api/pro/favorite', {
                data: {
                    memberNo: userno,
                    proNo: selectedPro, // 선택된 proNo들
                },
            });
    
            if (response.status === 200) {
                alert("선택한 항목이 삭제되었습니다."); // 성공 메시지
    
                // 상태 초기화
                setSelectedPro([]); // 선택된 항목 초기화
                setFavoritePro([]); // 기존 데이터를 초기화
                setPage(1); // 페이지 초기화
                setHasMore(true); // 데이터가 더 있다고 가정
                fetchFavoritePro(true); // 데이터를 새로 불러옴 (reset 플래그 전달)
            } else {
                console.log("항목 삭제에 실패했습니다."); // 기타 실패 처리
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("잘못된 요청입니다. 삭제 실패.");
            } else if (error.response && error.response.status === 500) {
                console.log("서버 오류가 발생했습니다.");
            } else {
                console.log("예기치 않은 오류가 발생했습니다.");
            }
        }
    };
    
    // 즐겨찾기 데이터를 로드
    const fetchFavoritePro = async (reset = false) => {
        if (loading) return;
    
        setLoading(true);
        try {
            const response = await apiAxios.get('/api/pro/favorite', {
                params: { memberNo: userno, pg: reset ? 1 : page },
            });
    
            if (response.data.success) {
                setFavoritePro((prev) =>
                    reset ? response.data.data.content : [...prev, ...response.data.data.content]
                );
                setHasMore(response.data.data.content.length > 0); // 데이터가 없으면 더 이상 데이터가 없다고 설정
            } else {
                setHasMore(false); // 데이터가 없으면 더 이상 데이터가 없다고 설정
            }
        } catch (error) {
            console.error("즐겨찾기 프로필 로드 실패:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // 페이지나 userno가 변경될 때 데이터 로드
    useEffect(() => {
        if (userno) {
            fetchFavoritePro(page === 1); // 페이지가 1이면 데이터 초기화, 그렇지 않으면 이어서 로드
        }
    }, [userno, page]);
    
    // 초기 로드 시 데이터를 가져옴
    useEffect(() => {
        if (userno) {
            setPage(1); // 페이지를 1로 설정 (초기화)
        }
    }, [userno]);

    return (
        <div className='BookMarkProContainer'>
            <div className='BookMarkProWrap'>
                <div className='PageTitle'>
                    <Link className="prev" to="/mypage">
                        <img src="/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>찜한 달인</h1>
                </div>
                {favoritePro.length > 0 ? (
                    <div className='CheckContainer'>
                        <div className='BoxContainer'>
                            <input
                                type="checkbox"
                                id="allChecked"
                                name="allChecked"
                                className='screen-reader'
                                checked={allSelected} // 전체 선택 체크 상태
                                onChange={handleSelectAll} // 전체 선택/해제
                            />
                            <div className='label-box'>
                                <span className='check-icon' aria-hidden="true"></span>
                                <label htmlFor='allChecked'>전체선택</label>
                            </div>
                        </div>
                        <div className='LinkContainer'>
                            <button onClick={handleDeleteSelected}>선택 항목 삭제</button>
                        </div>
                    </div>
                ) : (
                    <div className='CheckContainer'></div>
                )}
                {favoritePro.length > 0 ? (
                    favoritePro.map((pro, index) => (
                        <div
                            className="ProListContainer"
                            key={`${pro.proNo}-${index}`}
                            ref={favoritePro.length === index + 1 ? lastProElementRef : null} // 마지막 요소에 ref 추가
                        >
                            <div className='ProList'>
                                <div className='ProList-LeftContainer'>
                                    <div className='BoxContainer'>
                                        <input
                                            type="checkbox"
                                            id={`check${index}`}
                                            name={`check${index}`}
                                            className='screen-reader'
                                            checked={selectedPro.includes(pro.proNo)} // 해당 프로필 체크박스 상태
                                            onChange={() => handleCheckboxChange(pro.proNo)} // 체크박스 상태 변경
                                        />
                                        <div className='label-box'>
                                            <span className='check-icon' aria-hidden="true"></span>
                                            <label htmlFor={`check${index}`}><Link to={`/pro/proview?proNo=${pro.proNo}`}>{pro.name}</Link></label>
                                        </div>
                                    </div>
                                    <div className='infoContainer'>{pro.oneIntro}</div>
                                    <div className='scoreContainer'>평점: {pro.star}</div>
                                </div>
                                <div className='ProList-RightContainer'>
                                    <div className='ProProfile'>
                                        <img src={pro.profileImage || "/image/profile.svg"} alt={pro.name} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="ProListContainer">
                        <span style={{ color: "#828282", fontSize: "1rem" }}>찜한 달인 목록이 없습니다.</span>
                    </div>
                )}
                <div className='loadingWrap'>
                    {loading ? <Loading /> : ('')} {/* 로딩 상태 표시 */}
                </div>
            </div>
        </div>
    );
};

export default BookMarkPro;
