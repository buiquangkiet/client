import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiResetPassword } from "apis/user";
import path from "ultils/paths";
const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const navigate = useNavigate();
    const { token } = useParams();
    const handleSetPassword = async () => {
        setPasswordError("");
        setConfirmPasswordError("");
        let isValid = true;
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
            const response = await apiResetPassword({ token, password });
            if (response.success) {
                Swal.fire(
                    response.success ? "Success" : "Error",
                    "You have successfully reset your password, please login again",
                    response.success ? "success" : "error"
                ).then(() => window.close());
            } else {
                Swal.fire(
                    response.success ? "Success" : "Error",
                    response.message,
                    response.success ? "success" : "error"
                );
            }
        }
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
                <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="resetPassword"
                    >
                        Password
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 min-w-[400px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            passwordError && "border-red-500"
                        }`}
                        id="resetPassword"
                        type="password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                        <p className="text-red-500 text-xs italic">
                            {passwordError}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="confirmResetPassword"
                    >
                        Confirm Password
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 min-w-[400px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            passwordError && "border-red-500"
                        }`}
                        id="confirmResetPassword"
                        type="password"
                        placeholder="Enter your Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && (
                        <p className="text-red-500 text-xs italic">
                            {confirmPasswordError}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleSetPassword}
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
