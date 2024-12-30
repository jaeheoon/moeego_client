import React, { useState, useEffect } from 'react';
import '/src/css/articles/PostContent.css';

const PostContent = ({ articleData, images }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태
    const [modalImage, setModalImage] = useState(null);      // 모달에 표시할 이미지

    const openModal = (imageSrc) => {
        setModalImage(imageSrc);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // 배경 스크롤 막기
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
        document.body.style.overflow = 'auto'; // 배경 스크롤 복구
    };

    useEffect(() => {
        // 컴포넌트가 언마운트될 때 스크롤 복구
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const content = `${articleData.content}`;

    return (
        <div className="post-content">
            <p style={{ whiteSpace: 'pre-wrap' }} className="post-text">
                {content}
            </p>
            <div className="post-image-wrapper">
                {images.map(item => (
                    <img
                        className='post-image'
                        key={item.imageNo}
                        src={`https://kr.object.ncloudstorage.com/moeego/storage/${item.imageUuidName}`}
                        alt={item.imageName}
                        onClick={() => openModal(`https://kr.object.ncloudstorage.com/moeego/storage/${item.imageUuidName}`)}  // 클릭 시 모달 열기
                    />
                ))}
            </div>

            {/* 모달 */}
            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <img
                            src={modalImage}
                            alt="Enlarged view"
                            onClick={closeModal} // 이미지를 클릭하면 모달 닫기
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostContent;