import React from "react";

function Reviews() {
  return (
    <div className="reviewsWrap">
      <h2>최신 ★ 5개 리뷰</h2>
      <div className="review-cards">
          <div className="review-card">
          <img src="./src/image/male_icon.png" alt="프로필사진" />
          <strong>성함 없음</strong>
          <strong>받으신 선택한 세부 카테고리명</strong>
          <p>⭐⭐⭐⭐⭐ 5.0</p>
          <p>고객의 리뷰 내용</p>
          <span className="clientName">고객명</span>
          </div>
          <div className="review-card">
          <img src="./src/image/male_icon.png" alt="프로필사진" />
          <strong>성함 없음</strong>
          <strong>받으신 선택한 세부 카테고리명</strong>
          <p>⭐⭐⭐⭐⭐ 5.0</p>
          <p>고객의 리뷰 내용</p>
          <span className="clientName">고객명</span>
          </div>
      </div>
  </div>
  );
}

export default Reviews;
