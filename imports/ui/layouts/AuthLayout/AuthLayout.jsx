import React from "react";
import "./AuthLayout.css";

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout">
            <div className="auth-background"></div>
            <div className="auth-content">
                <div className="auth-logo">
                    <h1>To Do List</h1>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;