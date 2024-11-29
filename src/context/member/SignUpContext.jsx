import React, { createContext, useState } from 'react';
import checkPost from '../../js/daumpost';
import { useNavigate } from 'react-router-dom';
import apiAxios from '../../api/apiAxios';

const SignUpContext = createContext();

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phone: '',
    authCode: '',
    zipcode: '',
    address1: '',
    address2: '',
    address: '',
};

const initialErrors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    zipcode: '',
    address1: '',
    address2: '',
    address: '',
};

const SignUpProvider = ({ children }) => {
    const [signup, setSignup] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const [isReadonly, setIsReadonly] = useState({
        zipcode: false,
        address1: false,
        address2: false,
    });

    const navigate = useNavigate();

    const goMain = () => {
        navigate(`/`);
    };

    const goLogin = () => {
        navigate(`/`);
    };

    const updateSignUpData = async (field, value) => {
        setSignup((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        if (field === 'email') {
            await checkDuplicateEmail(value);
        }

        validateField(field, value);
    };

    const checkDuplicateEmail = async (email) => {
        try {
            const response = await apiAxios.get('/api/signup/check/email', {
                params: { email },
            });

            if (response.data) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: '이미 사용 중인 이메일입니다.',
                }));
                return false;
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: '',
                }));
                return true;
            }
        } catch (error) {
            console.error('이메일 중복체크 실패:', error);
            return false;
        }
    };

    const validateField = (field, value) => {
        let error = '';
        switch (field) {
            case 'name':
                if (!value) {
                    error = '이름을 입력해주세요.';
                } else if (!/^[가-힣]{3,6}$/.test(value)) {
                    error = '이름은 한글로 3~6글자여야 합니다.';
                }
                break;
            case 'email':
                if (!value) {
                    error = '이메일을 입력해주세요.';
                } else if (!/^[a-z0-9]+@[a-z]+\.[a-z]+$/.test(value)) {
                    error = '이메일은 올바른 형식이어야 합니다.';
                }
                break;
            case 'password':
                if (!value) {
                    error = '비밀번호를 입력해주세요.';
                } else if (/(.)\1{2,}/.test(value)) {
                    error = '비밀번호에 연속으로 같은 문자를 3번 이상 사용할 수 없습니다.';
                } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?,.<>]).{12,20}$/.test(value)) {
                    error = '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함하며, 12~20자리여야 합니다.';
                }
                break;
            case 'confirmPassword':
                if (!value) {
                    error = '비밀번호 확인을 입력해주세요.';
                } else if (value !== signup.password) {
                    error = '비밀번호가 일치하지 않습니다.';
                }
                break;
            case 'phone':
                if (!value) {
                    error = '휴대전화 번호를 입력해주세요.';
                } else if (!/^010-\d{4}-\d{4}$/.test(value)) {
                    error = '휴대전화 번호는 010-xxxx-xxxx 형식이어야 합니다.';
                }
                break;
            case 'gender':
                if (!value) {
                    error = '성별을 선택해주세요.';
                }
                break;
            case 'zipcode':
                if (!value) {
                    error = '우편번호를 입력해주세요.';
                }
                break;
            case 'address1':
                if (!value) {
                    error = '주소를 입력해주세요.';
                }
                break;
            case 'address2':
                if (!value) {
                    error = '상세 주소를 입력해주세요.';
                }
                break;
            case 'address':
                if (!value) {
                    error = '주소를 입력해주세요.';
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };

    const validateForm = () => {
        const fieldsToValidate = Object.keys(signup);
        let isValid = true;

        fieldsToValidate.forEach((field) => {
            const value = signup[field];
            validateField(field, value);

            if (!value || errors[field]) {
                isValid = false;
            }
        });

        return isValid;
    };

    const handleAddressSearch = () => {
        if (typeof daum === 'undefined' || !daum.Postcode) {
            console.error("Daum Postcode API가 로드되지 않았습니다.");
            return;
        }

        checkPost((key, value) => {
            updateSignUpData(key, value);
            setIsReadonly({
                zipcode: true,
                address1: true,
                address2: false,
            });
        });
    };

    return (
        <SignUpContext.Provider
            value={{
                signup,
                errors,
                isReadonly,
                updateSignUpData,
                handleAddressSearch,
                validateForm,
                goMain,
                goLogin,
            }}>
            {children}
        </SignUpContext.Provider>
    );
};

export { SignUpProvider, SignUpContext };
