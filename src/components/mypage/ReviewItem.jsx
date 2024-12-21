import React, { useContext, useState } from 'react';
import { ArticleContext } from '../../context/article/ArticleContext';

const ReviewItem = ({ item, showDeleteButton }) => {
    const [images, setImages] = useState([]); // 서버에서 불러온 이미지 목록
    const { deleteReview } = useContext(ArticleContext);

    // 리뷰 삭제 핸들러
    const handleDelete = () => {
        deleteReview(item.reviewNo); // 해당 리뷰 ID를 deleteReview 함수에 전달
    };

    return (
        <article>
            <section>
                {/* 달인 이름 */}
                <span>{item.subject}</span>&nbsp;-&nbsp;<span>{item.proName}</span>
            </section>
            <section>
                {/* 서비스 이름 */}
                <p>
                    <img
                        data-v-c160b016=""
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Im03LjQ5NiAxLjU5NiAxLjQwNyAyLjc0MiAzLjE0NS40NGMuOTEuMTI3IDEuMjc1IDEuMjA0LjYxNSAxLjgyMmwtMi4yNzYgMi4xMzQuNTM4IDMuMDE1Yy4xNTUuODcyLS43OTcgMS41MzgtMS42MTIgMS4xMjZMNi41IDExLjQ1MmwtMi44MTMgMS40MjNjLS44MTUuNDEyLTEuNzY3LS4yNTQtMS42MTItMS4xMjZsLjUzOC0zLjAxNUwuMzM3IDYuNmMtLjY2LS42MTgtLjI5Ni0xLjY5NS42MTUtMS44MjJsMy4xNDUtLjQ0IDEuNDA3LTIuNzQyQzUuOTEyLjggNy4wODguOCA3LjQ5NiAxLjU5NiIgZmlsbD0iI0ZGQ0UyMSIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo="
                        alt="평점"
                    />{' '}
                    5.0
                </p>
            </section>
            <section>
                {/* 이미지 목록 출력 */}
                <div className="ImageFeat">
                    {item.imageUuidName && item.imageUuidName.map((uuid, index) => (
                        <img
                            key={index}
                            src={`https://kr.object.ncloudstorage.com/moeego/storage/${uuid}`} // 서버 기본 URL과 UUID 결합
                            alt={`리뷰 이미지 ${index + 1}`}
                        />
                    ))}
                </div>
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