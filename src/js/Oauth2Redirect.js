// import { useNavigate, useSearchParams } from "react-router-dom";
// import { AuthContext } from "../context/member/AuthContext";
// import { useContext } from 'react';

// const OAuth2Redirect = () => {
//     const navigate = useNavigate();
//     const { setIsLoggedIn, setLoginUser } = useContext(AuthContext);

//     const OAuth2JwtHeaderFetch = async () => {
//         const [queryParams] = useSearchParams();
//         try {
//             const response = await fetch("http://localhost:8080/oauth2-jwt-header", {
//                 method: "POST",
//                 credentials: "include",
//             });

//             console.log(response);

//             if (response.ok) {
//                 // local storage access token set
//                 window.localStorage.setItem("access", response.headers.get("access"));
//                 // local storage name set
//                 const name = queryParams.get('name');
//                 console.log(name);
//                 window.localStorage.setItem("name", name);

//                 setIsLoggedIn(true);
//                 setLoginUser(name);
//             } else {
//                 alert('접근할 수 없는 페이지입니다.');
//             }
//             navigate('/', { replace: true });
//         } catch (error) {
//             console.log("error: ", error);
//         }
//     }

//     // request access token in header using httpOnly cookie, and set access token to local storage
//     OAuth2JwtHeaderFetch();
//     return;
// };


// export default OAuth2Redirect;