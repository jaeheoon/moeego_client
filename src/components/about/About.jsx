import React from 'react';

const About = () => {
    return (
        <div className='homepageInfoPage'>
            <div className='infoBannerWrap'>
                <div className='infoWrap'>
                    <h2>모이고의 미션</h2>
                    <p>모이고는 여러분들이 도움을 필요로 하는 일을 도와줄 달인이 모이는 장소에요.</p>
                </div>
            </div>
            <div className='infoFitProWrap'>
                <div>
                    <h2>딱! 맞는 달인을 만나세요</h2>
                    <hr/>
                    <p>필요한 사람을 찾는 일에 에너지와 시간을 낭비하지 마세요. 
                        모이고에는 여러분들이 찾는 달인들이 모여있어요</p>
                </div>
            </div>
            <div className='infoProCountWrap'>
                display:grid로 3개씩 두줄로 표현
                Count로 각자 카테고리에 해당하는 달인 수 출력
            </div>
            <div className='infoJoinWrap'>
                <div>
                    <h2>모이고에 가입해보세요</h2>
                    <hr/>
                    <input  type='button' value='일반 회원 가입'/>
                    <input  type='button' value='달인 회원 가입'/>
                    <p>이미 계정이 있으신가요?</p>
                </div>
            </div>
        </div>
    );
};

export default About;