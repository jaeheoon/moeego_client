import React from 'react';

const ReviewItem = ({item}) => {
    return (
        <article>
            <section>
                {/* 달인 이름름 */}
                <span>{item.proName}</span>
            </section>
            <section>
                <div className='ImageFeat'>
                    <img src='/image/naver_green.svg' alt='naver' />
                </div>
            </section>
            <section>
                {/* 서비스 이름 */}
                <p>{item.subject} <img data-v-c160b016="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Im03LjQ5NiAxLjU5NiAxLjQwNyAyLjc0MiAzLjE0NS40NGMuOTEuMTI3IDEuMjc1IDEuMjA0LjYxNSAxLjgyMmwtMi4yNzYgMi4xMzQuNTM4IDMuMDE1Yy4xNTUuODcyLS43OTcgMS41MzgtMS42MTIgMS4xMjZMNi41IDExLjQ1MmwtMi44MTMgMS40MjNjLS44MTUuNDEyLTEuNzY3LS4yNTQtMS42MTItMS4xMjZsLjUzOC0zLjAxNUwuMzM3IDYuNmMtLjY2LS42MTgtLjI5Ni0xLjY5NS42MTUtMS44MjJsMy4xNDUtLjQ0IDEuNDA3LTIuNzQyQzUuOTEyLjggNy4wODguOCA3LjQ5NiAxLjU5NiIgZmlsbD0iI0ZGQ0UyMSIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo=" alt="평점" /> 5.0</p>
            </section>
            <section>
                <p className='content'>
                    {/* 리뷰 내용 */}
                    {item.reviewContent}
                </p>
            </section>
            <section>
                {/* 리뷰 쓴 사람 이름 */}
                <span>{item.memberName}</span>
                {/* 작성일 */}
                <span>{item.elapsedTime}</span>
            </section>
        </article>
    );
};

export default ReviewItem;