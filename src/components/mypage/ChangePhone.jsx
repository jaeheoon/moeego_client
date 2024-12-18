import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../css/mypage/ChangeEmail.css";
import apiAxios from '../../api/apiAxios'; // 사용자 정의 Axios 인스턴스를 불러온다고 가정
import { AuthContext } from '../../context/member/AuthContext';

const ChangePhone = () => {
    const [phone, setPhone] = useState(""); // 사용자가 입력한 전화번호 상태
    const [originalPhone, setOriginalPhone] = useState(""); // 서버에서 받아온 원본 전화번호 상태
    const [errorMessage, setErrorMessage] = useState(""); // 유효성 검사 에러 메시지

    const { loginPhone, setLoginPhone } = useContext(AuthContext);

    const navigate = useNavigate();

    // 전화번호 유효성 검사 함수
    const validatePhone = (phoneNumber) => {
        const phoneRegex = /^010-\d{4}-\d{4}$/; // "010-0000-0000" 형식의 정규식
        if (phoneNumber === "") {
            return "전화번호를 입력해주세요.";
        } else if (!phoneRegex.test(phoneNumber)) {
            return "010-0000-0000 형식으로 입력해주세요.";
        } else if (phoneNumber === originalPhone) {
            return "동일한 번호입니다."; // 기존 번호와 동일한 경우
        }
        return ""; // 유효성 통과
    };

    // 페이지 로드 시 서버에서 전화번호 데이터를 가져옴
    useEffect(() => {
        setPhone(loginPhone);
        setOriginalPhone(loginPhone);
    }, [loginPhone]);

    // 전화번호 변경 핸들러
    const handlePhoneChange = (e) => {
        const newPhone = e.target.value;
        setPhone(newPhone);

        // 실시간 유효성 검사
        const error = validatePhone(newPhone);
        setErrorMessage(error);
    };

    // 취소 버튼 클릭 핸들러
    const handleCancel = () => {
        setPhone(originalPhone); // 초기값으로 복원
        setErrorMessage(""); // 에러 메시지 초기화
    };

    // 변경 완료 버튼 클릭 핸들러
    const handleSave = () => {
        const error = validatePhone(phone); // 변경 완료 시 유효성 검사
        if (error) {
            setErrorMessage(error); // 에러 메시지를 상태로 설정
            return;
        }

        // 서버로 데이터 전송
        apiAxios.patch('/api/mypage/account/private/update/phone', { phone })
            .then(() => {
                setOriginalPhone(phone);
                setLoginPhone(phone);
                localStorage.setItem('userphone', phone);
                navigate('/mypage/account/private');
            })
            .catch((error) => {
                console.error("Failed to update phone data:", error);
                alert("휴대전화 번호 변경에 실패했습니다.");
            });
    };

    return (
        <div className='ChangeEmailPage'>
            <div className='ChangeEmailWrap'>
                <div className='PageTitle'>
                    <Link className="prev" to="/mypage/account/private">
                        <img src="/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>휴대전화 번호 변경</h1>
                </div>
                <form className='ChangeEmailForm' onSubmit={(e) => e.preventDefault()}>
                    <div className='ChangeEmailContainer'>
                        <h3 className="SubTitle">휴대전화 번호</h3>
                        <div className="EmailWrap">
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder='전화번호를 입력해주세요'
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                        </div>
                    </div>
                    {errorMessage && <p className="error">{errorMessage}</p>} {/* 에러 메시지 표시 */}
                    <hr />
                    <div className='ButtonContainer'>
                        <input type="button" value="취소" onClick={handleCancel} />
                        <input type="button" value="변경완료" onClick={handleSave} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePhone;
