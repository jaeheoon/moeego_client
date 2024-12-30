import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiAxios from "../../api/apiAxios";
import checkPost from "../../js/daumpost";

const SignUpContext = createContext();

const initialState = {
    name: "",
    email: "",
    pwd: "",
    confirmpwd: "",
    gender: "",
    phone: "",
    zipcode: "",
    address1: "",
    address2: "",
    address: "", // 서버로 통합된 주소를 전송
};

const initialErrors = {
    name: "",
    email: "",
    pwd: "",
    confirmpwd: "",
    phone: "",
    gender: "",
    zipcode: "",
    address1: "",
    address2: "",
    address: "",
};

const initialSuccess = {
    name: "",
    email: "",
    pwd: "",
    confirmpwd: "",
    phone: "",
    gender: "",
    zipcode: "",
    address1: "",
    address2: "",
    address: "",
};

const SignUpProvider = ({ children }) => {
    const [signup, setSignup] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);
    const [success, setSuccess] = useState(initialSuccess);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [isReadonly, setIsReadonly] = useState({
        zipcode: false,
        address1: false,
        address2: false,
    });
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationAttempts, setVerificationAttempts] = useState(0);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [errorVerification, setErrorVerification] = useState("");

    const navigate = useNavigate();

    const goMain = () => navigate(`/`);
    const goLogin = () => navigate(`/login`);
    const goSuccess = (name) => navigate(`/signup/success`, { state: { name } });

    const updateSignUpData = (field, value) => {
        if (field === 'email') {
            // 이메일이 변경되면 인증 상태를 초기화
            setIsEmailVerified(false);  // 이메일 인증 상태 리셋
            setVerificationCode('');  // 인증 코드 리셋
            setVerificationAttempts(0);  // 인증 시도 횟수 리셋
            setErrorVerification('');  // 인증 오류 메시지 리셋
            setIsEmailChecked(false);  // 이메일 중복 체크 초기화
        }

        setSignup((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        validateField(field, value);
    };


    const checkEmailDuplication = async () => {
        if (!signup.email) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "이메일을 입력해주세요.",
            }));
            setIsEmailChecked(false);
            return;
        }

        if (errors.email) {
            setIsEmailChecked(false);
            return; // 이메일 형식 오류가 있으면 실행하지 않음
        }

        try {
            const response = await apiAxios.post("/api/join/exist", { email: signup.email });
            if (!response.data) {
                setIsEmailChecked(true);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "",
                }));
                setSuccess((prevSuccess) => ({
                    ...prevSuccess,
                    email: "사용 가능한 이메일입니다.",
                }));
            } else {
                setIsEmailChecked(false);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "이미 사용 중인 이메일입니다.",
                }));
            }
        } catch (error) {
            console.error("이메일 중복 체크 실패:", error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "이메일 중복 체크 중 문제가 발생했습니다.",
            }));
            setIsEmailChecked(false);
        }
    };

    const handleResendVerification = async () => {
        if (verificationAttempts >= 3) {
            setErrorVerification("인증번호 확인을 3회 이상 틀렸습니다. 재발송을 눌러주세요.");
            return;
        }

        try {
            const response = await apiAxios.post('/api/mypage/account/private/mailSend', { email: signup.email });
            if (response.status === 200) {
                setErrorVerification(`${signup.email}로 인증번호가 발송되었습니다.`);
                setVerificationAttempts(0); // Reset attempts after successful resend
            } else {
                setErrorVerification("인증번호 발송 실패. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("인증번호 재발송 실패:", error);
            setErrorVerification("인증번호 재발송 중 오류가 발생했습니다.");
        }
    };

    const handleEmailVerification = async () => {
        if (verificationAttempts >= 3) {
            setErrorVerification("인증번호 확인을 3회 이상 틀렸습니다. 재발송을 눌러주세요.");
            return;
        }

        try {
            const response = await apiAxios.post('/api/mypage/account/private/mailCheck', {
                num: verificationCode,
            });

            console.log(response);

            if (response.data.success) {
                setIsEmailVerified(true);
                setErrorVerification("");
                setSuccess((prevSuccess) => ({
                    ...prevSuccess,
                    email: "인증번호가 일치합니다.",
                }));
            } else {
                setErrorVerification("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
                setVerificationAttempts(prevAttempts => prevAttempts + 1);
            }
        } catch (error) {
            console.error("인증번호 확인 실패:", error);
            if (error.response.status === 400) {
                setErrorVerification(error.response.data.message);
            } else {
                setErrorVerification("인증번호 확인 중 오류가 발생했습니다.");
            }
        }
    };

    const validateField = (field, value) => {
        let error = "";
        switch (field) {
            case "name":
                if (!value) {
                    error = "이름을 입력해주세요.";
                } else if (!/^[가-힣]{2,6}$/.test(value)) {
                    error = "이름은 한글로 2~6글자여야 합니다.";
                }
                break;
            case "email":
                if (!value) {
                    error = "이메일을 입력해주세요.";
                } else if (!/^[a-z0-9]+@[a-z]+\.[a-z]+$/.test(value)) {
                    error = "올바른 이메일 형식이 아닙니다.";
                }
                break;
            case "pwd":
                if (!value) {
                    error = "비밀번호를 입력해주세요.";
                } else if (
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?,.<>]).{8,20}$/.test(value)
                ) {
                    error =
                        "비밀번호는 대소문자, 숫자, 특수문자를 포함하며, 8~20자리여야 합니다.";
                }
                break;
            case "confirmpwd":
                if (!value) {
                    error = "비밀번호 확인을 입력해주세요.";
                } else if (value !== signup.pwd) {
                    error = "비밀번호가 일치하지 않습니다.";
                }
                break;
            case "phone":
                if (!value) {
                    error = "휴대전화 번호를 입력해주세요.";
                } else if (!/^010-\d{4}-\d{4}$/.test(value)) {
                    error = "휴대전화 번호는 010-xxxx-xxxx 형식이어야 합니다.";
                }
                break;
            case "gender":
                if (!value) {
                    error = "성별을 선택해주세요.";
                }
                break;
            case "zipcode":
            case "address1":
            case "address2":
                if (!value) {
                    error = `${field === "zipcode" ? "우편번호" : "주소"}를 입력해주세요.`;
                }
                break;
            default:
                break;
        }

        // 오류 상태 업데이트
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error || "", // 오류 메시지 없으면 빈 문자열로 설정
        }));

        return error || null; // 오류가 없으면 null 반환
    };

    const validateForm = () => {
        const fieldsToValidate = Object.keys(signup);
        let isValid = true;
        let tempErrors = {}; // 임시 오류 객체

        fieldsToValidate.forEach((field) => {
            const value = signup[field];
            const fieldError = validateField(field, value); // validateField가 오류 메시지를 반환하도록 변경

            if (fieldError) {
                tempErrors[field] = fieldError;
                isValid = false;
            }
        });

        setErrors(tempErrors); // 모든 오류를 한 번에 상태로 업데이트
        return isValid;
    };

    const submitSignupForm = async () => {
        // 이메일 중복 체크를 완료했는지 확인
        if (!isEmailChecked) {
            alert("이메일 중복 체크를 완료해주세요.");
            return;
        }

        // 이메일 인증이 완료되지 않았다면
        if (!isEmailVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }

        // 유효성 검사
        if (!validateForm()) {
            alert("입력한 정보를 확인해주세요.");
            return;
        }

        try {
            const combinedAddress = `${signup.address1} ${signup.address2} (${signup.zipcode})`.trim();
            const dataToSubmit = {
                ...signup,
                address: combinedAddress,
                gender: signup.gender === "M" ? 1 : signup.gender === "F" ? 2 : 0
            };

            const response = await apiAxios.post("/api/join", dataToSubmit);

            if (response.status === 200) {
                goSuccess(signup.name);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data || "잘못된 요청입니다.";
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: errorMessage,
                }));
                alert(errorMessage);
            } else {
                console.error("회원가입 요청 실패:", error);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "회원가입 중 문제가 발생했습니다.",
                }));
                alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    // 주소 검색 처리
    const handleAddressSearch = () => {
        if (typeof daum === "undefined" || !daum.Postcode) {
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
                success,  // Success 상태 추가
                isReadonly,
                isEmailChecked,
                isEmailVerified,
                verificationCode,
                verificationAttempts,
                errorVerification,
                setVerificationCode,
                setIsEmailChecked,
                updateSignUpData,
                handleAddressSearch,
                submitSignupForm,
                checkEmailDuplication,
                handleEmailVerification,
                handleResendVerification,
                goMain,
                goLogin,
            }}
        >
            {children}
        </SignUpContext.Provider>
    );
};

export { SignUpProvider, SignUpContext };
