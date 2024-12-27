import React, { useContext, useState } from 'react';
import { ArticleContext } from '../../context/article/ArticleContext';
import ServiceArea from '../articles/modal/ServiceArea';
import '/src/css/articles/Write.css';
import { AuthContext } from '../../context/member/AuthContext';
import { useNavigate } from 'react-router-dom';

const Write = () => {
    const { writeArticle } = useContext(ArticleContext);
    const userNo = localStorage.getItem("userno");
    const {isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        subject: '',
        content: '',
        type: '',
        memberNo: userNo,
        service: '', // 선택된 서비스
        area: '',    // 선택된 지역
    });

    const [selectedFiles, setSelectedFiles] = useState([]); // 선택한 파일 저장
    const maxFileSize = 20 * 1024 * 1024; // 20MB
    const maxFileCount = 4; // 최대 4장

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        let newFiles = [];
        let totalFiles = selectedFiles.length;
        let isFileTooLarge = false;
        let exceededFiles = 0;

        files.forEach(file => {
            if (file.size > maxFileSize) {
                isFileTooLarge = true;
            } else if (totalFiles + newFiles.length < maxFileCount) {
                newFiles.push(file); // 원본 파일 저장
            } else {
                exceededFiles++;
            }
        });

        if (isFileTooLarge) {
            alert(`파일 크기는 ${maxFileSize / 1024 / 1024}MB를 초과할 수 없습니다.`);
        }
        if (exceededFiles > 0) {
            alert(`최대 ${maxFileCount}장까지만 업로드 가능합니다.`);
        }

        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleRemoveFile = (fileToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 방지
        if (!isLoggedIn){
            if (confirm('글을 작성하기 위해서는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
                navigate("/login");
                return;
            } else {
                return;
            }
        }
        if (!formData.type) {
            alert("카테고리를 선택해주세요!");
            return;
        }
        if (!formData.subject || !formData.content) {
            alert("제목과 내용을 모두 입력해주세요!");
            return;
        }

        const data = new FormData();
        // formData 객체의 각 필드를 FormData에 추가
        data.append("subject", formData.subject);
        data.append("content", formData.content);
        data.append("type", formData.type);
        data.append("memberNo", formData.memberNo);
        data.append("service", formData.service);
        data.append("area", formData.area);

        // 파일 추가
        selectedFiles.forEach(file => data.append("images", file));

        try {
            await writeArticle(data); // 서버로 FormData 전송
        } catch (error) {
            console.error("Error submitting the form", error);
        }
    };

    const handleModalClick = (e) => {
        e.stopPropagation(); // 이벤트 전파 방지
    };

    return (
        <form id='articleWriteForm' onSubmit={handleSubmit}>
            <input type='hidden' name='memberNo' value={userNo} />
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
                    <div className='service-area-wrap' onClick={handleModalClick}>
                        <ServiceArea
                            onServiceAreaChange={(service, area) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    service, // 선택된 서비스 저장
                                    area,    // 선택된 지역 저장
                                }));
                            }}
                        />
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
                        <div className="char-count">
                            {formData.subject.length} / 50
                        </div>
                    </div>
                    <hr />

                    {/* 본문 입력 */}
                    <div className="content-container">
                        <textarea
                            name="content"
                            placeholder="내용을 입력하세요"
                            maxLength={500}
                            value={formData.content}
                            onChange={handleChange}
                        ></textarea>
                        <div className="content-count">
                            {formData.content.length} / 500
                        </div>
                    </div>
                    <hr />
                    {/* 파일 업로드 */}
                    <div className="file-container">
                        <input
                            type="file"
                            id="file-upload"
                            multiple
                            onChange={handleFileChange}
                        />
                        <div>
                            <label htmlFor="file-upload">
                                <img className="camera-img" src='/image/camera.png' alt="파일 업로드" />
                            </label>
                            <div className="file-index">
                                ({selectedFiles.length} / {maxFileCount})
                            </div>
                        </div>
                        {selectedFiles.length > 0 ? (
                            <div className="file-preview-container">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="file-preview-wrapper">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`미리보기 ${index + 1}`}
                                            className="file-preview"
                                        />
                                        <button
                                            type="button"
                                            className="remove-button"
                                            onClick={() => handleRemoveFile(file)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <span>No file chosen</span>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Write;