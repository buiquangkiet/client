import React, { useState } from "react";
import Swal from "sweetalert2";
import validator from "validator";
import {
    HidePasswordIcon,
    PrevArrowIcon,
    ShowPasswordIcon,
} from "ultils/icons";
import { apiConfirmOTP, apiRegister } from "apis/user";
import { useDispatch } from "react-redux";
import { setLoading } from "app/appSlice";

const Signup = ({ isLogin, setIsLogin }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [isNext, setIsNext] = useState(1);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [otp, setOtp] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [otpError, setOtpError] = useState("");
    const handleNext = () => {
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

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

        // Validate confirm password
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            isValid = false;
        }

        if (isValid) {
            setIsNext(2);
        }
    };
    const handleSendMail = async () => {
        setFirstNameError("");
        setLastNameError("");
        setPhoneError("");

        let isValid = true;

        // Validate First Name
        if (firstName.trim() === "") {
            setFirstNameError("First Name is required");
            isValid = false;
        }

        // Validate Last Name
        if (lastName.trim() === "") {
            setLastNameError("Last Name is required");
            isValid = false;
        }

        // Validate Phone Number
        if (phone.trim() === "") {
            setPhoneError("Phone Number is required");
            isValid = false;
        }

        if (isValid) {
            dispatch(setLoading(true));
            const response = await apiRegister({
                email,
                password,
                firstname: firstName,
                lastname: lastName,
                mobile: phone,
            });
            dispatch(setLoading(false));

            Swal.fire(
                response.success ? "Send OTP Success" : "Send OTP Failed",
                response.message,
                response.success ? "success" : "error"
            ).then(() => {
                if (response.success) {
                    setIsNext(3);
                } else {
                    setIsNext(1);
                }
            });
        }
    };
    const handleSignup = async () => {
        setOtpError("");

        let isValid = true;

        // Validate OTP
        if (otp.trim() === "") {
            setOtpError("OTP is required");
            isValid = false;
        } else if (!/^\d{6}$/.test(otp)) {
            setOtpError("OTP must be a 6-digit number");
            isValid = false;
        }

        if (isValid) {
            if (password === confirmPassword) {
                const response = await apiConfirmOTP({
                    code: otp,
                    email,
                    password,
                    firstname: firstName,
                    lastname: lastName,
                    mobile: phone,
                });
                if (response.success) {
                    Swal.fire(
                        response.success
                            ? "Register Success"
                            : "Register Failed",
                        response.message,
                        response.success ? "success" : "error"
                    ).then(() => {
                        if (response.success) {
                            setIsLogin(1);
                            setIsNext(1);
                            setIsShowPassword(false);
                            setIsShowConfirmPassword(false);
                            setEmail("");
                            setPassword("");
                            setConfirmPassword("");
                            setFirstName("");
                            setLastName("");
                            setPhone("");
                            setOtp("");
                        } else setIsNext(1);
                    });
                } else
                    Swal.fire(
                        response.success
                            ? "Register Success"
                            : "Register Failed",
                        response.message,
                        response.success ? "success" : "error"
                    );
            } else Swal.fire("Register failed", "Password not match", "error");
        }
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div
                className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 absolute ${isNext === 2
                    ? "animate-leftSlider z-0"
                    : isNext === 3
                        ? "hidden"
                        : "animate-rightSlider z-10"
                    }`}
            >
                <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                <div className="mb-4 min-w-[400px]">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="emailRegister"
                    >
                        Email
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError && "border-red-500"
                            }`}
                        id="emailRegister"
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <p className="text-red-500 text-xs italic">
                            {emailError}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="passwordRegister"
                    >
                        Password
                    </label>
                    <div
                        className={`border rounded w-full shadow flex items-center pr-3 ${passwordError && "border-red-500"
                            }`}
                    >
                        <input
                            className={` appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                            id="passwordRegister"
                            type={`${isShowPassword ? "text" : "password"}`}
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {!isShowPassword ? (
                            <ShowPasswordIcon
                                className="cursor-pointer"
                                onClick={() => setIsShowPassword(true)}
                            />
                        ) : (
                            <HidePasswordIcon
                                className="cursor-pointer"
                                onClick={() => setIsShowPassword(false)}
                            />
                        )}
                    </div>
                    {passwordError && (
                        <p className="text-red-500 text-xs italic">
                            {passwordError}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <div
                        className={`border rounded w-full shadow flex items-center pr-3 ${confirmPasswordError && "border-red-500"
                            }`}
                    >
                        <input
                            className={` appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                            id="confirmPassword"
                            type={`${isShowConfirmPassword ? "text" : "password"
                                }`}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleNext();
                            }}
                        />
                        {!isShowConfirmPassword ? (
                            <ShowPasswordIcon
                                className="cursor-pointer"
                                onClick={() => setIsShowConfirmPassword(true)}
                            />
                        ) : (
                            <HidePasswordIcon
                                className="cursor-pointer"
                                onClick={() => setIsShowConfirmPassword(false)}
                            />
                        )}
                    </div>
                    {confirmPasswordError && (
                        <p className="text-red-500 text-xs italic">
                            {confirmPasswordError}
                        </p>
                    )}
                </div>
                <div className="flex flex-col justify-between gap-3">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                    <p
                        onClick={() => setIsLogin(1)}
                        className=" cursor-pointer underline inline-block align-baseline font-bold text-sm  hover:text-blue-800"
                    >
                        Already have an account? Sign In
                    </p>
                </div>
            </div>

            <div
                className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 absolute ${isNext === 1
                    ? "animate-leftSlider z-0"
                    : isNext === 3
                        ? "hidden"
                        : "animate-rightSlider z-10"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <PrevArrowIcon
                        size={30}
                        className="cursor-pointer "
                        onClick={() => setIsNext(1)}
                    />
                    <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                </div>
                <div className="mb-4 min-w-[400px]">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="firstname"
                    >
                        First Name
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${firstNameError && "border-red-500"
                            }`}
                        id="firstname"
                        type="text"
                        placeholder="Enter your First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {firstNameError && (
                        <p className="text-red-500 text-xs italic">
                            {firstNameError}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="lastname"
                    >
                        Last Name
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${lastNameError && "border-red-500"
                            }`}
                        id="lastname"
                        type="text"
                        placeholder="Enter your Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {lastNameError && (
                        <p className="text-red-500 text-xs italic">
                            {lastNameError}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="mobile"
                    >
                        Phone Number
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${phoneError && "border-red-500"
                            }`}
                        id="mobile"
                        type="text"
                        placeholder="Type your Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {phoneError && (
                        <p className="text-red-500 text-xs italic">
                            {phoneError}
                        </p>
                    )}
                </div>
                <div className="flex flex-col justify-between gap-3">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleSendMail}
                    >
                        Send OTP
                    </button>
                    <p
                        onClick={() => setIsLogin(1)}
                        className=" cursor-pointer underline inline-block align-baseline font-bold text-sm  hover:text-blue-800"
                    >
                        Already have an account? Sign In
                    </p>
                </div>
            </div>

            <div
                className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 absolute ${isNext === 1
                    ? "hidden"
                    : isNext === 2
                        ? "animate-leftSlider z-0"
                        : "animate-rightSlider z-10"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <PrevArrowIcon
                        size={30}
                        className="cursor-pointer "
                        onClick={() => setIsNext(2)}
                    />
                    <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                </div>
                <div className="mb-4 min-w-[400px]">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="otp"
                    >
                        OTP
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${otpError && "border-red-500"
                            }`}
                        id="otp"
                        type="text"
                        placeholder="Enter your OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    {otpError && (
                        <p className="text-red-500 text-xs italic">
                            {otpError}
                        </p>
                    )}
                </div>

                <div className="flex flex-col justify-between gap-3">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleSignup}
                    >
                        Sign Up
                    </button>
                    <p
                        onClick={() => setIsLogin(1)}
                        className=" cursor-pointer underline inline-block align-baseline font-bold text-sm  hover:text-blue-800"
                    >
                        Already have an account? Sign In
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
