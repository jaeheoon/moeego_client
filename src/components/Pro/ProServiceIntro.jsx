import React, { useState, useEffect } from "react";
import '../../css/Pro/ProServiceIntro.css';
import apiAxios from '../../api/apiAxios';
import { useNavigate } from 'react-router-dom';

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
                    setProno(proNo || "");  // API 응답으로 받은 proNo 값을 setProno로 설정
                    setProItems(proItems || []); // proItems 전체 목록 저장

                    // 첫 번째 카테고리 선택 및 값 초기화 (API 호출이 성공한 후에 설정)
                    if (proItems.length > 0) {
                        const defaultItem = proItems[0];
                        setSubcateno(defaultItem.subCategory?.subCateNo || "");
                        setServiceName(defaultItem.subject || "");
                        setServiceContent(defaultItem.content || "");
                        setServicePrice(defaultItem.price || "");
                    }
                } else {
                    console.error("데이터 로딩 실패");
                }
            } catch (error) {
                console.error("서버 오류:", error);
            }
        };
        fetchData();
    }, [userno]);  // userno 값이 변경될 때마다 데이터를 다시 불러옴

    // 드롭다운 변경 시 선택된 값으로 데이터 초기화
    const handleSelectChange = (e) => {
        const newSubCateNo = e.target.value;
        setSubcateno(newSubCateNo); // 선택된 subCateNo 업데이트

        // 선택된 카테고리에 맞는 값으로 상태를 업데이트
        const selectedItem = proItems.find(item => item.subCategory.subCateNo === parseInt(newSubCateNo)); // subCateNo를 정수로 비교
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
        // 서버에 전달할 객체
        const requestData = {
            proNo: prono,
            subCateNo: subcateno,
            subject: serviceName,
            content: serviceContent,
            price: servicePrice
        };

        try {
            // API 요청
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
            <h2>서비스 입력</h2>
            <div className='ServiceIntroWrap'>
                {/* SubCateNo 드롭다운 */}
                <div className='ServiceIntro'>
                    <label htmlFor="subCateNo">카테고리 선택</label>
                    <select id="subCateNo" value={subcateno} onChange={handleSelectChange}>
                        {proItems.map(item => (
                            <option key={item.proItemNo} value={item.subCategory.subCateNo}>
                                {item.subCategory.subCateName}
                            </option>
                        ))}
                    </select>
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
        </div>
    );
};

export default ProServiceIntro;
