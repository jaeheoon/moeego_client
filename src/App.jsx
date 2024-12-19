import "./App.css";
import React from "react";
import { Router, Route, Routes, BrowserRouter } from "react-router-dom";

// 헤더 푸터
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// mainPage
import MainPage from './components/MainPage.jsx';

// 이벤트, 공지
import Notice_eventPage from "./components/notice_eventpage/Notice_eventpage.jsx";
import NoticeView from "./components/notice_eventpage/NoticeView.jsx";

// member
import Login from "./components/login/Login.jsx";
import Join from "./components/join/Join.jsx";
import JoinSuccess from './components/join/JoinSuccess.jsx';
import Logout from './components/login/Logout.jsx';

// pro
import Prosignup from "./components/pro/Prosignup.jsx";
import ProjoinSub from "./components/pro/ProSub.jsx";
import ProjoinMain from "./components/Pro/ProjoinMain.jsx";
import ProSearch from "./components/ProSearch/ProSearch";
import ProRequest from "./components/Pro/ProRequest.jsx";
import ServiceAreaModal from "./components/ProSearch/ServiceAreaModal.jsx";
import ProView from "./components/Pro/ProView";
import ProIntro from './components/Pro/ProIntro.jsx';
import ProServiceIntro from './components/Pro/ProServiceIntro.jsx';

// article
import ArticleMain from './components/articles/ArticleMain.jsx';
import Write from "./components/articles/Write.jsx";
import Update from "./components/articles/Update.jsx";
import FreeBoardForm from "./components/articles/FreeBoardForm/FreeBoardForm.jsx";
import LatestReview from "./components/articles/FreeBoardForm/LatestReview.jsx";
import ViewPage from "./components/articles/ViewPage/ViewPage.jsx";

// myPage
import Review from "./components/mypage/Review.jsx";
import ReviewWrite from "./components/mypage/ReviewWrite.jsx";
import MyPage from './components/mypage/MyPage.jsx';
import MyHistory from './components/mypage/MyHistory.jsx';
import MyArticles from './components/mypage/MyArticles.jsx';
import MyComments from './components/mypage/MyComments.jsx';
import Private from './components/mypage/Private.jsx';
import Account from './components/mypage/Account.jsx';
import ChangeAddress from './components/mypage/ChangeAddress.jsx';
import ChangePassword from './components/mypage/ChangePassword.jsx';
import ChangePhone from './components/mypage/ChangePhone.jsx';
import SignOut from './components/mypage/SignOut.jsx';
import MyReservation from './components/mypage/MyReservation.jsx';
import Success from './components/mypage/Success.jsx';
import BookMarkPro from './components/mypage/BookMarkPro.jsx';
import ChangeIntro from './components/mypage/ChangeIntro.jsx';

// category
import SelectCategory from './components/detail_category/SelectCategory.jsx';

// about
import About from './components/about/About.jsx';

// admin
import EventWrite from "./components/admin/EventWrite.jsx";
import EventUpdate from "./components/admin/EventUpdate.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminMain from "./components/admin/AdminMain.jsx";
import AdminLogout from './components/admin/AdminLogout.jsx';

// Context Providers
import { AdminProvider } from './context/admin/AdminContext.jsx';
import { AdminLoginProvider } from './context/admin/AdminLoginContext.jsx';
import { AuthProvider } from './context/member/AuthContext.jsx';
import { LoginProvider } from './context/member/LoginContext.jsx';
import { SignUpProvider } from './context/member/SignUpContext.jsx';
import { ProSignUpProvider } from './context/member/ProSignUpContext.jsx';
import { MyPageProvider } from './context/mypage/MyPageContext.jsx';
import { ArticleProvider } from './context/article/ArticleContext.jsx';
import { ProProvider } from './context/pro/ProContext.jsx';
import { SignOutProvider } from './context/mypage/SignOutContext.jsx';

