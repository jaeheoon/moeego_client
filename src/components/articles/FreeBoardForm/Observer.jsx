import React from 'react';

const Observer = () => {
    return (
        <div className={'observer-container'}>
            <section>
            <h1>커뮤니티</h1>
            </section>
            <div>
                <div>
                    <button>글쓰기</button>
                </div>
            </div>
            <ul>
                <li>
                    <a href={'/'}>숨고생활</a>
                </li>
                <li>
                    <a href={'/'}>고수센터</a>
                </li>
            </ul>

        </div>
    );
};

export default Observer;