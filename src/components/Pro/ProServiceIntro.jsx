import React, { useState, useEffect } from "react";
import '../../css/Pro/ProServiceIntro.css';
import apiAxios from '../../api/apiAxios';

const ProServiceIntro = () => {
    const [serviceName, setServiceName] = useState("");
    const [serviceContent, setServiceContent] = useState("");
    const [servicePrice, setServicePrice] = useState(""); // 추가된 서비스 가격 상태
    const [error, setError] = useState({ subject: '', content: '', price: '' }); // 오류 상태 변수
    const maxLength = 50; // 글자 수 제한
    const [userno, setUserno] = useState(localStorage.getItem('userno') || '');
    const [prono, setProno] = useState('');
    const [subcateno, setSubcateno] = useState('');

    // 서버로부터 기존 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiAxios.get('/api/pro/init', {
                    params: {
                        memberNo: userno,
                    }
                });
                if (response.data.success) {
                    const { proNo, subCateNo, subject, content, price } = response.data.data;

                    // 입력 필드를 서버 데이터로 초기화
                    setProno(proNo || "");
                    setSubcateno(subCateNo || "");
                    setServiceName(subject || "");
                    setServiceContent(content || "");
                    setServicePrice(price || ""); // 가격 데이터 초기화

                } else {
                    console.error("데이터를 가져오지 못했습니다.");
                    setProno("");
                    setSubcateno("");
                    setServiceName("");
                    setServiceContent("");
                    setServicePrice("");
                }
            } catch (error) {
                console.error("서버 요청 오류:", error);
            }
        };

        fetchData();
    }, []); // 페이지 로딩 시 1회 실행

    useEffect(() => {

    }, []);

    // 입력값 변경 핸들러
    const handleInputChange = (e, setter, field) => {
        const { value, type } = e.target;
        setError((prevError) => ({ ...prevError, [field]: '' })); // 해당 필드 오류 초기화

        if (type === "number") {
            setter(value >= 0 ? value : "");
        } else if (value.length <= maxLength) {
            setter(value);
        }
    };

    // 작성 버튼 클릭 핸들러
    const handleSubmit = async () => {
        const newError = { subject: '', content: '', price: '' };
        let hasError = false;

        if (!serviceName.trim()) {
            newError.subject = "서비스 이름을 입력해주세요.";
            hasError = true;
        }
        if (!serviceContent.trim()) {
            newError.content = "서비스 내용을 입력해주세요.";
            hasError = true;
        }
        if (!servicePrice || servicePrice <= 0) {
            newError.price = "유효한 서비스 가격을 입력해주세요.";
            hasError = true;
        }

        if (hasError) {
            setError(newError);
            return;
        }

        try {
            const requestData = { subject: serviceName, content: serviceContent, price: servicePrice };
            const response = await apiAxios.put('/api/pro/item', requestData);

            if (response.data.success) {
                alert("서비스 정보가 성공적으로 등록되었습니다.");
                setError({ subject: '', content: '', price: '' }); // 오류 메시지 초기화
            } else {
                alert(response.data.message || "등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("서버 요청 오류:", error);
            setError({ ...newError, subject: "서버 요청 중 오류가 발생했습니다." });
        }
    };

    // 초기화 버튼 핸들러
    const handleReset = () => {
        setServiceName("");
        setServiceContent("");
        setServicePrice("");
        setError({ subject: '', content: '', price: '' }); // 오류 메시지 초기화
    };

    return (
        <div className='ServiceIntroPage'>
            <h2>서비스 입력</h2>
            <div className='ServiceIntroWrap'>
                <div className='ServiceIntro'>
                    <label htmlFor="serviceName">서비스 이름</label>
                    <textarea
                        id="serviceName"
                        value={serviceName}
                        onChange={(e) => handleInputChange(e, setServiceName)}
                        placeholder="서비스 이름을 입력하세요"
                        rows="4"
                    />
                    <div className='errorCode'>
                        {error.subject && <div style={{ color: "red", fontSize: "12px" }}>{error.subject}</div>}
                    </div>
                    <div className='ServiceContentLength'>
                        {serviceName.length} / {maxLength}
                    </div>
                </div>

                <div className='ServiceIntro'>
                    <label htmlFor="serviceContent">서비스 내용</label>
                    <textarea
                        id="serviceContent"
                        value={serviceContent}
                        onChange={(e) => handleInputChange(e, setServiceContent)}
                        placeholder="서비스 내용을 입력하세요"
                        rows="4"
                    />
                    <div className='errorCode'>
                        {error.content && <div style={{ color: "red", fontSize: "12px" }}>{error.content}</div>}
                    </div>
                    <div className='ServiceContentLength'>
                        {serviceContent.length} / {maxLength}
                    </div>
                </div>
                <div className='ServiceIntro'>
                    <label htmlFor="servicePrice">서비스 가격</label>
                    <input
                        id="servicePrice"
                        type='number'
                        value={servicePrice}
                        onChange={(e) => handleInputChange(e, setServicePrice)}
                        placeholder="서비스 가격을 입력하세요"
                        min="0"
                    />
                    <div className='errorCode'>
                        {error.price && <div style={{ color: "red", fontSize: "12px" }}>{error.price}</div>}
                    </div>
                </div>

                <div className='ServiceIntroButtonWrap'>
                    <input type='button' value='초기화' onClick={handleReset} />
                    <input type='button' value='등록' onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default ProServiceIntro;