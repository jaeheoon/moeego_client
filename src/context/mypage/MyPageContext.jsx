import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../member/AuthContext';
import apiAxios from '../../api/apiAxios';
import { useNavigate } from 'react-router-dom';

const MyPageContext = createContext();

const MyPageProvider = ({ children }) => {
    const [nickname, setNickname] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [oneintroduction, setOneIntroduction] = useState('');
    const [isToggleWrap1Visible, setIsToggleWrap1Visible] = useState(false);
    const [isToggleWrap2Visible, setIsToggleWrap2Visible] = useState(false);
    const [memberNo, setMemberNo] = useState('');
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(localStorage.getItem('userprofile'));
    const [isSaving, setIsSaving] = useState(false);
    const [isProfileImageChanged, setIsProfileImageChanged] = useState(false);
    const { isLoggedIn, loginEmail, loginUser, setLoginUser, loginStatus, setLoginProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setNickname(nickname);
        setLoginUser(nickname);
    }, [nickname]);

    useEffect(() => {
        const username = localStorage.getItem('username');
        setMemberNo(localStorage.getItem('userno'));

        setNickname(username);
    }, [isLoggedIn]);

    const toggleWrap1 = () => setIsToggleWrap1Visible((prev) => !prev);
    const toggleWrap2 = () => setIsToggleWrap2Visible((prev) => !prev);

    const handleCheckProfile = (profile) => {
        if (!profile || profile === 'null' || profile === null || profile === 'undefined' || profile === undefined) {
            setProfileImage('/image/default.svg'); // 기본 프로필 이미지 설정
        } else {
            setProfileImage(profile);
        }
    };

    const handleNicknameCancel = () => {
        setNickname(localStorage.getItem('username'));
    };

    const handleIntroductionCancel = () => {
        setIntroduction(localStorage.getItem('userintro'));
    };

    // 닉네임 유효성 검사 함수
    const validateNickname = (nickname) => {
        if (!nickname) {
            alert('닉네임은 필수입니다.');
            return false;
        }
        if (nickname.length < 3 || nickname.length > 20) {
            alert('닉네임은 1자 이상 20자 이하로 입력해야 합니다.');
            return false;
        }

        // 영어 소문자, 숫자, 한글만 허용하는 정규 표현식
        const regex = /^[a-z0-9가-힣]+$/;
        if (!regex.test(nickname)) {
            alert('닉네임은 영어 소문자, 숫자, 한글만 사용 가능합니다.');
            return false;
        }

        return true;
    };

    // 소개글 유효성 검사 함수
    const validateIntroduction = (introduction) => {
        if (introduction.length > 50) {
            alert('소개글은 50자 이하로 입력해야 합니다.');
            return false;
        }
        return true;
    };

    // 저장하기 전에 유효성 검사
    const handleNicknameSave = async () => {
        if (!validateNickname(nickname)) return; // 유효성 검사 통과 안하면 종료

        try {
            const response = await apiAxios.patch('/api/mypage/account/private/update/name', { nickname });
            if (response.data && response.data.success) {
                setNickname(response.data.data.updateName);
                localStorage.setItem('username', response.data.data.updateName);
                setIsToggleWrap1Visible(false);
                window.location.reload();
            } else {
                alert('닉네임 변경에 실패했습니다.');
            }
        } catch (error) {
            alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            console.log(error);
        }
    };

    const handleIntroductionSave = async () => {
        if (!validateIntroduction(introduction)) return; // 유효성 검사 통과 안하면 종료

        try {
            await apiAxios.patch('/api/mypage/account/private/update/oneintro', { introduction });
            setIsToggleWrap2Visible(false);  // 저장 후 닫기
        } catch (error) {
            console.error('소개 변경 실패:', error);
        }
    };

    const handleProfileBtnClick = () => {
        document.getElementById('fileInput').click();  // 파일 선택 창을 강제로 열기
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];
        const maxSize = 20 * 1024 * 1024; // 20MB in bytes

        if (file) {
            // 파일 형식 검증
            if (!allowedTypes.includes(file.type)) {
                alert('허용된 이미지 파일 형식(jpg, jpeg, png, gif, svg)만 업로드 가능합니다.');
                e.target.value = ''; // 파일 입력을 초기화하여 사용자가 다시 선택하도록 유도
                return;
            }

            // 파일 크기 검증
            if (file.size > maxSize) {
                alert('파일 크기는 20MB를 초과할 수 없습니다.');
                e.target.value = ''; // 파일 입력을 초기화
                return;
            }

            // 파일을 FormData에 추가하여 서버로 전송
            const formData = new FormData();
            formData.append('image', file);
            formData.append('memberNo', memberNo);

            // 이미지 업로드 요청
            apiAxios.put('/api/image/profileUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    // 서버 응답을 통해 프로필 이미지 URL을 받음
                    const newProfileImageUrl = response.data.data;

                    // 성공적으로 업로드된 후, 프로필 이미지 상태와 로컬 스토리지를 업데이트
                    setLoginProfile("https://kr.object.ncloudstorage.com/moeego/profile/" + newProfileImageUrl);
                    setProfileImage("https://kr.object.ncloudstorage.com/moeego/profile/" + newProfileImageUrl);
                    localStorage.setItem('userprofile', "https://kr.object.ncloudstorage.com/moeego/profile/" + newProfileImageUrl);

                    // 프로필 이미지 변경 상태를 초기화
                    setIsProfileImageChanged(false);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('프로필 이미지 업로드 오류:', error);
                    alert('이미지 업로드에 실패했습니다.');
                    navigate('/mypage/account');
                });
        }
    };

    // useEffect(() => {
    //     const loginStatus = localStorage.getItem('login');
    //     const storedProfileImage = localStorage.getItem('userprofile');
    //     // 로그인 상태가 변경될 때마다 프로필 이미지 상태를 갱신
    //     if (loginStatus || loginStatus === 'true') {
    //         handleCheckProfile(storedProfileImage);
    //     } else {
    //         localStorage.removeItem('userprofile');
    //         setProfileImage('/image/profile.svg'); // 기본 이미지 설정
    //     }
    // }, [isLoggedIn]);  // isLoggedIn 상태가 변경될 때마다 실행

    return (
        <MyPageContext.Provider value={{
            nickname,
            setNickname,
            introduction,
            setIntroduction,
            isToggleWrap1Visible,
            toggleWrap1,
            isToggleWrap2Visible,
            toggleWrap2,
            loading,
            handleNicknameCancel,
            setIsToggleWrap1Visible,
            setIsToggleWrap2Visible,
            handleIntroductionCancel,
            handleNicknameSave,
            handleIntroductionSave,
            handleProfileImageChange,
            setProfileImage,
            profileImage,
            handleProfileBtnClick,
            oneintroduction,
            setOneIntroduction
        }}>
            {children}
        </MyPageContext.Provider>
    );
};

export { MyPageProvider, MyPageContext };
