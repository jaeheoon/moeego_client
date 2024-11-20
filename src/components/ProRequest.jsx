import React from 'react';

const ProRequest = () => {
    return (
        <div>
            <div>
            <h1>고수 신청 페이지</h1>
            </div>
            <div>
                <form>
                    <label>
                        이름
                        <input
                            type="text"
                            name="name"
                            value='윤강준'
                            readOnly
                        />
                    </label>
                    <label>
                        한줄소개
                        <input
                            type="text"
                            name="subject"
                            value=''
                            placeholder="간단히 본인을 소개해주세요"
                        />
                    </label>
                    <label>
                        서비스 소개
                        <textarea
                            name="content"
                            value=''
                            placeholder="제공할 서비스에 대해 설명해주세요"
                        />
                    </label>
                    <div>
                        <button type="button">
                            취소
                        </button>
                        <button type="submit">
                            신청
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProRequest;