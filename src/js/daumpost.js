const checkPost = (zipcodeId, addr1Id, addr2Id) => {
    if (typeof daum === 'undefined' || !daum.Postcode) {
        console.error("Daum Postcode API가 로드되지 않았습니다.");
        return;
    }

    new daum.Postcode({
        oncomplete: function (data) {
            let addr = '';
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress; // 도로명 주소
            } else {
                addr = data.jibunAddress; // 지번 주소
            }

            // 안전하게 값 설정하기
            const zipcodeInput = document.getElementById(zipcodeId);
            const addr1Input = document.getElementById(addr1Id);
            const addr2Input = document.getElementById(addr2Id);

            if (zipcodeInput && addr1Input && addr2Input) {
                zipcodeInput.value = data.zonecode;
                addr1Input.value = addr;
                addr2Input.focus();
            } else {
                console.error("주소 필드를 찾을 수 없습니다.");
            }
        }
    }).open();
};

export default checkPost;
