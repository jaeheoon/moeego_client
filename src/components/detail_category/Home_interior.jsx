import React, { useState, useRef, useEffect } from "react";
import Detail_category from "./Detail_category";
import "../../css/detail_category/Detail_category.css";
import DetailCardList from "./DetailCardList";

const Home_interior = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionsRef = useRef([]);
    const menuRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleMenuClick = (index) => {
        setActiveIndex(index);
        setIsScrolling(true); // 스크롤 상태 활성화
        sectionsRef.current[index].scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    
        const headerOffset = 220; // 필요에 따라 조정
        const elementPosition = sectionsRef.current[index].getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    
        setTimeout(() => setIsScrolling(false), 1000); // 스크롤 상태 해제 (지연 시간 조정)
    };
    
    useEffect(() => {
        if (isScrolling) return; // 스크롤 중에는 Observer 비활성화
    
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sectionsRef.current.findIndex(
                            (section) => section === entry.target
                        );
                        if (index !== -1 && index !== activeIndex) {
                            setActiveIndex(index);
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
    );
};

export default Home_interior;