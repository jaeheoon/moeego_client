import React, { createContext, useState } from "react";
import checkPost from "../../js/daumpost";
import { useNavigate } from "react-router-dom";
import apiAxios from "../../api/apiAxios";

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

const SignUpProvider = ({ children }) => {
    const [signup, setSignup] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [isReadonly, setIsReadonly] = useState({
        zipcode: false,
        address1: false,
        address2: false,
    });



    const navigate = useNavigate();

    const goMain = () => navigate(`/`);
    const goLogin = () => navigate(`/login`);
    const goSuccess = (name) => navigate(`/signup/success`, { state: { name } });

    const updateSignUpData = (field, value) => {
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
            console.log(response.data);

            if (!response.data) {
                setIsEmailChecked(true);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "사용 가능한 이메일입니다.", // 오류 메시지 제거
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
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?,.<>]).{12,20}$/.test(value)
                ) {
                    error =
                        "비밀번호는 대소문자, 숫자, 특수문자를 포함하며, 12~20자리여야 합니다.";
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
        if (!validateForm()) {
            alert("입력한 정보를 확인해주세요.");
            return;
        }

        if (!isEmailChecked) {
            alert("이메일 중복 체크를 완료해주세요.");
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
                setIsEmailChecked,
                updateSignUpData,
                handleAddressSearch,
                submitSignupForm,
                goMain,
                goLogin,
                isReadonly,
                isEmailChecked,
                checkEmailDuplication
            }}
        >
            {children}
        </SignUpContext.Provider>
    );
};

export { SignUpProvider, SignUpContext };
