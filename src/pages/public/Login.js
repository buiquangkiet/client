import React, { useEffect, useState } from "react";
import Login from "components/authen/Login";
import Signup from "components/authen/Signup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import path from "ultils/paths";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(1);
    const { isLoggedIn } = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) navigate(`/${path.HOME}`);
    }, []);
    return (
        <div>
            <div
                className={`${
                    isLogin === 1 ? "opacity-100 block" : "hidden opacity-0"
                } duration-300`}
            >
                <Login isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
            <div
                className={`${
                    isLogin === 2 ? "opacity-100 block" : "hidden opacity-0"
                } duration-300`}
            >
                <Signup isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
        </div>
    );
};

export default LoginPage;
