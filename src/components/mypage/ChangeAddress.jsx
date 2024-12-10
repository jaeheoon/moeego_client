import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../css/mypage/ChangeAddress.css";
import apiAxios from '../../api/apiAxios';

const ChangeAddress = () => {
    const [address, setAddress] = useState({
        postalCode: '',
        address1: '', // 기본 주소 (우편번호 제외)
        address2: ''  // 상세 주소
    });

    const navigate = useNavigate();

    const refresh = () => {
        navigate('/mypage/account/private');
    }

    useEffect(() => {
        const scriptSrc = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            document.body.appendChild(script);

            // Cleanup: 스크립트 제거
            return () => {
                document.body.removeChild(script);
            };
        }

        // 1. localStorage에서 주소 값 가져오기
        const storedAddress = localStorage.getItem('useraddress');
        if (storedAddress) {
            const parsedAddress = parseAddress(storedAddress); // 주소를 파싱
            setAddress(parsedAddress);
        }
    }, []);

    // 주소 파싱 함수 (예: '서울 서대문구 통일로39가길 57 102동 902호(03638)')
    const parseAddress = (fullAddress) => {
        const postalCodeMatch = fullAddress.match(/\((\d{5})\)$/); // 우편번호 추출
        const postalCode = postalCodeMatch ? postalCodeMatch[1] : '';
        const addressWithoutPostalCode = fullAddress.replace(`(${postalCode})`, '').trim(); // 우편번호를 제외한 주소
        const [address1, address2] = addressWithoutPostalCode.split(' ').length > 2
            ? [addressWithoutPostalCode.slice(0, -3), addressWithoutPostalCode.slice(-3)] // 기본주소와 상세주소로 분리
            : [addressWithoutPostalCode, ''];

        return { postalCode, address1, address2 };
    };

    // 다음 주소 API에서 우편번호와 기본 주소를 설정하는 함수
    const fetchPostalCode = (address1) => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                const postalCode = data.zonecode; // 우편번호
                const fullAddress = data.address; // 전체 주소

                setAddress({
                    postalCode,
                    address1: fullAddress,
                    address2: address.address2 // 기존 상세주소 유지
                });
            }
        }).open();
    };

    // 주소 합치기
    const getCombinedAddress = (address1, address2, postalCode) => {
        return `${address1} ${address2} (${postalCode})`.trim();
    };

    // 주소 검색 버튼 클릭 시
    const handleSearch = () => {
        fetchPostalCode(address.address1);
    };

    // 변경 완료 버튼 클릭 시
    const handleSubmit = async () => {
        const combinedAddress = getCombinedAddress(address.address1, address.address2, address.postalCode); // 주소 합침

        try {
            // API 요청 보내기
            const response = await apiAxios.patch('/api/mypage/account/private/update/address', {
                address: combinedAddress
            });

            // 성공적으로 응답받았을 때
            if (response.status === 200) {
                localStorage.setItem('useraddress', combinedAddress); // 로컬스토리지에 저장
                console.log('주소 수정 완료:', combinedAddress);
                refresh();
            }
        } catch (error) {
            console.error('주소 업데이트 실패:', error);
            refresh();
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
                                <input
                                    type="button"
                                    id="zipcodeBtn"
                                    value="주소검색"
                                    onClick={handleSearch}
                                />
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
                    <div className='ButtonContainer'>
                        <input type="button" value="취소" />
                        <input
                            type="button"
                            value="변경완료"
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeAddress;
