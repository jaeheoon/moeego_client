import React, { useState, useRef, useEffect } from "react";
import Detail_category from "./Detail_category";
import "../../css/detail_category/Detail_category.css";
import DetailCardList from "./DetailCardList";

const Home_interior = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionsRef = useRef([]);
    const menuRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false); // 스크롤 상태 관리

    const handleMenuClick = (index) => {
        setActiveIndex(index); // 클릭한 메뉴 활성화
        setIsScrolling(true); // 스크롤 중 상태 활성화
        sectionsRef.current[index].scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        // 스크롤 완료 후 IntersectionObserver 활성화
        setTimeout(() => setIsScrolling(false), 500); // 스크롤 시간에 맞춰 조정
    };

    const handleScrollToActiveMenu = (activeIndex) => {
        const menuItems = menuRef.current.querySelectorAll("li");
        const activeMenu = menuItems[activeIndex];
        if (activeMenu) {
            const menuContainer = menuRef.current;
            const menuContainerWidth = menuContainer.offsetWidth;

            const menuLeftOffset =
                activeMenu.offsetLeft - menuContainerWidth / 2 + activeMenu.offsetWidth / 2;
            menuContainer.scrollTo({
                left: menuLeftOffset + 150,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            // 스크롤이 최상단이면 첫 번째 메뉴 활성화
            if (window.pageYOffset === 0 && activeIndex !== 0) {
                setActiveIndex(0);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [activeIndex]);

    useEffect(() => {
        if (isScrolling) return; // 스크롤 중에는 IntersectionObserver 중단

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sectionsRef.current.findIndex(
                            (section) => section === entry.target
                        );
                        if (index !== -1 && index !== activeIndex) {
                            if(index == 1){
                                setActiveIndex(index);
                            }
                            else{
                                setActiveIndex(index+1); // 현재 보이는 섹션 활성화
                            }
                            handleScrollToActiveMenu(index); // 활성화된 메뉴로 스크롤
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: "-220px 0px -60% 0px",
                threshold: 0.3,
            }
        );

        sectionsRef.current.forEach((section) => observer.observe(section));

        return () => {
            observer.disconnect();
        };
    }, [activeIndex, isScrolling]);

    return (
        <div className="detailCategoryListPage">
            <div className="detailCategoryWrap">
                <h1>견적 요청</h1>
                <div className="detail_categoryWrap">
                    <Detail_category />
                </div>
                <div className="detailContentWrap">
                    <div className="detailCategoryListWrap" ref={menuRef}>
                        <ul>
                            {["이사 / 청소", "설치 / 수리", "철거 / 폐기", "인테리어 / 시공", "가구 리폼 / 운반"].map(
                                (item, index) => (
                                    <li
                                        key={index}
                                        className={`menu-item ${activeIndex === index ? "active" : ""}`}
                                        onClick={() => handleMenuClick(index)}
                                    >
                                        {item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className="detailRightWrap">
                        {["이사 / 청소", "설치 / 수리", "철거 / 폐기", "인테리어 / 시공", "가구 리폼 / 운반"].map(
                            (title, index) => (
                                <div
                                    key={index}
                                    ref={(el) => (sectionsRef.current[index] = el)}
                                    className="detailSection"
                                    id={`section-${index}`}
                                >
                                    <h2>{title}</h2>
                                    <DetailCardList />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home_interior;