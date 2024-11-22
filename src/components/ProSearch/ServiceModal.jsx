import React, { useState } from 'react';

const ServiceModal = ({ handleServiceSelect }) => {
    const [openIndex, setOpenIndex] = useState(null); // 어떤 메뉴가 열려있는지 추적

    const toggleSubMenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSubItemClick = (subItem) => {
        handleServiceSelect(subItem); // 선택한 서브 아이템을 부모 컴포넌트로 전달
    };

    return (
        <div className='serviceModal'>
            <div className='modalTitle'>서비스</div>
            <ul className='modalMainMenu'>
                {[
                    {
                        title: '홈 / 인테리어',
                        subItems: ['이사 / 청소', '설치 / 수리', '철거 / 폐기', '인테리어 / 시공', '가구리폼 / 운반'],
                    },
                    {
                        title: '외주',
                        subItems: ['디자인 / 모델링', '개발 / 데이터', '음향 / 더빙', '이벤트', '강의 / 컨설팅'],
                    },
                    {
                        title: '패션 / 뷰티',
                        subItems: ['헤어 / 메이크업', '코디', '퍼스널컬러 / 이미지메이킹', '촬영 / 모델', '피부 / 탈모'],
                    },
                    {
                        title: '직무 / 과외',
                        subItems: ['과외 / 입시', '논술 / 논문', '취업 / 창업', '자격증 / 시험', '실무레슨 / 교육'],
                    },
                    {
                        title: '취미 / 자기계발',
                        subItems: ['음악 / 악기', '운동 / 대회', '연기 / 댄스', '미술 / 사진', '요리 / 베이킹'],
                    },
                    {
                        title: '자동차',
                        subItems: ['세차', '설치 / 수리', '썬팅 / 튜닝', '매각 / 매매', '캠핑카제작 / 렌탈'],
                    },
                ].map((item, index) => (
                    <li key={index}>
                        <div onClick={() => toggleSubMenu(index)} className='menuTitle'>
                            {item.title}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0791 17.3C12.278 17.2991 12.4684 17.2191 12.6084 17.0778L20.3326 9.27778C20.6241 8.98346 20.6218 8.5086 20.3274 8.21714C20.0331 7.92568 19.5583 7.92799 19.2668 8.22231L12.0703 15.4894L4.72747 8.21716C4.43316 7.92569 3.95829 7.92799 3.66682 8.22229C3.37535 8.5166 3.37764 8.99146 3.67195 9.28294L11.5477 17.0829C11.6891 17.2229 11.8802 17.301 12.0791 17.3Z" fill="black"></path>
                            </svg>
                        </div>
                        {openIndex === index && (
                            <ul className='modalSubMenu'>
                                {item.subItems.map((subItem, subIndex) => (
                                    <li key={subIndex} onClick={() => handleSubItemClick(subItem)}>{subItem}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceModal;
