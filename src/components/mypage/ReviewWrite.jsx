import React, { useContext, useState } from 'react';
import '/src/css/mypage/ReviewWrite.css';
import { ArticleContext } from '../../context/article/ArticleContext';
import { useLocation, useParams } from 'react-router-dom';

const ReviewWrite = () => {
    const userNo = localStorage.getItem("userno");
    const { reviewWrite } = useContext(ArticleContext);

    const location = useLocation();
    const { proName, proItemName } = location.state;
    
    const searchParams = new URLSearchParams(location.search);
    const proItemNo = searchParams.get('proItemNo');

    // proItemNo을 Long 타입으로 변환 (JavaScript에서 숫자형으로 처리)
    const proItemNoLong = proItemNo ? parseInt(proItemNo, 10) : null;

    // 평점 상태 추가
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // State for form data
    const [formData, setFormData] = useState({
        rating: '',
        memberNo: userNo,
        proItemNo: proItemNoLong, // 이전 페이지에서 데이터 받아옴
        content: '',
    });

    const [selectedFiles, setSelectedFiles] = useState([]); // Files selected for upload
    const maxFileSize = 20 * 1024 * 1024; // 20MB
    const maxFileCount = 5; // Maximum 5 files

    const maxContentLength = 300; // 내용 글자수 제한

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "content" && value.length > maxContentLength) {
            return; // 글자수 제한 초과 시 더 이상 입력하지 않음
        }

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

        files.forEach((file) => {
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

        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemoveFile = (fileToRemove) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            alert("평점을 입력해주세요!");
            return;
        }

        if (!formData.content) {
            alert("내용을 입력해주세요!");
            return;
        }

        const data = new FormData();
        data.append("star", rating);
        data.append("memberNo", formData.memberNo);
        data.append("proItemNo", formData.proItemNo);
        data.append("reviewContent", formData.content);

        selectedFiles.forEach((file) => data.append("images", file));

        try {
            reviewWrite(data);
            console.log("Form submitted", data);
        } catch (error) {
            console.error("Error submitting the form", error);
        }
    };

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleRatingHover = (value) => {
        setHoverRating(value);
    };

    const handleRatingOut = () => {
        setHoverRating(0);
    };

    return (
        <form id="reviewWritePage" onSubmit={handleSubmit}>
            <input type="hidden" name="memberNo" value={userNo} />
            <div className="review-write-wrap">
                <div>
                    <h1>모이고 리뷰작성</h1>
                </div>

                {/* 평점 입력 */}
                <div className="rating-container">
                    <h3>{proName} - {proItemName}</h3>
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
                        maxLength={maxContentLength}
                        value={formData.content}
                        onChange={handleChange}
                    ></textarea>
                    <div className="content-counter">
                        ({formData.content.length} / {maxContentLength})
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
                            <img className="camera-img" src="/image/camera.png" alt="파일 업로드" />
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

                <button type="submit" className="review-submit-button">
                    작성 완료
                </button>
            </div>
        </form>
    );
};

export default ReviewWrite;
