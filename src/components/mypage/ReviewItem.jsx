import React from 'react';

const ReviewItem = () => {
    return (
        <article>
            <section>
                <span>윤강준</span>
            </section>
            <section>
                <div className='ImageFeat'>
                    <img src='/image/naver_green.svg' alt='naver' />
                </div>
            </section>
            <section>
                <p>이사의 달인 <img data-v-c160b016="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Im03LjQ5NiAxLjU5NiAxLjQwNyAyLjc0MiAzLjE0NS40NGMuOTEuMTI3IDEuMjc1IDEuMjA0LjYxNSAxLjgyMmwtMi4yNzYgMi4xMzQuNTM4IDMuMDE1Yy4xNTUuODcyLS43OTcgMS41MzgtMS42MTIgMS4xMjZMNi41IDExLjQ1MmwtMi44MTMgMS40MjNjLS44MTUuNDEyLTEuNzY3LS4yNTQtMS42MTItMS4xMjZsLjUzOC0zLjAxNUwuMzM3IDYuNmMtLjY2LS42MTgtLjI5Ni0xLjY5NS42MTUtMS44MjJsMy4xNDUtLjQ0IDEuNDA3LTIuNzQyQzUuOTEyLjggNy4wODguOCA3LjQ5NiAxLjU5NiIgZmlsbD0iI0ZGQ0UyMSIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo=" alt="평점" /> 5.0</p>
            </section>
            <section>
                <p className='content'>
                    최근 이용한 서비스에 대해 솔직히 작성하자면, 전반적으로 매우 만족스러웠습니다. 우선 서비스의 응대 속도가 굉장히 빨랐고, 고객의 요구사항을 귀 기울여 듣는 모습이 인상 깊었습니다. 특히, 상담 과정에서 친절한 태도와 전문적인 설명 덕분에 신뢰를 가질 수 있었습니다.
                    서비스 품질도 기대 이상이었고, 사용 과정에서 느낀 편리함과 효율성은 정말 탁월했습니다.
                    결론적으로, 해당 서비스를 이용하면서 높은 수준의 만족도를 경험했으며, 지인들에게도 추천하고 싶을 정도로 신뢰할 수 있는 서비스였습니다. 앞으로도 지속적으로 이용하고 싶습니다! 😊
                </p>
            </section>
            <section>
                <span>2024.11.18</span>
            </section>
        </article>
    );
};

export default ReviewItem;