import React, { useState, useEffect } from "react";
import apiAxios from '../../api/apiAxios';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Pro/ProServiceIntro.css';

const ProServiceIntro = () => {
    const [serviceName, setServiceName] = useState("");
    const [serviceContent, setServiceContent] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [prono, setProno] = useState(""); // proNo 상태
    const [subcateno, setSubcateno] = useState(""); // subCateNo 상태
    const [proItems, setProItems] = useState([]); // proItems 목록
    const [error, setError] = useState({ subject: '', content: '', price: '' });
    const maxLength = 50;
    const [userno] = useState(localStorage.getItem('userno') || '');

    const navigate = useNavigate();

    // 서버 데이터 초기화
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiAxios.get('/api/pro/item/init', { params: { memberNo: userno } });
                if (response.data.success) {
                    const { proNo, proItems } = response.data.data;
                    setProno(proNo || ""); // proNo가 없으면 빈 값 설정
                    setProItems(proItems || []); // proItems가 없으면 빈 배열 설정

                    // 첫 번째 카테고리 선택 및 값 초기화 (API 호출이 성공한 후에 설정)
                    if (proItems && proItems.length > 0) {
                        const defaultItem = proItems[0];
                        setSubcateno(defaultItem.subCategory?.subCateNo || "");
                        setServiceName(defaultItem.subject || "");
                        setServiceContent(defaultItem.content || "");
                        setServicePrice(defaultItem.price || "");
                    } else {
                        // proItems가 없으면 모든 값을 초기화
                        setSubcateno("");
                        setServiceName("");
                        setServiceContent("");
                        setServicePrice("");
                    }
                } else {
                    console.error("데이터 로딩 실패");
                    // 서버에서 반환된 데이터가 없을 경우 초기화
                    setSubcateno("");
                    setServiceName("");
                    setServiceContent("");
                    setServicePrice("");
                }
            } catch (error) {
                console.error("서버 오류:", error);
                // 오류 발생 시에도 초기값 설정
                setSubcateno("");
                setServiceName("");
                setServiceContent("");
                setServicePrice("");
            }
        };
        fetchData();
    }, [userno]);

    // 드롭다운 변경 시 선택된 값으로 데이터 초기화
    const handleSelectChange = (value) => {
        setSubcateno(value); // 선택된 subCateNo 업데이트

        // 선택된 카테고리에 맞는 값으로 상태를 업데이트
        const selectedItem = proItems.find(item => item.subCategory.subCateNo === parseInt(value));
        if (selectedItem) {
            setServiceName(selectedItem.subject || "");
            setServiceContent(selectedItem.content || "");
            setServicePrice(selectedItem.price || "");
        } else {
            // 선택된 카테고리가 없다면 빈값을 설정
            setServiceName("");
            setServiceContent("");
            setServicePrice("");
        }
    };

    // 드롭다운 toggle
    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    // 드롭다운 항목 클릭 시
    const handleOptionClick = (value) => {
        handleSelectChange(value);
        setDropdownOpen(false);
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);

    // 입력 핸들러
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setError((prev) => ({ ...prev, [id]: '' }));

        switch (id) {
            case "serviceName":
                if (value.length <= maxLength) setServiceName(value);
                break;
            case "serviceContent":
                if (value.length <= maxLength) setServiceContent(value);
                break;
            case "servicePrice":
                setServicePrice(value >= 0 ? value : "");
                break;
            default:
                break;
        }
    };

    // 등록 버튼 클릭 핸들러
    const handleSubmit = async () => {
        const requestData = {
            proNo: prono,
            subCateNo: subcateno,
            subject: serviceName,
            content: serviceContent,
            price: servicePrice
        };

        try {
            const response = await apiAxios.put('/api/pro/item', requestData);
            if (response.data.success) {
                setServiceName("");
                setServiceContent("");
                setServicePrice("");
                navigate('/mypage/account');
            } else {
                alert(response.data.message || "등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("서버 오류:", error);
            alert("서버 요청 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className='ServiceIntroPage'>
            <div className='ServiceIntroWrap'>
                <div className='PageTitle'>
                    <Link className="prev" to="/mypage/account">
                        <img src="/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>서비스 입력</h1>
                </div>
                {/* SubCateNo 커스텀 드롭다운 */}
                <div className='ServiceIntro'>
                    <label htmlFor="subCateNo">카테고리 선택</label>
                    <div className="custom-select">
                        <div className="selected-option" onClick={toggleDropdown}>
                            {proItems.find(item => item.subCategory.subCateNo === parseInt(subcateno))?.subCategory.subCateName || "카테고리 선택"}
                        </div>
                        {dropdownOpen && (
                            <ul className="options">
                                {proItems.map(item => (
                                    <li
                                        key={item.proItemNo}
                                        className="option"
                                        onClick={() => handleOptionClick(item.subCategory.subCateNo)}
                                    >
                                        {item.subCategory.subCateName}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* 서비스 이름 */}
                <div className='ServiceIntro'>
                    <label htmlFor="serviceName">서비스 이름</label>
                    <textarea
                        id="serviceName"
                        value={serviceName}
                        onChange={handleInputChange}
                        placeholder="서비스 이름을 입력하세요"
                        rows="4"
                    />
                    <div className='ServiceContentLength'>{serviceName.length} / {maxLength}</div>
                </div>

                {/* 서비스 내용 */}
                <div className='ServiceIntro'>
                    <label htmlFor="serviceContent">서비스 내용</label>
                    <textarea
                        id="serviceContent"
                        value={serviceContent}
                        onChange={handleInputChange}
                        placeholder="서비스 내용을 입력하세요"
                        rows="4"
                    />
                    <div className='ServiceContentLength'>{serviceContent.length} / {maxLength}</div>
                </div>

                {/* 서비스 가격 */}
                <div className='ServiceIntro'>
                    <label htmlFor="servicePrice">서비스 가격</label>
                    <input
                        id="servicePrice"
                        type="number"
                        value={servicePrice}
                        onChange={handleInputChange}
                        placeholder="서비스 가격을 입력하세요"
                        min="0"
                    />
                </div>

                {/* 버튼 */}
                <div className='ServiceIntroButtonWrap'>
                    <button onClick={() => { setServiceName(""); setServiceContent(""); setServicePrice(""); }}>초기화</button>
                    <button onClick={handleSubmit}>등록</button>
                </div>
            </div>
        </div >
    );
};

export default ProServiceIntro;
