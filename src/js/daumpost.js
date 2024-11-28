const checkPost = (updateSignUpData) => {
    new daum.Postcode({
        oncomplete: (data) => {
            const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
            updateSignUpData('zipcode', data.zonecode);
            updateSignUpData('address1', addr);
            updateSignUpData('address2', '');
        },
    }).open();
};

export default checkPost;
