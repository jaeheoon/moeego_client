import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import checkPost from '../../js/daumpost';
import "../../css/mypage/ChangeAddress.css";

const ChangeAddress = () => {
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
    }, []);


    return (
        <div className='ChangeAddressPage'>
            <div className='ChangeAddressWrap'>
                <div className='Title'>
                    <Link className="Link" to="/mypage/account/private"><img src="../../../src/image/prev_icon.png" alt="prev"></img></Link>
                    <h1>이메일 변경</h1>
                </div>
                <form className='ChangeAddressForm'>
                    <div className='ChangeAddressContainer'>
                        <h3 className="SubTitle">우편번호</h3>
                        <div className="zipWrap">
                            <input type="text" className='zipcodeInput' id="zipcodeUpdate" name="zipcodeUpdate" placeholder='우편번호' readOnly />
                            <div className="zipButton">
                                <input type="button" id="zipcodeBtn" value="주소검색" onClick={() => checkPost("zipcodeUpdate", "addr1Update", "addr2Update")} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='ChangeAddressContainer'>
                        <h3 className="SubTitle">주소</h3>
                        <div>
                            <input type="text" id="addr1Update" name="addr1Update" placeholder='주소를 입력해주세요' />
                        </div>
                    </div>
                    <hr />
                    <div className='ChangeAddressContainer'>
                        <h3 className="SubTitle">상세주소</h3>
                        <div>
                            <input type="text" id="addr2Update" name="addr2Update" placeholder='상세주소를 입력해주세요' />
                        </div>
                    </div>
                    <hr />
                    <div className='ButtonContainer'>
                        <input type="button" value="취소" />
                        <input type="button" value="변경완료" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeAddress;