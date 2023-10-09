import { apiGetCurrent } from "apis/user";
import { Header, Navigation } from "components";
import Footer from "components/common/Footer";
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
            name: "Profile",
            path: path.PERSONAL,
        },
        {
            name: "Purchases",
            path: path.MY_PURCHASES,
        },
        {
            name: "Auctions",
            path: path.MY_AUCTION,
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
        <div className="w-full flex flex-col items-center">
            {/* <div className="w-full max-w-main flex flex-col items-center ">
                <Header />
                <div className={`flex flex-col`} >
                    <Navigation navItems={navItems} />
                    <div className="w-full flex-auto" >
                        <Outlet />
                    </div>
                </div>
            </div> */}
            <div className="w-full max-w-main flex flex-col items-center ">
                <Header />
                <Navigation navItems={navItems} />
                <div className={` w-full  max-w-main flex justify-center ${width !== 1 ? " px-5" : "p-1"}`}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>


    );
};

export default MemberLayout;
