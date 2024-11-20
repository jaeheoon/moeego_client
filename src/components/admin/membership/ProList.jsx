import React from 'react';

const ProList = () => {
    return (
        <div>
            <div>
                <h1>고수 관리 | 멋지고 캡짱 지리는 고수 형님덜</h1>
            </div>
            <div>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이름</th>
                            <th>카테고리</th>
                            <th>성별</th>
                            <th>별점</th>
                            <th>승인 날짜</th>
                            <th>백업 날짜</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td>1</td>
                                <td>윤강준</td>
                                <td>이사/청소</td>
                                <td>남자</td>
                                <th>5.0</th>
                                <td>2024.11.11</td>
                                <td>2024.11.19</td>
                                <td>승인 완료</td>
                            </tr>
                    </tbody>
                </table>
            </div>
            {/* 모달 */}
                <div>
                    <div>
                        <div>
                            <h2>윤강준님의 정보</h2>
                            <button>
                                ✖
                            </button>
                        </div>
                        <div>
                            <img src="#" alt="프로필사진"/>
                            <p>
                                <strong>이메일:</strong> 
                            </p>
                            <p>
                                <strong>카테고리:</strong>
                            </p>
                            <p>
                                <strong>성별:</strong>
                            </p>
                            <p>
                                <strong>평점:</strong>
                                <span>★ 5.0</span>
                            </p>
                            <p>
                                <strong>승인 날짜:</strong>
                            </p>
                            <p>
                                <strong>백업 날짜:</strong>
                            </p>
                            <p>
                                <strong>한줄 소개:</strong>
                            </p>
                            <p></p>
                        </div>

                        <div>
                            <button>박탈</button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default ProList;