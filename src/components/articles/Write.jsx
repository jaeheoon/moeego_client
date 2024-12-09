import React, { useContext, useState } from 'react';
import '/src/css/articles/Write.css';
import { ArticleContext } from '../../context/article/ArticleContext';

const Write = () => {
    const { writeArticle } = useContext(ArticleContext);
    const [formData, setFormData] = useState({
        subject: '',
        content: '',
        type: '',
        memberNo: 13,   //memberNo 내놔!!!!!!!!!!!
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.type) {
            alert("카테고리를 선택해주세요!");
            return;
        }
        if (!formData.subject || !formData.content) {
            alert("제목과 내용을 모두 입력해주세요!");
            return;
        }
        const dto = {
            subject: formData.subject,
            content: formData.content,
            type: formData.type,
            memberNo: formData.memberNo,
        };
        writeArticle(dto);
    };

    return (
        <form id='articleWriteForm' onSubmit={handleSubmit}>
            <input type='hidden' name='memberNo' value={formData.memberNo} />
            <div className="write-wrap">
                <div><h1>모이고 글작성</h1></div>
                <div className="write-container">
                    {/* 카테고리 선택 및 등록 버튼 */}
                    <div className="select-container">
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                주제 선택
                            </option>
                            <option value="2">자유 게시판</option>
                            <option value="3">QnA</option>
                            <option value="4">달인 게시판</option>
                        </select>
                        <button type="submit" className="submit-button">
                            등록
                        </button>
                    </div>

                    {/* 파일 업로드 */}
                    <div className="file-container">
                        <input type="file" id="file-upload" />
                        <label htmlFor="file-upload">
                            <img className="camera-img" src='/image/camera.png' alt="파일 업로드" />
                        </label>
                        <span>No file chosen</span>
                    </div>

                    {/* 제목 입력 */}
                    <div className="subject-container">
                        <input
                            type="text"
                            name="subject"
                            placeholder="제목을 입력해주세요."
                            maxLength={50}
                            value={formData.subject}
                            onChange={handleChange}
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
                            name="content"
                            placeholder="내용을 입력하세요"
                            maxLength={5000}
                            value={formData.content}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Write;
