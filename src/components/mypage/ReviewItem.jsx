import React, { useContext } from 'react';
import { ArticleContext } from '../../context/article/ArticleContext';

const ReviewItem = ({ item, showDeleteButton }) => {
    const { deleteReview } = useContext(ArticleContext);

    // 리뷰 삭제 핸들러
    const handleDelete = (e) => {
        e.stopPropagation(); // 이벤트 전파 중단
        deleteReview(item.reviewNo); // 해당 리뷰 ID를 deleteReview 함수에 전달
    };

    return (
        <article className='reviewItem'>
            <section>
                {/* 달인 이름 */}
                <span>{item.subject}</span>&nbsp;-&nbsp;<span>{item.proName}</span>
            </section>
            <section>
                {/* 서비스 이름 */}
                <p>
                    <span
                        style={{
                            color: "#f39c12",
                            marginRight: "0.25rem",
                        }}
                    >★</span>
                    {item.star}
                </p>
            </section>
            {/* 이미지 목록 출력 */}
            <section>
                {item.imageUuidName &&
                    item.imageUuidName.map((uuid, index) => (
                        <div className="ImageFeat" key={index}>
                            <img
                                src={`https://kr.object.ncloudstorage.com/moeego/storage/${uuid}`} // 서버 기본 URL과 UUID 결합
                                alt={`리뷰 이미지 ${index + 1}`}
                            />
                        </div>
                    ))}
            </section>
            <section>
                <p className="content">
                    {/* 리뷰 내용 */}
                    {item.reviewContent}
                </p>
            </section>
            <section>
                {/* 리뷰 작성자와 작성 시간 */}
                <span>작성자 : {item.memberName}</span>
                <span>{item.elapsedTime}</span>
            </section>
            {showDeleteButton && ( // showDeleteButton이 true일 때만 삭제 버튼 표시
                <section>
                    <button onClick={handleDelete} className="deleteReviewBtn">
                        삭제
                    </button>
                </section>
            )}
        </article>
    );
};

export default ReviewItem;
