import React from 'react';
import SearchBar from './SearchBar';
import SearchList from './SearchList';

const Content = () => {
    //----------------------------
    const searchListItems = [
        { id: 1, name: "mc딩동", intro :"달인의 스피치 컨설팅", rating: "5.0", reviews: "15", experience: "10", 
            img_main: "../image/mc.jpg" },
        { id: 2, name: "HomeCare Pro ⭐️ 4.8", rating: "4.8", reviews: "5,000", experience: "15", intro: "홈케어 전문가 소개내용", img_main: "https://static.cdn.soomgo.com/upload/profile/3d1bfeb9-0261-4ee1-a92e-cffaf31f15d8.png?webp=1&amp;h=320&amp;w=320"},
    ];
    //------------------------------
    return (
        <div className='ContentWrap'>
            <section>
                <SearchBar />
                {searchListItems.map(item => (
                    <SearchList key={item.id} id={item.id} name={item.name} rating={item.rating} reviews={item.reviews} 
                    experience={item.experience} intro={item.intro} img_main={item.img_main}/>
                ))}
            </section>
        </div>
    );
};

export default Content;