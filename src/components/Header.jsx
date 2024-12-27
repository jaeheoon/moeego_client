import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderModal from "./mypage/HeaderModal";
import { AuthContext } from '../context/member/AuthContext';
import { MyPageContext } from '../context/mypage/MyPageContext';
import apiAxios from '../api/apiAxios';
import "../css/Header.css";

function Header() {
  const [modalType, setModalType] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIconToggled, setIsIconToggled] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSearchButtonVisible, setIsSearchButtonVisible] = useState(true);
  const [userno, setUserno] = useState(localStorage.getItem('userno') || ''); // 초기값 설정
  const [profile, setUserProfile] = useState(localStorage.getItem('userprofile') || ''); // 초기값 설정
  const { isLoggedIn, loginEmail, loginUser, loginStatus, loginProfile } = useContext(AuthContext);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const [searchValue, setSearchValue] = useState(""); // 검색어 상태 관리
  const navigate = useNavigate();

  const handleSearch = (value) => {
    if (value.trim()) { // 검색어가 비어있지 않을 경우에만 이동
      navigate(`/search?value=${value}`); // 쿼리 파라미터에 검색어 포함
    } else {
      alert("검색어를 입력해주세요.");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") { // 엔터키 감지
      handleSearch(searchValue);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const newUserno = localStorage.getItem('userno');
      setUserno(newUserno || ''); // 값이 없을 경우 빈 문자열로 설정
      setUserProfile(localStorage.getItem('userprofile') || '');
    };

    // localStorage 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);

    // 초기 userno 값 설정
    handleStorageChange();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isLoggedIn]);

  // SNS 프로필 이미지 및 이메일 변환 함수
  const getSNSProfile = (email) => {
    const platform = email?.split(" ")[0];
    switch (platform) {
      case 'naver':
        return { img: "/image/naver_sns.png", email: `naver_user${userno}` };
      case 'kakao':
        return { img: "/image/kakao_sns.png", email: `kakao_user${userno}` };
      case 'google':
        return { img: "/image/google_sns.svg", email: `google_user${userno}` };
      default:
        return { img: "/image/moeego_login.png", email };
    }
  };

  const snsProfile = getSNSProfile(loginEmail);

  const openModal = (type) => {
    setModalType((prevType) => (prevType === type ? null : type));
    setIsIconToggled((prevState) => !prevState);
  };

  const closeModal = () => {
    setModalType(null);
    setIsIconToggled(false);
    document.body.style.overflow = "auto";
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      if (!prev) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "auto";
      return !prev;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const toggleSearch = () => {
    setIsSearchVisible(true);
    setIsSearchButtonVisible(false);
  };

  const handleFocusOut = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.relatedTarget)) {
      setIsSearchVisible(false);
      setIsSearchButtonVisible(true);
      document.body.style.overflow = "auto";
    }
  };

  const GoSignUp = () => {
    closeMenu();
    navigate('/signup');
  }

  const GoProSignUp = () => {
    closeMenu();
    navigate('/pro/signup/main');
  }

  const GoLogin = () => {
    navigate('/login');
  }

  const GoLogOut = () => {
    navigate('/logout');
  }

  const GoProAccess = () => {
    navigate('/pro/signup/main');
  }

  const closeAndAccessMenu = async () => {
    try {
      const response = await apiAxios.get("/api/admin/emailstatus");

      if (response.status === 200) {
        const access = Number(response.data);

        navigate(`/pro/result?access=${access}`);

      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error("Error: 사용자 정보를 찾을 수 없거나 이메일 상태를 찾을 수 없습니다.");
          alert("사용자를 찾을 수 없거나 이메일 상태를 찾을 수 없습니다.");
        } else {
          console.error(`Error: ${error.response.data || "An error occurred"}`);
          alert(`오류가 발생했습니다: ${error.response.data || "알 수 없는 오류"}`);
        }
      } else {
        console.error("Network error or other issue:", error);
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (isSearchVisible) {
      searchRef.current?.focus();
    }
  }, [isSearchVisible]);

  useEffect(() => {
    if (isMenuOpen || isSearchVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, isSearchVisible]);

  return (
    <header className="header">
      <div className="header-container">
        {/* 햄버거 메뉴 */}
        <div className="hamburger-menu" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          )}
        </div>

        {/* 드롭다운 메뉴 */}
        {isMenuOpen && (
          <div className='dropdown-menu' ref={dropdownRef}>
            <div className='dropdown-menu-close-wrap'>
              <button className="close-button" onClick={closeMenu}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </button>
            </div>
            <ul>
              {isLoggedIn ? (
                <li className='HamburgerUserInfoWrap'>
                  <Link to="/mypage" className='HamburgerUserInfoLinkWrap' onClick={closeMenu}>
                    <div>
                      <div>
                        <h3>{loginUser}님</h3>
                        <div>
                          <div>
                            <img
                              src={snsProfile.img}
                              alt="SNS"
                            />
                          </div>
                          <div>{snsProfile.email}</div>
                        </div>
                      </div>
                      <div>
                        <img className='loginProfileImg' src={profile} alt="profile" />
                      </div>
                    </div>
                  </Link>
                  <div className='HamburgerUserInfoButtonWrap'>
                    <input type="button" value="로그아웃" onClick={() => (closeMenu(), GoLogOut())} />
                    {loginStatus !== "ROLE_PRO" && loginStatus !== "ROLE_PEND_PRO" && loginStatus !== "ROLE_ADMIN" && loginStatus !== "ROLE_CANCEL_PRO" && loginStatus !== "ROLE_CANCEL" && (
                      <input type="button" value="달인전환" onClick={() => { closeMenu(), GoProAccess() }} />
                    )}

                    {loginStatus === 'ROLE_PEND_PRO' && (
                      <input type="button" value="승인대기" onClick={() => { closeAndAccessMenu() }} />
                    )}
                  </div>
                </li>
              ) : (
                <li className='HamburgerUserInfoWrap'>
                  <Link to="/login" className='HamburgerUserInfoLinkWrap' onClick={closeMenu}>
                    <div>
                      <h3>로그인을 해주세요</h3>
                    </div>
                  </Link>
                  <div className='HamburgerUserInfoButtonWrap'>
                    <input type="button" value="회원가입" onClick={GoSignUp} />
                    <input type="button" value="달인가입" onClick={GoProSignUp} />
                  </div>
                </li>
              )}
              <li>
                <Link to="/pro/search" onClick={closeMenu}>달인찾기</Link>
              </li>
              <li>
                <Link to="/article" onClick={closeMenu}>커뮤니티</Link>
              </li>
            </ul>
          </div>
        )}


        {/* 로고 */}
        <div className="logo"><Link to="/"><img src='/image/moeego.png' alt='moeegoLogo' /></Link></div>

        {/* 메뉴 */}
        <nav className="nav">
          <ul>
            <li>
              <Link to="/pro/search">달인찾기</Link>
            </li>
            <li>
              <Link to="/article">커뮤니티</Link>
            </li>
          </ul>
        </nav>

        {/* 검색창 */}
        <div className="search-bar">
          <input type="text"
            placeholder="검색할 내용을 입력하세요"
            className="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress} />
          <button className="search-button" onClick={() => handleSearch(searchValue)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="#ffffff"></path> </g></svg>
          </button>
        </div>

        {/* 검색 버튼 */}
        {isSearchButtonVisible && (
          <div className="moblieSearch" onClick={toggleSearch}>
            <button className='moblieSearchButton'>
              <svg viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="#ffffff"></path> </g></svg>
            </button>
          </div>
        )}

        {/* 사용자 메뉴 */}
        <div className="user-menu">
          {isLoggedIn || <span className="GoLogin" onClick={GoLogin}>로그인</span>}
          {isLoggedIn ? (
            <span className="user-icon" onClick={() => {
              openModal("userMenu");
            }}>
              {loginProfile ? (
                <img className='loginProfileImg' src={profile} alt='profile' />
              ) : (
                <svg className="default-svg" width="2.5em" height="2.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              )}
              {isIconToggled ? (
                <svg className='ToggleSvg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)", transformOrigin: "center", }}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 9.5L12 14.5L7 9.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              ) : (
                <svg className='ToggleSvg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 9.5L12 14.5L7 9.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              )}
            </span>
          ) : (
            <span className="user-icon" onClick={() => {
              openModal("userMenu");
            }}>
              {isIconToggled ? (
                <svg className='ToggleSvg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)", transformOrigin: "center", }}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 9.5L12 14.5L7 9.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              ) : (
                <svg className='ToggleSvg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 9.5L12 14.5L7 9.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              )}
            </span>
          )}

          {modalType === "userMenu" && (
            <div className="ToggleMenu" onClick={closeModal}>
              <div className="ToggleMenuList" onClick={(e) => e.stopPropagation()}>
                <HeaderModal closeModal={closeModal} closeAndAccessMenu={closeAndAccessMenu} GoProAccess={GoProAccess} loginStatus={loginStatus} />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* 모바일 검색창 하단에 생성 */}
      <div className='moblie-search-insert'>
        {isSearchVisible && (
          <div className="moblie-search-bar">
            <input ref={searchRef} type="text" placeholder="검색할 내용을 입력하세요" className="moblie-search-input" onBlur={handleFocusOut}
              value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyDown={handleKeyPress} />
            <button className="moblie-search-button" onClick={() => handleSearch(searchValue)}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="#ffffff"></path> </g></svg>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
