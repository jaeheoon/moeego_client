import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ResetScrollOnNavigate = () => {
    const location = useLocation();

    useEffect(() => {
        // 스크롤 위치 초기화
        window.scrollTo(0, 0);

        // 스크롤 복원
        document.body.style.overflow = "auto";
    }, [location]);

    return null;
};

export default ResetScrollOnNavigate;
