import { apiGetCurrent } from "apis/user";
import { Header, Navigation } from "components";
import PrivateSidebar from "components/Private/PrivateSidebar";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import path from "ultils/paths";
const MemberLayout = () => {
    const { width } = useSelector(state => state.app)
    const navigate = useNavigate()
    // console.log();

    const navItems = [
        {
            name: "My Profile",
            path: path.PERSONAL,
        },
        {
            name: "My Purchases",
            path: path.MY_PURCHASES,
        },

    ];
    useEffect(() => {
        const fetchUser = async () => {
            const res = await apiGetCurrent();
            if (res.success) {
                if (res.response.role !== 4)
                    navigate(path.PUBLIC);
            } else {
                Swal.fire("Error", res.message, "error").then(() =>
                    navigate(path.PUBLIC)
                );
            }
        };
        fetchUser();
    }, []);
    return (
        <div className="w-full flex flex-col">
            <Header />
            <div className={`flex flex-col`} >
                <Navigation navItems={navItems} />
                <div className="w-full flex-auto" >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MemberLayout;
