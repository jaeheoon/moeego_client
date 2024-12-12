import React, { useContext } from 'react';
import { AdminLoginContext } from '../../context/admin/AdminLoginContext';
import '../../css/admin/AdminLogin.css';

const AdminLogin = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleLogin,
    } = useContext(AdminLoginContext);

    return (
        <div className="adminLogin-container">
            <div className="adminLogin-wrapper">
                <h2>모이고 관리자</h2>
                <form className="adminLogin-form" onSubmit={handleLogin}>
                    <div className="adminLogin-form-group">
                        <label>아이디</label>
                        <input
                            type="text"
                            placeholder="Enter your id"
                            className="adminLogin-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // email 상태 업데이트
                        />
                    </div>
                    <div className="adminLogin-form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="adminLogin-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // password 상태 업데이트
                        />
                    </div>
                    {error && <p className="adminLogin-error">{error}</p>} {/* 로그인 실패 시 에러 메시지 출력 */}
                    <button type="submit" className="adminLogin-login-btn">Login</button>
                </form>
                <p className="adminLogin-footer">© 2024 MoeeGo</p>
            </div>
        </div>
    );
};

export default AdminLogin;
