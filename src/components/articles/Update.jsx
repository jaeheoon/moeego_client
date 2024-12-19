import React, { useContext, useState, useEffect } from 'react';
import "../../css/articles/Write.css";
import { ArticleContext } from '../../context/article/ArticleContext';
import { useNavigate } from "react-router-dom";
import Loading from '../loading/loading';
import ServiceArea from '../ProSearch/ServiceArea';

const Update = () => {
    const { isLoading, articleData, updateArticle, fetchArticle, images } = useContext(ArticleContext); // updateArticle, fetchArticle 가져오기
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        type: '',
        subject: '',
        content: '',
        service: '', // 선택된 서비스
        area: '',    // 선택된 지역
    });

    const [selectedFiles, setSelectedFiles] = useState([]); // 선택한 파일 저장
    const [removedImageIds, setRemovedImageIds] = useState([]);
    const maxFileSize = 20 * 1024 * 1024; // 20MB
    const maxFileCount = 5; // 최대 5장

    useEffect(() => {
        if (articleData) {
            setFormData({
                type: articleData.type || '',
                subject: articleData.subject || '',
                content: articleData.content || '',
                service: articleData.service || '',
                area: articleData.area || ''
            });

            // Handle image files (기존 이미지를 미리 보기)
            if (images && images.length > 0) {
                setSelectedFiles(images); // images에서 미리보기 이미지 설정
            }
        }
    }, [articleData, images]);

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
        setSelectedFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));

        // 기존 이미지의 경우 삭제 목록에 추가
        if (fileToRemove.imageUuidName) {
            setRemovedImageIds((prevIds) => [...prevIds, fileToRemove.imageUuidName]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        // 게시글 데이터
        data.append("subject", formData.subject);
        data.append("content", formData.content);
        data.append("type", formData.type);
        data.append("service", formData.service);
        data.append("area", formData.area);

        // 유지할 기존 이미지 ID 추가
        images.forEach((image) => {
            if (image.imageUuidName) {
                data.append("existingImages", image.imageUuidName);
            }
        });

        // 삭제할 이미지 ID 추가
        removedImageIds.forEach((id) => data.append("removedImages", id));

        // 새 이미지 추가
        selectedFiles.forEach((file) => data.append("images", file));

        // 서버 요청
        updateArticle(articleData.articleNo, data);
    };

    // 로딩 상태이거나 데이터가 준비되지 않았을 때 로딩 컴포넌트 렌더링
    if (isLoading || !articleData) {
        return <Loading />;
    }

    return (
        <form id='articleUpdateForm' onSubmit={handleSubmit}>
            <div className="write-wrap">
                <div><h1>모이고 글수정</h1></div>
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
                        <button className="submit-button" type="submit">
                            수정
                        </button>
                    </div>

                    {/* 서비스와 지역 선택 */}
                    <div className='service-area-wrap'>
                        <ServiceArea
                            service={formData.service} // 선택된 서비스 값을 전달
                            area={formData.area}       // 선택된 지역 값을 전달
                            onServiceAreaChange={(service, area) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    service,
                                    area,
                                }));
                            }}
                        />
                    </div>

                    {/* 제목 입력 */}
                    <div className="subject-container">
                        <input
                            type="text"
                            placeholder="제목을 입력해주세요."
                            maxLength={50}
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <hr />

                    {/* 본문 입력 */}
                    <div className="content-container">
                        <textarea
                            placeholder="내용을 입력하세요"
                            maxLength={5000}
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        />
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
                                            src={file instanceof File ? URL.createObjectURL(file) : `https://kr.object.ncloudstorage.com/moeego/storage/${file.imageUuidName}`} // 파일이 아닌 경우 (이미지 URL)
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

export default Update;