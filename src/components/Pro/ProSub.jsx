import React from 'react';

const ProjoinSub = () => {
    return (
        <div>
            <div id="projoinSub_container">
                <form>
                    <h1>어떤 서비스를 제공할 수 있나요?</h1>
                    <div>
                        {/* 여기에 포이치 돌려서 메인카테고리 별서브 카테고리 찍을 예정 */}
                        <div>
                            <input type='checkbox' />
                            <label>이사</label>
                        </div>
                        <div>
                            <input type='checkbox' />
                            <label>입주</label>
                        </div>
                        <div>
                            <input type='checkbox' />
                            <label>사업장 청소</label>
                        </div>
                        <div>
                            <input type='checkbox' />
                            <label>특수 청소</label>
                        </div>
                        <div>
                            <input type='checkbox' />
                            <label>철거/폐거</label>
                        </div>
                        <div>
                            <input type='checkbox' />
                            <label>이사</label>
                        </div>
                        <div>
                            <span>
                                <button>이전</button>
                            </span>
                            <span>
                                <button>다음</button>
                            </span>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjoinSub;