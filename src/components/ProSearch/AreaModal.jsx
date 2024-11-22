import React from 'react';

const AreaModal = ({ handleAreaSelect }) => {
    return (
        <div className='areaModal'>
            <h2 className='areaModaltile'>지역</h2>
            <ul className='modalMainMenu'>
                {[
                    '전국', '서울', '강원', '인천', '경기',
                    '충북', '충남', '경북', '대전', '대구',
                    '전북', '경남', '울산', '광주', '부산',
                    '전남', '제주'
                ].map((area) => (
                    <li key={area} onClick={() => handleAreaSelect(area)}>{area}</li>
                ))}
            </ul>
        </div>
    );
};

export default AreaModal;
