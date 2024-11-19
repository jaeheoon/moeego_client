import React from 'react';

const Write = () => {
    return (
        <div> 
            <div> 
                <div> 
                    <selection> 
                        <div> 
                            <div> 
                                <select> 
                                    <option disabled="disabled">주제 선택</option>
                                    <option>고수 게시판</option>
                                    <option>자유 게시판</option>
                                    <option>QnA</option>
                                </select>
                                <button disabled="disabled">등록</button>
                            </div>
                        </div>

                        <div> 
                            <div>
                                <div></div>
                                <div>
                                    <input type='file'></input>
                                    <label>
                                        <span>No file chosen</span>
                                    </label>
                                </div>
                                <span>0/15</span>
                            </div>
                        </div>
                        
                        
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <label>
                                            <input type='text' placeholder='제목을 입력해주세요'></input>
                                        </label>
                                    </div>
                                </div>
                                <div><hr/></div>    
                                <div>
                                    <button>
                                        <span>(선택) 서비스</span>
                                    </button>
                                    <button>
                                        <span>(선택) 지역</span>
                                    </button>
                                </div>
                                <div><hr/></div>

                                <div>
                                    <span>
                                        <textarea></textarea>
                                    </span>
                                    <span>과외 친구, 공동 구매 그룹 , 취미활동까지 함께 할 사람을 찾아보세요. 예) 게임을 좋아하는 분 누구나</span>
                                </div>
                            </div>
                        </div>
                    </selection>
                </div>
            </div>
        </div>
    );
};

export default Write;