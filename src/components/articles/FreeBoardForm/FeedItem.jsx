import React from 'react';

const FeedItem = () => {
    return (
        <a href={'/'}><p>고수에게 묻다. 자동차 정비</p>

            <div className={'feed-content'}>
                <div>
                    <section>
                        <h3>인산철 배터리 시거잭수리

                        </h3>
                        <p>
                            어쩌고 저쩌고
                        </p>
                    </section>
                    <p>인천 전체</p>
                </div>
            </div>
            <div className={'feed-footer'}>
                <div className={'user-interaction'}><span></span>
                    <span></span>
                </div>
                <span></span>
            </div>
        </a>
    );
};

export default FeedItem;