import "./App.css";
import React from "react";
import { Router, Route, Routes, BrowserRouter } from "react-router-dom";

// 헤더 푸터
import Header from "./components/Header";
import Footer from "./components/Footer";

// mainPage
import MainPage from './components/mainPage';

// member
import Login from "./components/login/Login";
import Join from "./components/join/Join";
import JoinSuccess from './components/join/JoinSuccess.jsx';
import Logout from './components/login/Logout.jsx';

// pro
import Prosignup from "./components/pro/Prosignup";
import ProjoinSub_interoir from "./components/Pro/ProSub_interoir.jsx";
import ProjoinSub_si from "./components/Pro/ProSub_si.jsx";
import ProjoinSub_car from "./components/Pro/ProSub_car.jsx";
import ProjoinSub_hobby from "./components/Pro/ProSub_hobby.jsx";
import ProjoinSub_study from "./components/Pro/ProSub_study.jsx";
import ProjoinSub_fashion from "./components/Pro/ProSub_fashion.jsx";
import ProjoinMain from "./components/Pro/ProjoinMain.jsx";
import ProSearch from "./components/ProSearch/ProSearch";
import ProRequest from "./components/Pro/ProRequest.jsx";
import ServiceAreaModal from "./components/ProSearch/ServiceAreaModal.jsx";
import ProView from "./components/Pro/ProView";

// article
import ArticleMain from './components/articles/ArticleMain.jsx';
import Write from "./components/articles/Write";
import Update from "./components/articles/Update";
import FreeBoardForm from "./components/articles/FreeBoardForm/FreeBoardForm.jsx";
import ViewPage from "./components/articles/ViewPage/ViewPage.jsx";

// myPage
import Review from "./components/mypage/Review";
import MyPage from './components/mypage/MyPage';
import MyHistory from './components/mypage/MyHistory';
import MyArticles from './components/mypage/MyArticles';
import MyComments from './components/mypage/MyComments';
import Private from './components/mypage/Private';
import Account from './components/mypage/account';
import ChangeAddress from './components/mypage/ChangeAddress';
import ChangePassword from './components/mypage/ChangePassword';
import ChangeEmail from './components/mypage/ChangeEmail';
import SignOut from './components/mypage/SignOut';
import MyReservation from './components/mypage/MyReservation';
import Success from './components/mypage/Success';
import BookMarkPro from './components/mypage/BookMarkPro.jsx';

// category
import SelectCategory from './components/detail_category/SelectCategory';

// about
import About from './components/about/About';

// admin
import EventWrite from "./components/admin/EventWrite.jsx";
import EventUpdate from "./components/admin/EventUpdate.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminMain from "./components/admin/AdminMain.jsx";

// Context Providers
import { AdminProvider } from './context/admin/AdminContext.jsx';
import { AuthProvider } from './context/member/AuthContext.jsx';
import { LoginProvider } from './context/member/LoginContext.jsx';
import { SignUpProvider } from './context/member/SignUpContext.jsx';
import { MyPageProvider } from './context/mypage/MyPageContext.jsx';
import { ArticleProvider } from './context/article/ArticleContext.jsx';
import { ProProvider } from './context/pro/ProContext.jsx';

