import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation } from "components";
import Footer from "components/Footer";
import { useSelector } from "react-redux";
import { navItems } from "../../ultils/constaint";

const Public = () => {
    const { width } = useSelector((state) => state.app);
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-main flex flex-col items-center ">
                <Header />
                {width !== 1 && <Navigation navItems={navItems}/>}
                <div className={` w-full  max-w-main flex justify-center ${width !== 1 ? " px-5" : "p-1"}`}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Public;
