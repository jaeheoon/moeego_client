import React, { useContext, useState, useEffect } from 'react';
import "../../css/articles/Write.css";
import { ArticleContext } from '../../context/article/ArticleContext';
import { useNavigate } from "react-router-dom";
import Loading from '../loading/loading';

const Update = () => {
    const { isLoading, articleData, updateArticle, fetchArticle } = useContext(ArticleContext); // updateArticle, fetchArticle 가져오기
    const navigate = useNavigate();

    // 상태 관리 추가 (articleData를 초기값으로 사용)
    const [formData, setFormData] = useState({
        type: '',
        subject: '',
        content: ''
    });

    // articleData가 변경될 때 formData 초기화
    useEffect(() => {
        if (articleData) {
            setFormData({
                type: articleData.type || '',
                subject: articleData.subject || '',
                content: articleData.content || ''
            });
        }
    }, [articleData]);

    // 새로고침 시 데이터를 다시 가져오기
    useEffect(() => {
        if (!articleData) {
            const articleNo = window.location.pathname.split('/').pop(); // URL에서 articleNo 추출
            fetchArticle(articleNo); // 서버에서 articleData 가져오기
        }
    }, [articleData, fetchArticle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 업데이트 요청 보내기
        if (!formData.type || !formData.subject || !formData.content) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        updateArticle(articleData.articleNo, formData); // articleData.id와 formData 전달
    };

    // 로딩 상태이거나 데이터가 준비되지 않았을 때 로딩 컴포넌트 렌더링
    if (isLoading || !articleData) {
        return <Loading />;
    }

    return (
        <form id='articleUpdateForm' onSubmit={handleSubmit}>
            <div className="write-wrap">
                <div className=''><h1>모이고 글수정</h1></div>
                <div className="write-container">
                    {/* 선택 및 등록 버튼 */}
                    <div className="select-container">
                        <select
                            name="type"
                            value={formData.type} // formData에서 선택값 가져오기
                            onChange={handleChange} // 변경 이벤트 처리
                        >
                            <option value="" disabled>
                                주제 선택
                            </option>
                            <option value="2">자유 게시판</option>
                            <option value="3">QnA</option>
                            <option value="4">달인 게시판</option>
                        </select>
                        <button className="submit-button" type="submit">
                            수정
                        </button>
                    </div>

                    {/* 파일 업로드 */}
                    <div className="file-container">
                        <input type="file" id="file-upload" />
                        <label htmlFor="file-upload"><img className={'camera-img'} src='/image/camera.png' alt="카메라" /></label>
                        <span>No file chosen</span>
                    </div>

                    {/* 제목 입력 */}
                    <div className="subject-container">
                        <input 
                            type="text" 
                            placeholder="제목을 입력해주세요." 
                            maxLength={50} 
                            name="subject"
                            value={formData.subject} // 제목 값
                            onChange={handleChange} // 제목 변경 이벤트 처리
                        />
                    </div>
                    <hr />

                    {/* 서비스와 지역 선택 */}
                    <div className="service-area-wrap">
                        <button type="button">
                            <span>(선택) 서비스</span>
                        </button>
                        <button type="button">
                            <span>(선택) 지역</span>
                        </button>
                    </div>
                    <hr />

                    {/* 본문 입력 */}
                    <div className="content-container">
                        <textarea 
                            placeholder="내용을 입력하세요" 
                            maxLength={5000} 
                            name="content"
                            value={formData.content} // 본문 값
                            onChange={handleChange} // 본문 변경 이벤트 처리
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Update;
