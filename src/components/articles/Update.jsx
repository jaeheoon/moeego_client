import React from 'react';
import "../../css/articles/Write.css";

const Update = () => {
    return (
        <form id='articleUpdateForm'>
            <div className="write-wrap">
                <div className=''><h1>모이고 글수정</h1></div>
                <div className="write-container">
                    {/* 선택 및 등록 버튼 */}
                    <div className="select-container">
                        <select>
                            <option selected disabled>주제 선택</option>
                            <option>고수 게시판</option>
                            <option>자유 게시판</option>
                            <option>QnA</option>
                        </select>
                        <button className="submit-button">
                            수정
                        </button>
                    </div>

                    {/* 파일 업로드 */}
                    <div className="file-container">
                        <input type="file" id="file-upload" />
                        <label htmlFor="file-upload"><img className={'camera-img'} src='/image/camera.png' /></label>
                        <span>No file chosen</span>
                    </div>

                    {/* 제목 입력 */}
                    <div className="subject-container">
                        <input type="text" placeholder="제목을 입력해주세요." maxLength={50} />
                    </div>
                    <hr />

                    {/* 서비스와 지역 선택 */}
                    <div className="service-area-wrap">
                        <button>
                            <span>(선택) 서비스</span>
                        </button>
                        <button>
                            <span>(선택) 지역</span>
                        </button>

                    </div>
                    <hr />

                    {/* 본문 입력 */}
                    <div className="content-container">
                        <textarea placeholder="내용을 입력하세요" maxLength={5000}></textarea>
                        {/*
                        <span>과외 친구, 공동 구매 그룹 , 취미활동까지 함께 할 사람을 찾아보세요. 예) 게임을 좋아하는 분 누구나</span>
                    */}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Update;