// OAuth2
import Oauth2Redirect from './api/Oauth2Redirect.jsx'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <AdminProvider>
            <AdminLoginProvider>
              <SignUpProvider>
                <ProSignUpProvider>
                  <LoginProvider>
                    <MyPageProvider>
                      <SignOutProvider>
                        <ArticleProvider>
                          <ProProvider>
                            {/* Header와 Footer를 제외할 조건 */}
                            {!window.location.pathname.startsWith('/admin') && <Header />}

                            <Routes>
                              {/* 메인페이지 */}
                              <Route path={"/"} element={<div className='main-content'><MainPage /></div>} />

                              {/* 소개페이지, 공지/이벤트 */}
                              <Route path={"/about"} element={<About />} />
                              <Route path={"/event"} element={<div className='main-content'><Notice_eventPage /></div>} />
                              <Route path={"/noticeview"} element={<div className='main-content'><NoticeView /></div>} />

                              {/* 카테고리 페이지 */}
                              <Route path={"/category/:mainCateNo"} element={<div className='main-content'><SelectCategory /></div>} />
                              <Route path="/pro/search" element={<div className='main-content'><ProSearch /></div>} />
                              <Route path="/pro" element={<div className='main-content'><ProView /></div>} />

                              {/* 작성 페이지 */}
                              <Route path="/article/write" element={<div className='main-content'><Write /></div>} />
                              <Route path="/article/update/:articleNo" element={<div className='main-content'><Update /></div>} />

                              {/* 마이페이지 */}
                              <Route path={"/mypage"} element={<div className='main-content'><MyPage /></div>} />
                              <Route path={"/mypage/likepro"} element={<div className='main-content'><BookMarkPro /></div>} />
                              <Route path={"/mypage/reservation"} element={<div className='main-content'><MyReservation /></div>} />
                              <Route path={"/mypage/myhistory"} element={<div className='main-content'><MyHistory /></div>} />
                              <Route path={"/mypage/myhistory/myarticle"} element={<div className='main-content'><MyArticles /></div>} />
                              <Route path={"/mypage/myhistory/mycomment"} element={<div className='main-content'><MyComments /></div>} />
                              <Route path={"/mypage/review/:num"} element={<div className='main-content'><Review /></div>} />
                              <Route path={"/mypage/review/write"} element={<div className='main-content'><ReviewWrite /></div>} />
                              <Route path={"/mypage/account"} element={<div className='main-content'><Account /></div>} />
                              <Route path={"/mypage/account/private"} element={<div className='main-content'><Private /></div>} />
                              <Route path={"/mypage/account/private/phone"} element={<div className='main-content'><ChangePhone /></div>} />
                              <Route path={"/mypage/account/private/password"} element={<div className='main-content'><ChangePassword /></div>} />
                              <Route path={"/mypage/account/private/address"} element={<div className='main-content'><ChangeAddress /></div>} />
                              <Route path={"/mypage/account/private/signout"} element={<div className='main-content'><SignOut /></div>} />
                              <Route path={"/mypage/account/private/success"} element={<div className='main-content'><Success /></div>} />
                              <Route path={"/pro/intro"} element={<div className='main-content'><ChangeIntro /></div>} />

                              {/* 커뮤니티 페이지 */}
                              <Route path={"/article"} element={<div className='main-content'><ArticleMain /></div>} />
                              <Route path={"/article/free"} element={<div className='main-content'><FreeBoardForm /></div>} />
                              <Route path={"/article/pro"} element={<div className='main-content'><FreeBoardForm /></div>} />
                              <Route path={"/article/hot"} element={<div className='main-content'><FreeBoardForm /></div>} />
                              <Route path={"/article/qna"} element={<div className='main-content'><FreeBoardForm /></div>} />
                              <Route path={"/article/review"} element={<div className='main-content'><LatestReview /></div>} />
                              <Route path={"/article/viewpage"} element={<div className='main-content'><ViewPage /></div>} />

                              {/* 회원가입/로그인/로그아웃 페이지 */}
                              <Route path="/login" element={<div className='main-content'><Login /></div>} />
                              <Route path="/signup" element={<div className='main-content'><Join /></div>} />
                              <Route path="/signup/success" element={<div className='main-content'><JoinSuccess /></div>} />
                              <Route path="/logout" element={<div><Logout /></div>} />

                              {/* JWT 인증 페이지 */}
                              <Route path='/oauth2-jwt-header' element={<Oauth2Redirect />} />

                              {/* 달인 가입 페이지 */}
                              <Route path="/pro/signup/main" element={<ProjoinMain />} />
                              <Route path="/pro/signup/main/:mainCateNo" element={<div className='main-content'><ProjoinSub /></div>} />
                              <Route path="/pro/signup/main/:mainCateNo/sub" element={<div className='main-content'><ProIntro /></div>} />
                              <Route path="/pro/signup" element={<div className='main-content'><Prosignup /></div>} />
                              <Route path="/pro/proview" element={<ProView />} />
                              <Route path="/pro/ProRequest" element={<ProRequest />} />
                              <Route path='/pro/serviceintro' element={<div className='main-content'><ProServiceIntro /></div>} />

                              {/* 관리자 페이지 */}
                              <Route path="/admin/login" element={<AdminLogin />} />
                              <Route path="/admin/logout" element={<AdminLogout />} />
                              <Route path="/admin/dashboard" element={<AdminMain />} />
                              <Route path="/admin/proapproval" element={<AdminMain />} />
                              <Route path="/admin/memberlist" element={<AdminMain />} />
                              <Route path="/admin/prolist" element={<AdminMain />} />
                              <Route path="/admin/leavememberlist" element={<AdminMain />} />
                              <Route path="/admin/eventlist" element={<AdminMain />} />
                              <Route path="/admin/event-write" element={<EventWrite />} />
                              <Route path="/admin/event-update" element={<EventUpdate />} />
                              <Route path="/modal" element={<ServiceAreaModal />} />
                            </Routes>
                            {!window.location.pathname.startsWith('/admin') && <Footer />}
                          </ProProvider>
                        </ArticleProvider>
                      </SignOutProvider>
                    </MyPageProvider>
                  </LoginProvider>
                </ProSignUpProvider>
              </SignUpProvider>
            </AdminLoginProvider>
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;