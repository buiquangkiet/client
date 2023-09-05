import React, { useState } from "react";
import { apiForgotPassword, apiLogin } from "apis/user";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import path from "ultils/paths";
import { login } from "app/user/userSlice";
import { useDispatch } from "react-redux";
import { PrevArrowIcon } from "ultils/icons";
import validator from "validator";
import { setLoading } from "app/appSlice";
const Login = ({ isLogin, setIsLogin }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [forgotEmailError, setForgotEmailError] = useState("");
    const handleLogin = async () => {
        setEmailError("");
        setPasswordError("");

        let isValid = true;

        // Validate email
        if (!validator.isEmail(email)) {
            setEmailError("Please enter a valid email address");
            isValid = false;
        }

        // Validate password
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            isValid = false;
        }

        if (isValid) {
            dispatch(setLoading(true));
            const response = await apiLogin({ email, password });
            dispatch(setLoading(false));
            if (response.success) {
                Swal.fire(
                    response.success ? "Login Success" : "Login Failed",
                    response.message,
                    response.success ? "success" : "error"
                ).then(() => {
                    dispatch(
                        login({
                            isLoggedIn: true,
                            token: response.accessToken,
                        })
                    );
                    setEmail("");
                    setPassword("");
                    navigate(-1);
                });
            } else
                Swal.fire(
                    response.success ? "Login Success" : "Login Failed",
                    response.message,
                    response.success ? "success" : "error"
                );
        }
    };
    const handleSendMail = async () => {
        setForgotEmailError("");

        let isValid = true;
        if (!validator.isEmail(forgotEmail)) {
            setForgotEmailError("Please enter a valid email address");
            isValid = false;
        }
        if (isValid) {
            dispatch(setLoading(true));
            const response = await apiForgotPassword({ email: forgotEmail });
            dispatch(setLoading(false));
            Swal.fire(
                response.success ? "Send Email Success" : "Send Email Failed",
                response.message,
                response.success ? "success" : "error"
            );
        }
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div
                className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 absolute  ${showForgotPassword
                    ? "animate-leftSlider opacity-0 z-0"
                    : "animate-rightSlider z-10"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <Link title="Home" to={`/${path.HOME}`}>
                        <PrevArrowIcon
                            size={30}
                            className="cursor-pointer "
                        />
                    </Link>
                    <h2 className="text-2xl font-bold mb-6">Login</h2>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 min-w-[400px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError && "border-red-500"
                            }`}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <p className="text-red-500 text-xs italic">
                            {emailError}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordError && "border-red-500"
                            }`}
                        id="password"
                        type="password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleLogin();
                        }}
                    />
                    {passwordError && (
                        <p className="text-red-500 text-xs italic">
                            {passwordError}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                    <p
                        onClick={() => setShowForgotPassword(true)}
                        className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                        Forgot Password?
                    </p>
                </div>
                <p
                    className="inline-block cursor-pointer align-baseline font-bold text-sm underline hover:text-blue-800 mt-5"
                    onClick={() => setIsLogin(2)}
                >
                    Haven't got account yet? Sign up
                </p>
            </div>

            <div
                className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 absolute ${!showForgotPassword
                    ? "animate-leftSlider z-0 "
                    : "animate-rightSlider z-10"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <PrevArrowIcon
                        size={30}
                        className="cursor-pointer "
                        onClick={() => setShowForgotPassword(false)}
                    />
                    <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="forgotemail"
                    >
                        Email
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 min-w-[400px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError && "border-red-500"
                            }`}
                        id="forgotemail"
                        type="email"
                        placeholder="Enter your Email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                    />
                    {forgotEmailError && (
                        <p className="text-red-500 text-xs italic">
                            {forgotEmailError}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleSendMail}
                    >
                        Continue
                    </button>
                </div>
                <p
                    className="inline-block cursor-pointer align-baseline font-bold text-sm underline hover:text-blue-800 mt-5"
                    onClick={() => setIsLogin(2)}
                >
                    Haven't got account yet? Sign up
                </p>
            </div>
        </div>
    );
};

export default Login;
