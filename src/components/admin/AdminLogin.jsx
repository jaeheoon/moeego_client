import React from 'react';
import '../../css/admin/AdminLogin.css';

const AdminLogin = () => {
    return (
        <div className="adminLogin-container">
            <div className="adminLogin-wrapper">
                <h2>MoeeGo Admin</h2>
                <form className="adminLogin-form">
                    <div className="adminLogin-form-group">
                        <label>name</label>
                        <input 
                            type="text" 
                            placeholder="Enter your name" 
                            className="adminLogin-input"
                        />
                    </div>
                    <div className="adminLogin-form-group">
                        <label>Password</label>
                        <input 
                            type="password"  
                            placeholder="Enter your password" 
                            className="adminLogin-input"
                        />
                    </div>
                    <button type="submit" className="adminLogin-login-btn">Login</button>
                </form>
                <p className="adminLogin-footer">© 2024 MoeeGo</p>
            </div>
        </div>
    );
};

export default AdminLogin;
