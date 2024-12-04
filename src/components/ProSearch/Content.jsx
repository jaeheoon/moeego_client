import React from 'react';
import SearchBar from './SearchBar';
import SearchList from './SearchList';

const Content = () => {
    //----------------------------
    const searchListItems = [
        {
            id: 1, name: "mc딩동", intro: "달인의 스피치 컨설팅", rating: "5.0", reviews: "15", experience: "10",
            img_main: "../image/mc.jpg"
        },
        { id: 2, name: "HomeCare Pro ⭐️ 4.8", rating: "4.8", reviews: "5,000", experience: "15", intro: "홈케어 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/3d1bfeb9-0261-4ee1-a92e-cffaf31f15d8.png?webp=1&amp;h=320&amp;w=320" },
        { id: 3, name: "HomeCare Pro ⭐️ 4.9", rating: "4.9", reviews: "4,300", experience: "10", intro: "홈케어 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample1.png" },
        { id: 4, name: "CleanPro ⭐️ 4.7", rating: "4.7", reviews: "3,200", experience: "12", intro: "청소 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample2.png" },
        { id: 5, name: "CareTaker ⭐️ 4.8", rating: "4.8", reviews: "5,800", experience: "8", intro: "케어 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample3.png" },
        { id: 6, name: "FixMaster ⭐️ 4.6", rating: "4.6", reviews: "2,100", experience: "5", intro: "수리 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample4.png" },
        { id: 7, name: "HandyPro ⭐️ 4.9", rating: "4.9", reviews: "7,400", experience: "15", intro: "핸디 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample5.png" },
        { id: 8, name: "PainterGo ⭐️ 4.5", rating: "4.5", reviews: "1,800", experience: "6", intro: "페인트 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample6.png" },
        { id: 9, name: "RepairPro ⭐️ 4.8", rating: "4.8", reviews: "3,600", experience: "9", intro: "수리 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample7.png" },
        { id: 10, name: "FixItAll ⭐️ 4.7", rating: "4.7", reviews: "2,500", experience: "11", intro: "올인원 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample8.png" },
        { id: 11, name: "SmartClean ⭐️ 4.9", rating: "4.9", reviews: "8,200", experience: "13", intro: "스마트 클린 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample9.png" },
        { id: 12, name: "TotalCare ⭐️ 4.6", rating: "4.6", reviews: "2,900", experience: "7", intro: "토탈 케어 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample10.png" },
        { id: 13, name: "CleanMaster ⭐️ 4.8", rating: "4.8", reviews: "4,700", experience: "10", intro: "청소 마스터 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample11.png" },
        { id: 14, name: "FixPro ⭐️ 4.7", rating: "4.7", reviews: "3,000", experience: "8", intro: "수리 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample12.png" },
        { id: 15, name: "HomeFix ⭐️ 4.9", rating: "4.9", reviews: "6,500", experience: "14", intro: "홈 수리 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample13.png" },
        { id: 16, name: "BrightClean ⭐️ 4.5", rating: "4.5", reviews: "1,200", experience: "4", intro: "클린 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample14.png" },
        { id: 17, name: "PaintPro ⭐️ 4.6", rating: "4.6", reviews: "1,800", experience: "6", intro: "페인트 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample15.png" },
        { id: 18, name: "TotalFix ⭐️ 4.8", rating: "4.8", reviews: "5,100", experience: "10", intro: "토탈 수리 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample16.png" },
        { id: 19, name: "HandyFix ⭐️ 4.7", rating: "4.7", reviews: "3,400", experience: "9", intro: "핸디 수리 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample17.png" },
        { id: 20, name: "CarePlus ⭐️ 4.9", rating: "4.9", reviews: "7,900", experience: "15", intro: "케어 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample18.png" },
        { id: 21, name: "FixProGo ⭐️ 4.6", rating: "4.6", reviews: "2,700", experience: "6", intro: "수리 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample19.png" },
        { id: 22, name: "ExpertClean ⭐️ 4.8", rating: "4.8", reviews: "4,500", experience: "10", intro: "전문 청소 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample20.png" },
        { id: 23, name: "ProCare ⭐️ 4.7", rating: "4.7", reviews: "3,100", experience: "7", intro: "프로 케어 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample21.png" },
        { id: 24, name: "CleanExpert ⭐️ 4.9", rating: "4.9", reviews: "8,300", experience: "14", intro: "클린 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample22.png" },
        { id: 25, name: "FixMaster ⭐️ 4.6", rating: "4.6", reviews: "2,200", experience: "5", intro: "수리 마스터 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample23.png" },
        { id: 26, name: "CareFix ⭐️ 4.8", rating: "4.8", reviews: "5,200", experience: "11", intro: "케어 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample24.png" },
        { id: 27, name: "ProFix ⭐️ 4.7", rating: "4.7", reviews: "3,500", experience: "9", intro: "프로 수리 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample25.png" },
        { id: 28, name: "HandyCare ⭐️ 4.9", rating: "4.9", reviews: "7,000", experience: "13", intro: "핸디 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample26.png" },
        { id: 29, name: "PaintMaster ⭐️ 4.5", rating: "4.5", reviews: "1,600", experience: "4", intro: "페인트 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample27.png" },
        { id: 30, name: "TotalCarePro ⭐️ 4.8", rating: "4.8", reviews: "4,900", experience: "10", intro: "토탈 케어 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/sample28.png" },
    ];
    //------------------------------
    return (
        <div className='ContentWrap'>
            <section>
                <SearchBar />
                {searchListItems.map(item => (
                    <SearchList key={item.id} id={item.id} name={item.name} rating={item.rating} reviews={item.reviews}
                        experience={item.experience} intro={item.intro} img_main={item.img_main} />
                ))}
            </section>
        </div>
    );
};

export default Content;