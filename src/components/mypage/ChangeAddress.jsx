import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../css/mypage/ChangeAddress.css";
import apiAxios from '../../api/apiAxios';
import { AuthContext } from '../../context/member/AuthContext';

const ChangeAddress = () => {
    const [address, setAddress] = useState({
        postalCode: '',
        address1: '', // 기본 주소 (우편번호 제외)
        address2: ''  // 상세 주소
    });

    const [errorMessage, setErrorMessage] = useState('');
    const { loginAddress, setLoginAddress } = useContext(AuthContext);
    const navigate = useNavigate();

    // 페이지 이동 후 새로고침
    const refresh = () => {
        navigate('/mypage/account/private');
    };

    // 초기값 설정 및 Daum API 스크립트 로드
    useEffect(() => {
        const scriptSrc = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }

        if (loginAddress) {
            const parsedAddress = parseAddress(loginAddress);
            setAddress(parsedAddress); // 로그인 주소로 상태 설정
        }
    }, [loginAddress]); // loginAddress가 변경될 때마다 실행

    // 주소 파싱 함수
    const parseAddress = (fullAddress) => {
        const postalCodeMatch = fullAddress.match(/\((\d{5})\)$/); // 괄호 안의 우편번호 추출
        const postalCode = postalCodeMatch ? postalCodeMatch[1] : '';

        const addressWithoutPostalCode = fullAddress.replace(/\(\d{5}\)$/, '').trim();

        let address1 = '';
        let address2 = '';

        // 상세 주소를 구분하는 정규식
        const detailedAddressMatch = addressWithoutPostalCode.match(
            /(.+? \d+(?:-\d+)?)(\s.*)/
        );

        if (detailedAddressMatch) {
            address1 = detailedAddressMatch[1].trim(); // 기본 주소
            address2 = detailedAddressMatch[2].trim(); // 상세 주소
        } else {
            address1 = addressWithoutPostalCode;
        }

        return {
            postalCode: postalCode || '',
            address1: address1 || '',
            address2: address2 || ''
        };
    };

    const fetchPostalCode = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                const postalCode = data.zonecode; // 우편번호
                const fullAddress = data.address; // 전체 주소
                setAddress({
                    postalCode,
                    address1: fullAddress,
                    address2: '' // 상세 주소 초기화
                });
            }
        }).open();
    };

    const handleCancel = () => {
        if (loginAddress) {
            const parsedAddress = parseAddress(loginAddress);
            setAddress(parsedAddress); // 로그인 주소로 상태 설정
        } else {
            // 로그인 주소가 없을 경우 초기값을 설정
            setAddress({
                postalCode: '',
                address1: '',
                address2: ''
            });
        }
        setErrorMessage('');
    };

    const getCombinedAddress = () => {
        const { address1, address2, postalCode } = address;
        return `${address1} ${address2} (${postalCode})`.trim();
    };

    const handleSubmit = async () => {
        const { postalCode, address1, address2 } = address;

        // 유효성 검사
        if (!postalCode) {
            setErrorMessage('우편번호를 입력해주세요.');
            return;
        }
        if (!address1) {
            setErrorMessage('기본 주소를 입력해주세요.');
            return;
        }
        if (!address2) {
            setErrorMessage('상세 주소를 입력해주세요.');
            return;
        }

        try {
            const combinedAddress = getCombinedAddress();

            const response = await apiAxios.patch('/api/mypage/account/private/update/address', {
                address: combinedAddress
            });

            if (response.status === 200) {
                localStorage.setItem('useraddress', combinedAddress);
                setLoginAddress(combinedAddress);
                refresh();
            }
        } catch (error) {
            console.error('주소 업데이트 실패:', error);
            setErrorMessage('주소 업데이트 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className='ChangeAddressPage'>
            <div className='ChangeAddressWrap'>
                <div className='PageTitle'>
                    <Link className="prev" to="/mypage/account/private">
                        <img src="/image/prev_icon.png" alt="prev" />
                    </Link>
                    <h1>주소 변경</h1>
                </div>
                <form className='ChangeAddressForm'>
                    <div className='ChangeAddressContainer'>
                        <h3 className="SubTitle">우편번호</h3>
                        <div className="zipWrap">
                            <input
                                type="text"
                                className='zipcodeInput'
                                id="zipcodeUpdate"
                                name="zipcodeUpdate"
                                placeholder='우편번호'
                                value={address.postalCode}
                                readOnly
                            />
                            <div className="zipButton">
                                <button
                                    type="button"
                                    id="zipcodeBtn"
                                    onClick={fetchPostalCode}
                                >
                                    주소검색
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className='ChangeAddressContainer'>
                        <h3 className="SubTitle">주소</h3>
                        <div>
                            <input
                                type="text"
                                id="addr1Update"
                                name="addr1Update"
                                value={address.address1}
                                placeholder='주소를 입력해주세요'
                                onChange={(e) => setAddress({ ...address, address1: e.target.value })}
                            />
                        </div>
                    </div>
                    <hr />

                    <div className='ChangeAddressContainer'>
                        <h3 className="SubTitle">상세주소</h3>
                        <div>
                            <input
                                type="text"
                                id="addr2Update"
                                name="addr2Update"
                                value={address.address2}
                                placeholder='상세주소를 입력해주세요'
                                onChange={(e) => setAddress({ ...address, address2: e.target.value })}
                            />
                        </div>
                    </div>
                    <hr />

                    {errorMessage && (
                        <div className="error-message">
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <div className='ButtonContainer'>
                        <input type="button" value="취소" onClick={handleCancel} />
                        <input type="button" value="변경완료" onClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeAddress;
