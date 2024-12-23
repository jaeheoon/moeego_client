import React, { useEffect, useState } from "react";
import apiAxios from "../../api/apiAxios"; // API 호출을 위한 경로 설정
import { Link } from "react-router-dom";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 리뷰 데이터를 최신순으로 가져오기
    const fetchReviews = async () => {
      try {
        const response = await apiAxios.get("/api/review?pg=1"); // API 엔드포인트 예시
        const latestReviews = response.data.content;

        // 최신 순으로 정렬하고, 상위 2개의 리뷰만 선택
        const topTwoReviews = latestReviews.slice(0, 2);
        setReviews(topTwoReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="reviewsWrap">
      <h2>최신 리뷰</h2>
      <Link to="/pro/proview" className="review-cards">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <img src="/image/male_icon.png" alt="프로필사진" />
              <strong>{review.proName || "성함 없음"}</strong>
              <strong>{review.subject || "받으신 선택한 세부 카테고리명"}</strong>
              <p>⭐⭐⭐⭐⭐ 5.0</p>
              <div className="mainReviewContentWrap">
                <p>{review.reviewContent || "고객의 리뷰 내용"}</p>
                <div className="mainReviewImageWrap">
                  {review.imageUuidName && review.imageUuidName.map((uuid, index) => (
                    <img
                        key={index}
                        src={`https://kr.object.ncloudstorage.com/moeego/storage/${uuid}`} // 서버 기본 URL과 UUID 결합
                        alt={`리뷰 이미지 ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <span className="clientName">{review.memberName || "고객명"}</span>
            </div>
          ))
        ) : (
          <p>리뷰가 없습니다.</p> // 데이터가 없을 경우 메시지 표시
        )}
      </Link>
    </div>
  );
}

export default Reviews;
