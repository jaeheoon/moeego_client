import "./App.css";
import React from "react";
import { Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Write from "./components/articles/Write";
import Update from "./components/articles/Update";
import Review from "./components/mypage/Review";
import FreeBoardForm from "./components/articles/FreeBoardForm/FreeBoardForm.jsx";
import ViewPage from "./components/articles/ViewPage/ViewPage.jsx";
import ProSearch from "./components/ProSearch/ProSearch";
import MainPage from './components/mainPage';
import Home_interior from './components/detail_category/Home_interior';
import Outsourcing from './components/detail_category/Outsourcing';
import Fashion_beauty from './components/detail_category/Fashion_beauty';
import Study from './components/detail_category/Study';
import Hobby from './components/detail_category/Hobby';
import Car from './components/detail_category/Car';
import About from './components/about/About';
import ProView from "./components/Pro/ProView";
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
import Login from "./components/login/Login";
import Join from "./components/join/Join";
import ProMain from "./components/pro/ProMain";
import Prosignup from "./components/pro/Prosignup";
import ProSub from "./components/pro/ProSub";
import ArticleMain from './components/articles/ArticleMain.jsx';
import BookMarkPro from './components/mypage/BookMarkPro.jsx';
import ProDetail from './components/Pro/ProDetail.jsx';
import ProRequest from "./components/ProRequest.jsx";
import EventList from "./components/admin/EventList.jsx";
import EventWrite from "./components/admin/EventWrite.jsx";
import EventUpdate from "./components/admin/EventUpdate.jsx";
import ProReview from "./components/Pro/ProReview.jsx";
import ProInfo from "./components/Pro/ProInfo.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminMain from "./components/admin/AdminMain.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* Header와 Footer를 제외할 조건 */}
        {!window.location.pathname.startsWith('/admin') && <Header />}
        
        <Routes>
          {/* 메인페이지 */}
          <Route path={"/"} element={<div className='main-content'><MainPage /></div>} />

          {/* 카테고리 페이지 */}
          <Route path={"/category/home"} element={<div className='main-content'><Home_interior /></div>} />
          <Route path={"/category/outsourcing"} element={<div className='main-content'><Outsourcing /></div>} />
          <Route path={"/category/fashion"} element={<div className='main-content'><Fashion_beauty /></div>} />
          <Route path={"/category/study"} element={<div className='main-content'><Study /></div>} />
          <Route path={"/category/hobby"} element={<div className='main-content'><Hobby /></div>} />
          <Route path={"/category/car"} element={<div className='main-content'><Car /></div>} />
          <Route path={"/about"} element={<About />} />
          <Route path="/pro/search" element={<div className='main-content'><ProSearch /></div>} />
          <Route path="/pro" element={<div className='main-content'><ProView /></div>} />

          {/* 작성 페이지 */}
          <Route path="/article/Write" element={<div className='main-content'><Write /></div>} />
          <Route path="/article/Update" element={<div className='main-content'><Update /></div>} />
          <Route path="/mypage/Review" element={<div className='main-content'><Review /></div>} />

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
          <Route path={"/article/viewpage"} element={<div className='main-content'><ViewPage /></div>} />

          {/* 회원가입/로그인 페이지 */}
          <Route path="/login" element={<div className='main-content'><Login /></div>} />
          <Route path="/signup" element={<div className='main-content'><Join /></div>} />

          {/* 달인 가입 페이지 */}
          <Route path="/pro/signup/main" element={<ProMain />} />
          <Route path="/pro/signup/sub" element={<ProSub />} />
          <Route path="/pro/signup" element={<Prosignup />} />
          <Route path="/pro/detail" element={<ProDetail />} />

          {/* 관리자 페이지 */}
          <Route path="/admin/EventList" element={<EventList />} />
          <Route path="/admin/EventWrite" element={<EventWrite />} />
          <Route path="/admin/EventUpdate" element={<EventUpdate />} />
          <Route path="/admin/Login" element={<AdminLogin />} />
          <Route path="/ProRequest" element={<ProRequest />} />

          <Route path="/admin/DashBoard" element={<AdminMain/>} />
          <Route path="/admin/ProApproval" element={<AdminMain />} />
          <Route path="/admin/MemberList" element={<AdminMain />} />
          <Route path="/admin/ProList" element={<AdminMain />} />
          <Route path="/admin/LeaveMemberList" element={<AdminMain />} />
          
          <Route path="/ProRequest" element={<ProRequest />} />

          </Routes>
          {!window.location.pathname.startsWith('/admin') && <Footer />}
      </BrowserRouter>
    </div>
  );
};

export default App;