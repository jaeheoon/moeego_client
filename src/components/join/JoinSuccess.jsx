import React from 'react';
import '../../css/join/JoinSuccess.css';
import { useLocation, useNavigate } from 'react-router-dom';

const JoinSuccess = () => {
    const { state } = useLocation();
    const name = state?.name;

    const navigate = useNavigate();

    const GoMain = () => {
        navigate('/');
    }

    const GoLogin = () => {
        navigate('/login');
    }

    return (
        <div className='SuccessPage'>
            <div className='SuccessWrap'>
                <div className='logoWrap'>
                    <img src='/image/moeego.png' alt='logo' />
                </div>
                <h3>{name}님</h3>
                <span>모이고에 오신것을 환영합니다.</span>
                <div className='buttonWrap'>
                    <input type='button' value='메인' onClick={GoMain} />
                    <input type='button' value='로그인' onClick={GoLogin} />
                </div>
            </div>
        </div>
    );
};

export default JoinSuccess;