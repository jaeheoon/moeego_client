import React, { useState } from 'react';
import '/src/css/mypage/ReviewWrite.css';

const ReviewWrite = () => {
    const userNo = localStorage.getItem("userno");

    // 평점 상태 추가
    const [rating, setRating] = useState(0); // 선택된 평점
    const [hoverRating, setHoverRating] = useState(0); // 마우스 오버한 평점

    // State for form data
    const [formData, setFormData] = useState({
        content: '',
        memberNo: userNo,
        rating:'',
    });

    const [selectedFiles, setSelectedFiles] = useState([]); // Files selected for upload
    const maxFileSize = 20 * 1024 * 1024; // 20MB
    const maxFileCount = 5; // Maximum 5 files

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
                newFiles.push(file);
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
        e.preventDefault();
        if (!formData.type) {
            alert("카테고리를 선택해주세요!");
            return;
        }
        if (!formData.subject || !formData.content) {
            alert("제목과 내용을 모두 입력해주세요!");
            return;
        }

        const data = new FormData();
        // Add form data fields
        data.append("reviewContent", formData.content);
        data.append("memberNo", formData.memberNo);
        data.append("star", rating); // 평점 추가

        // Add files to FormData
        selectedFiles.forEach(file => data.append("images", file));

        try {
            // 여기에 제출함수 ㄱㄱ
            console.log("Form submitted", data);
        } catch (error) {
            console.error("Error submitting the form", error);
        }
    };

    // 평점 설정 함수
    const handleRatingClick = (value) => {
        setRating(value);
    };

    // 마우스 오버 시 평점 설정 함수
    const handleRatingHover = (value) => {
        setHoverRating(value);
    };

    // 마우스 아웃 시 평점 리셋 함수
    const handleRatingOut = () => {
        setHoverRating(0);
    };

    return (
        <form id='reviewWritePage' onSubmit={handleSubmit}>
            <input type='hidden' name='memberNo' value={userNo} />
            <div className="review-write-wrap">
                <div><h1>모이고 리뷰작성</h1></div>

                {/* 평점 입력 */}
                <div className="rating-container">
                    <h3>개쩌는 엄청난 달인 - 서비스 이름</h3>
                    <div>평점</div>
                    <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${hoverRating >= star || rating >= star ? 'filled' : ''}`}
                                onClick={() => handleRatingClick(star)}
                                onMouseEnter={() => handleRatingHover(star)}
                                onMouseLeave={handleRatingOut}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <div className="rating-value">{rating} / 5</div>
                </div>
                <hr />

                {/* 본문 입력 */}
                <div className="content-container">
                    <textarea
                        name="content"
                        placeholder="리뷰내용을 입력하세요"
                        maxLength={5000}
                        value={formData.content}
                        onChange={handleChange}
                    ></textarea>
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

                <button type="submit" className="review-submit-button">작성 완료</button>
            </div>
        </form>
    );
};

export default ReviewWrite;