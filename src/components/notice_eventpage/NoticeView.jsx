import React, { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArticleContext } from '../../context/article/ArticleContext';

const NoticeView = () => {
    const { fetchArticle, articleData, isLoading, images } = useContext(ArticleContext);
    const [searchParams] = useSearchParams(); // 쿼리 파라미터를 가져옴
    const articleNo = searchParams.get("article_no"); // article_no 값을 추출

    // 모달 상태 및 핸들러
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    const openModal = (imageSrc) => {
        setModalImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
    };

    // 날짜 형식 변환 함수
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = String(date.getFullYear()).slice(2); // 연도의 뒤 두 자리
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월
        const day = String(date.getDate()).padStart(2, "0"); // 일
        return `[${year}.${month}.${day}]`;
    };

    // 컴포넌트가 마운트될 때 게시글 데이터를 가져옴
    useEffect(() => {
        if (articleNo) {
            fetchArticle(articleNo);
        }
    }, [articleNo, fetchArticle]);

    if (isLoading) {
        return <p>로딩 중...</p>;
    }

    if (!articleData) {
        return <p>게시글을 불러올 수 없습니다.</p>;
    }

    return (
        <div className="noticeView">
            <Link to='/event' className='noticeCategory'>
                <h2>{articleData.type === 0 ? '공지사항' : '이벤트'}</h2>
            </Link>
            <div style={{fontSize:'2rem',fontWeight:'700'}}>{formatDate(articleData.writeDate)} {articleData.subject}</div>
            
            <div className="content">
                {articleData.content}
            </div>
            <div className="post-image-wrapper">
                {
                    images.map(item => (
                        <img 
                            className='post-image'
                            key={item.imageNo} 
                            src={`https://kr.object.ncloudstorage.com/moeego/storage/${item.imageUuidName}`} 
                            alt={item.imageName}
                            onClick={() => openModal(`https://kr.object.ncloudstorage.com/moeego/storage/${item.imageUuidName}`)} // 클릭 시 모달 열기
                        />
                    ))
                }
            </div>
            <p style={{textAlign:'right '}}>조회수: {articleData.view}</p>

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

export default NoticeView;