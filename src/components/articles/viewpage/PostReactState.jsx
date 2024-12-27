import React, { useContext, useState } from 'react';
import '/src/css/articles/PostReactState.css';
import { ArticleContext } from '../../../context/article/ArticleContext';

const PostReactState = ({ articleData }) => {
    const { likeUpdate } = useContext(ArticleContext);
    const [likes, setLikes] = useState(articleData.likes); // 좋아요 수 상태 추가

    const updateLike = (articleNo) => {
        // 로컬 스토리지에서 좋아요 클릭 여부와 시간 확인
        const lastLikeTime = localStorage.getItem(`lastLikeTime_${articleNo}`);
        const currentTime = new Date().getTime();

        // 24시간 이내에 좋아요를 클릭했다면 아무 작업도 하지 않음
        if (lastLikeTime && currentTime - lastLikeTime < 24 * 60 * 60 * 1000) {
            return;
        }

        // 좋아요 업데이트
        likeUpdate(articleNo);

        // 로컬 스토리지에 마지막 좋아요 클릭 시간 저장
        localStorage.setItem(`lastLikeTime_${articleNo}`, currentTime);

        // 상태 업데이트하여 좋아요 수 변경
        setLikes(likes + 1); // 좋아요 수 증가
    }

    return (
        <div className="post-react-state">
            <div className="react-item" onClick={() => updateLike(articleData.articleNo)}>
                <svg width="15px" height="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                    <g id="SVGRepo_iconCarrier">
                        <path fill="#b2b2b2" fillRule="evenodd" d="M7.596 1.516l-2.56 5.759V14.5h7.475a.75.75 0 00.741-.637l.994-6.55a.75.75 0 00-.741-.862H9.738c-.69 0-1.25-.56-1.25-1.25V2.575c0-.53-.385-.972-.892-1.06zM3.536 14.5V7.866H2.25a.75.75 0 00-.75.75v5.134c0 .414.336.75.75.75h1.287zM3.8 6.366L6.31.716A1.206 1.206 0 017.412 0a2.575 2.575 0 012.576 2.575v2.376h3.517a2.25 2.25 0 012.224 2.588l-.994 6.549A2.25 2.25 0 0112.511 16H2.25A2.25 2.25 0 010 13.75V8.616a2.25 2.25 0 012.25-2.25H3.8z" clipRule="evenodd" />
                    </g>
                </svg>
                <span className="react-text">{likes}</span> {/* 상태값 사용 */}
            </div>
            <div className="react-item">
                <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                    <g id="SVGRepo_iconCarrier">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z" fill="#b2b2b2" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z" fill="#b2b2b2" />
                    </g>
                </svg>
                <span className="react-text">{articleData.view}</span>
            </div>
            <div className="react-item">
                <img
                    src="/image/chat_icon.svg"
                    alt="댓글"
                    className="react-icon"
                />
                <span className="react-text">{articleData.commentCount}</span>
            </div>
        </div>
    );
};

export default PostReactState;