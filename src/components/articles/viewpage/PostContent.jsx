import React, { useState } from 'react';
import '/src/css/articles/PostContent.css';

const PostContent = ({ articleData, images }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태
    const [modalImage, setModalImage] = useState(null);      // 모달에 표시할 이미지

    const openModal = (imageSrc) => {
        setModalImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
    };

    const content = `${articleData.content}`;

    return (
        <div className="post-content">
            <p style={{ whiteSpace: 'pre-wrap' }} className="post-text">
                {content}
            </p>
            <div className="post-image-wrapper">
                {
                    images.map(item => (
                        <img 
                            className='post-image'
                            key={item.imageNo} 
                            src={`https://kr.object.ncloudstorage.com/moeego/storage/${item.imageUuidName}`} 
                            alt={item.imageName}
                            onClick={() => openModal(`https://kr.object.ncloudstorage.com/moeego/storage/${item.imageUuidName}`)}  // 클릭 시 모달 열기
                        />
                    ))
                }
            </div>

            {/* 모달 */}
            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <img src={modalImage} alt="Enlarged view" />
                        <button className="close-btn" onClick={closeModal}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostContent;