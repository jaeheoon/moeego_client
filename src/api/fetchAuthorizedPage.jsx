import fetchReissue from "../services/fetchReissue";
import apiAxios from './apiAxios';

// 권한이 있는 페이지 접근 시 access 토큰을 검증
const fetchAuthorizedPage = async (url, navigate, location) => {
    try {
        const response = await apiAxios.post(url, null, {
            headers: {
                access: window.localStorage.getItem("access"),
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data; // 페이지 데이터를 반환
        } else {
            const reissueSuccess = await fetchReissue();
            if (reissueSuccess) {
                return await fetchAuthorizedPage(url, navigate, location);
            } else {
                alert('관리자가 아닙니다.');
                navigate('/', { state: location.pathname });
            }
        }
    } catch (error) {
        console.error('Error: ', error);
        navigate('/', { state: location.pathname });
    }
    return;
};


export default fetchAuthorizedPage;