// OAuth2
import OAuth2Redirect from './js/Oauth2Redirect.js';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <AdminProvider>
            <SignUpProvider>
              <LoginProvider>
                <MyPageProvider>
                  <ArticleProvider>
                    <ProProvider>
                      {/* Header와 Footer를 제외할 조건 */}
                      {!window.location.pathname.startsWith('/admin') && <Header />}

                      <Routes>
                        {/* 메인페이지 */}
                        <Route path={"/"} element={<div className='main-content'><MainPage /></div>} />

                        {/* 카테고리 페이지 */}
                        <Route path={"/category/:mainCateNo"} element={<div className='main-content'><SelectCategory /></div>} />
                        <Route path={"/about"} element={<About />} />
                        <Route path="/pro/search" element={<div className='main-content'><ProSearch /></div>} />
                        <Route path="/pro" element={<div className='main-content'><ProView /></div>} />

                        {/* 작성 페이지 */}
                        <Route path="/article/write" element={<div className='main-content'><Write /></div>} />
                        <Route path="/article/update/:articleNo" element={<div className='main-content'><Update /></div>} />
                        <Route path="/mypage/review" element={<div className='main-content'><Review /></div>} />

                        {/* 마이페이지 */}
                        <Route path={"/mypage"} element={<div className='main-content'><MyPage /></div>} />
                        <Route path={"/mypage/likepro"} element={<div className='main-content'><BookMarkPro /></div>} />
                        <Route path={"/mypage/reservation"} element={<div className='main-content'><MyReservation /></div>} />
                        <Route path={"/mypage/myhistory"} element={<div className='main-content'><MyHistory /></div>} />
                        <Route path={"/mypage/myhistory/myarticle"} element={<div className='main-content'><MyArticles /></div>} />
                        <Route path={"/mypage/myhistory/mycomment"} element={<div className='main-content'><MyComments /></div>} />
                        <Route path={"/mypage/account"} element={<div className='main-content'><Account /></div>} />
                        <Route path={"/mypage/account/private"} element={<div className='main-content'><Private /></div>} />
                        <Route path={"/mypage/account/private/email"} element={<div className='main-content'><ChangeEmail /></div>} />
                        <Route path={"/mypage/account/private/password"} element={<div className='main-content'><ChangePassword /></div>} />
                        <Route path={"/mypage/account/private/address"} element={<div className='main-content'><ChangeAddress /></div>} />
                        <Route path={"/mypage/account/private/signout"} element={<div className='main-content'><SignOut /></div>} />
                        <Route path={"/mypage/account/private/success"} element={<div className='main-content'><Success /></div>} />

                        {/* 커뮤니티 페이지 */}
                        <Route path={"/article"} element={<div className='main-content'><ArticleMain /></div>} />
                        <Route path={"/article/free"} element={<div className='main-content'><FreeBoardForm /></div>} />
                        <Route path={"/article/pro"} element={<div className='main-content'><FreeBoardForm /></div>} />
                        <Route path={"/article/hot"} element={<div className='main-content'><FreeBoardForm /></div>} />
                        <Route path={"/article/qna"} element={<div className='main-content'><FreeBoardForm /></div>} />

                        <Route path={"/article/viewpage"} element={<div className='main-content'><ViewPage /></div>} />

                        {/* 회원가입/로그인/로그아웃 페이지 */}
                        <Route path="/login" element={<div className='main-content'><Login /></div>} />
                        <Route path="/signup" element={<div className='main-content'><Join /></div>} />
                        <Route path="/signup/success" element={<div className='main-content'><JoinSuccess /></div>} />
                        <Route path="/logout" element={<div><Logout /></div>} />

                        {/* JWT 인증 페이지 */}
                        <Route path='oauth2-jwt-header' element={<OAuth2Redirect />} />

                        {/* 달인 가입 페이지 */}
                        <Route path="/pro/signup/main" element={<ProjoinMain />} />
                        <Route path="/pro/signup/sub_interoir" element={<ProjoinSub_interoir />} />
                        <Route path="/pro/signup/sub_si" element={<ProjoinSub_si />} />
                        <Route path="/pro/signup/sub_fashion" element={<ProjoinSub_fashion />} />
                        <Route path="/pro/signup/sub_study" element={<ProjoinSub_study />} />
                        <Route path="/pro/signup/sub_hobby" element={<ProjoinSub_hobby />} />
                        <Route path="/pro/signup/sub_car" element={<ProjoinSub_car />} />
                        <Route path="/pro/signup" element={<Prosignup />} />
                        <Route path="/pro/proview" element={<ProView />} />
                        <Route path="/pro/ProRequest" element={<ProRequest />} />

                        {/* 관리자 페이지 */}
                        <Route path="/admin/Login" element={<AdminLogin />} />

                        <Route path="/admin/DashBoard" element={<AdminMain />} />
                        <Route path="/admin/ProApproval" element={<AdminMain />} />
                        <Route path="/admin/MemberList" element={<AdminMain />} />
                        <Route path="/admin/ProList" element={<AdminMain />} />
                        <Route path="/admin/LeaveMemberList" element={<AdminMain />} />
                        <Route path="/admin/EventList" element={<AdminMain />} />
                        <Route path="/admin/NoticeList" element={<AdminMain />} />

                        <Route path="/admin/event-write" element={<EventWrite />} />
                        <Route path="/admin/event-update" element={<EventUpdate />} />

                        <Route path="/modal" element={<ServiceAreaModal />} />

                      </Routes>
                      {!window.location.pathname.startsWith('/admin') && <Footer />}
                    </ProProvider>
                  </ArticleProvider>
                </MyPageProvider>
              </LoginProvider>
            </SignUpProvider>
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;