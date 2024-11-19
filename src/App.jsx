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
import Banner from "./components/mainpage/Banner.jsx";
import Reviews from "./components/mainpage/Reviews.jsx";
import CleaningSection from "./components/mainpage/CleaningSection.jsx";
import Locations from "./components/mainpage/Locations.jsx";
import ArticleMain from './components/articles/ArticleMain.jsx';
import BookMarkPro from './components/mypage/BookMarkPro.jsx';
import ProDetail from './components/Pro/ProDetail.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className='main-content'>
          <Routes>
            {/* 메인페이지 */}
            <Route path={"/"} element={<MainPage />} />

            {/* 카테고리 페이지 */}
            <Route path={"/category/home"} element={<Home_interior />} />
            <Route path={"/category/outsourcing"} element={<Outsourcing />} />
            <Route path={"/category/fashion"} element={<Fashion_beauty />} />
            <Route path={"/category/study"} element={<Study />} />
            <Route path={"/category/hobby"} element={<Hobby />} />
            <Route path={"/category/car"} element={<Car />} />
            <Route path={"/about"} element={<About />} />
            <Route path="/pro/search" element={<ProSearch />} />
            <Route path="/pro" element={<ProView />} />

            {/* 개별 페이지로 접근할 수 있도록 각각 라우트 설정 */}
            <Route path="/banner" element={<Banner />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/cleaning" element={<CleaningSection />} />
            <Route path="/locations" element={<Locations />} />

            <Route path="/article/Write" element={<Write />} />
            <Route path="/article/Update" element={<Update />} />
            <Route path="/mypage/Review" element={<Review />} />

            {/* 마이페이지 */}
            <Route path={"/mypage"} element={<MyPage />} />
            <Route path={"/mypage/likepro"} element={<BookMarkPro />} />
            <Route path={"/mypage/reservation"} element={<MyReservation />} />
            <Route path={"/mypage/myhistory"} element={<MyHistory />} />
            <Route path={"/mypage/myhistory/myarticle"} element={<MyArticles />} />
            <Route path={"/mypage/myhistory/mycomment"} element={<MyComments />} />
            <Route path={"/mypage/account"} element={<Account />} />
            <Route path={"/mypage/account/private"} element={<Private />} />
            <Route path={"/mypage/account/private/email"} element={<ChangeEmail />} />
            <Route path={"/mypage/account/private/password"} element={<ChangePassword />} />
            <Route path={"/mypage/account/private/address"} element={<ChangeAddress />} />
            <Route path={"/mypage/account/private/signout"} element={<SignOut />} />
            <Route path={"/mypage/account/private/success"} element={<Success />} />


            {/* 커뮤니티 페이지 */}
            <Route path={"/article"} element={<ArticleMain />} />
            <Route path={"/article/free"} element={<FreeBoardForm />} />
            <Route path={"/article/viewpage"} element={<ViewPage />} />

            {/* 회원가입/로그인 페이지 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Join />} />

            {/* 달인 가입 페이지 */}
            <Route path="/pro/signup/main" element={<ProMain />} />
            <Route path="/pro/signup/sub" element={<ProSub />} />
            <Route path="/pro/signup" element={<Prosignup />} />
            <Route path="/pro/detail" element={<ProDetail />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div >
  );
};

export default App;
