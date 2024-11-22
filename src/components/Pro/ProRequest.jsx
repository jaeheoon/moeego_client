import React from 'react';
import '../../css/Pro/ProRequest.css'

const ProRequest = () => {
    return (
        <div className="pro-request-container">
            <div className="pro-request-header">
                <h1>고수 신청 페이지</h1>
            </div>
            <div className="pro-request-form-container">
                <form className="pro-request-form">
                    <label className="pro-request-label">
                        이름
                        <input
                            type="text"
                            name="name"
                            value="윤강준"
                            readOnly
                            className="pro-request-input"
                        />
                    </label>
                    <label className="pro-request-label">
                        한줄소개
                        <input
                            type="text"
                            name="subject"
                            value=""
                            placeholder="간단히 본인을 소개해주세요"
                            className="pro-request-input"
                        />
                    </label>
                    <label className="pro-request-label">
                        서비스 소개
                        <textarea
                            name="content"
                            value=""
                            placeholder="제공할 서비스에 대해 설명해주세요"
                            className="pro-request-textarea"
                        />
                    </label>
                    <div className="pro-request-button-container">
                        <button type="button" className="pro-request-button cancel">
                            취소
                        </button>
                        <button type="submit" className="pro-request-button submit">
                            신청
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProRequest;
