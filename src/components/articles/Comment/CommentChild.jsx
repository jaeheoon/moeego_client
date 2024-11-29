import React from 'react';

const CommentChild = ({ item }) => {
    // content에서 @사용자1 부분을 강조하기 위한 함수
    const formatContent = (content) => {
        const regex = /(@\S+)/g; // @로 시작하는 단어를 찾는 정규 표현식
        const parts = content.split(regex); // 정규 표현식에 따라 문자열 분리
        
        return parts.map((part, index) => {
            // @로 시작하는 부분에 스타일 적용
            if (part.startsWith('@')) {
                return <span key={index} className="mention">{part}</span>; // @부분 span으로 묶고 mension클래스 네임 추가
            }
            return part; // 나머지 부분은 그대로 리턴
        });
    };

    return (
        <div className='childCommentWrap'>
            {/* 대댓글 */}
            <div className='commentWriterWrap'>
                <div className='commentLeftWrap'></div>
                <div className='commentRightWrap'>
                    <div className='commentProfileWrap'>
                        <img src='/image/male_icon.png' alt="프로필" className="profileImage" />
                        <span className="commentWriter">{item.memberName}</span>
                    </div>
                    <div className="commentDetails2">
                        <p className="commentContent">{formatContent(item.content)}</p>
                    </div>
                </div>
            </div>

            {/* 대댓글의 자식 대댓글 */}
            {item.children && item.children.length > 0 && (
                <div className='childCommentWrap'>
                    {item.children.map((subChild) => (
                        <CommentChild key={subChild.commentNo} item={subChild} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentChild;