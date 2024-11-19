import React from "react";

function KeywordSection() {
  return (
    <div className="keywordWrap">
        <h2>쓱싹쓱싹 청소하는 날</h2>
        <div className="keyword-images">
            <div className="keyword-image" style={{backgroundImage: `url("./src/image/cleaning.png")`}}>
                <div>정리수납 컨설팅</div>
            </div>
            <div className="keyword-image" style={{backgroundImage: `url("./src/image/cleaning.png")`}}>
                <div>정리수납 컨설팅</div>
            </div>
            <div className="keyword-image" style={{backgroundImage: `url("./src/image/cleaning.png")`}}>
                <div>정리수납 컨설팅</div>
            </div>
            <div className="keyword-image" style={{backgroundImage: `url("./src/image/cleaning.png")`}}>
                <div>정리수납 컨설팅</div>
            </div>
        </div>
    </div>
  );
}

export default KeywordSection;