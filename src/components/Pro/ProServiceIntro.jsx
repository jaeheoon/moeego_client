import React, { useState, useEffect } from "react";
import '../../css/Pro/ProServiceIntro.css';
import apiAxios from '../../api/apiAxios';

const ProServiceIntro = () => {
    const [serviceName, setServiceName] = useState("");
    const [serviceContent, setServiceContent] = useState("");
    const maxLength = 50; // 글자 수 제한

    // 서버로부터 기존 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiAxios.get('/api/pro/upload/serviceintro');
                if (response.data && response.data.success) {
                    const { serviceName, serviceContent } = response.data.data;

                    // 입력 필드를 서버 데이터로 초기화
                    setServiceName(serviceName || "");
                    setServiceContent(serviceContent || "");
                } else {
                    console.error("데이터를 가져오지 못했습니다.");
                }
            } catch (error) {
                console.error("서버 요청 오류:", error);
            }
        };

        fetchData();
    }, []); // 페이지 로딩 시 1회 실행

    // 입력값 변경 핸들러
    const handleInputChange = (e, setter) => {
        if (e.target.value.length <= maxLength) {
            setter(e.target.value);
        }
    };

    // 작성 버튼 클릭 핸들러
    const handleSubmit = async () => {
        try {
            // 서버에 보낼 데이터 객체
            const requestData = {
                serviceName,
                serviceContent,
            };

            // PUT 요청
            const response = await apiAxios.put('/api/pro/upload/serviceintro', requestData);

            // 서버 응답 확인
            if (response.data.success) {
                alert("서비스 정보가 성공적으로 등록되었습니다.");
            } else {
                alert("등록에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("서버 요청 오류:", error);
            alert("오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }
    };

    // 초기화 버튼 핸들러
    const handleReset = () => {
        setServiceName("");
        setServiceContent("");
    };

    return (
        <div className='ServiceIntroPage'>
            <h2>서비스 입력 페이지</h2>
            <div className='ServiceIntroWrap'>
                <div className='ServiceIntro'>
                    <label htmlFor="serviceName">서비스 이름</label>
                    <textarea
                        id="serviceName"
                        value={serviceName}
                        onChange={(e) => handleInputChange(e, setServiceName)}
                        placeholder="서비스 이름을 입력하세요"
                        rows="2"
                    />
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
                    <div className='ServiceContentLength'>
                        {serviceContent.length} / {maxLength}
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