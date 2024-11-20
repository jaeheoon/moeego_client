import React from 'react';

const ProApproval = () => {
    return (
        <div>
            <h2>고수 권한 승인 | 고수가 되고 싶은가?</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>한줄 소개</th>
                        <th>승인 여부</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>10</td>
                        <td>윤강준</td>
                        <td>하이</td>
                        <td>미승인</td>
                    </tr>
                </tbody>
            </table>

            {/* 모달 */}
            <div>
                <div >
                    <div >
                        <h3>정보</h3>
                        <button>✖</button>
                    </div>
                    <div>
                        <div>
                            <img src="#" alt="프로필 사진"/>
                        </div>
                        <div>
                            <p>
                                <strong>이름:</strong>
                                윤강준
                            </p>
                            <p>
                                <strong>서비스 소개:</strong>
                            </p>
                            <p>ㅎㅇ</p>
                        </div>
                    </div>
                    <div>
                        <button type='button'>승인</button>
                        <button type='button'>거절</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProApproval;