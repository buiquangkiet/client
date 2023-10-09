import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import {
    CloseIcon,
    HeartIcon,
    MailIcon,
    PhoneIcon,
    ShopIcon,
    ThreelineIcon,
    UserIcon,
} from "../../ultils/icons";
import { Link, NavLink } from "react-router-dom";
import path from "../../ultils/paths";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/user/userSlice";
import { offModel, setModel } from "app/ProductModel";
import RightCart from "./RightCart";
import { navItems } from "ultils/constaint";
const Header = () => {

    const { width } = useSelector((state) => state.app);
    const { currentUser, isLoggedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef();
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                isOpen
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        dispatch(logout());
    };
    const totalItems = currentUser?.cart?.reduce(
        (total, item) => (total += +item.quantity),
        0
    );
    const MobileSidebar = () => {
        return (
            <div className="fixed top-0 px-3 left-0 h-screen w-[240px]  z-40 bg-black animate-rightSlider flex  text-white">
                <CloseIcon className="absolute top-5 right-5 cursor-pointer"
                    size={25}
                    onClick={() => dispatch(offModel())}
                />
                <div className="flex flex-col p-4 text-[16px] gap-3 mt-[50px]">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => (isActive ? "text-main" : "")}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        )
    }
    // const logoutItem = ["Profile", "Cart", "Logout"];
    return (
        <div className={`h-[110px] text-[14px] w-full max-w-main py-[35px] flex justify-between items-center border-b-[1px] border-b-[rgba(0,0,0,0.1)] z-20 ${width !== 1 ? "px-5" : "px-1"}`}>
            {width === 1 &&
                <ThreelineIcon size={30} className="cursor-pointer"
                    onClick={() => dispatch(setModel({ product: <MobileSidebar /> }))} />}
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="" className={`max-w-[234px] ${width === 1 && "w-[180px]"}`} />
            </Link>
            <div className="flex justify-center gap-4 ">
                <div className={`flex flex-col justify-center items-center pr-4 border-r-[1px] border-r-[rgba(0,0,0,0.1)] ${width !== 3 && "hidden"}`}>
                    <div className="flex items-center gap-2">
                        <PhoneIcon className="text-main" size={16} />
                        <span className="font-medium">0839999504</span>
                    </div>
                    <span className="text-sm text-span">
                        Mon-Sat 9:00AM - 8:00PM
                    </span>
                </div>

                <div className={`flex flex-col justify-center items-center pr-4 border-r-[1px] border-r-[rgba(0,0,0,0.1)] ${width !== 3 && "hidden"}`}>
                    <div className="flex items-center gap-2">
                        <MailIcon className="text-main" size={20} />
                        <span className="font-medium">
                            SUPPORT@TADATHEMES.COM
                        </span>
                    </div>
                    <span className="text-sm text-span">
                        Online Support 24/7
                    </span>
                </div>
                {/* <div className="flex justify-center items-center pr-4 pt-1 border-r-[1px] border-r-[rgba(0,0,0,0.1)]">
                    <HeartIcon className="text-main " size={30} />
                </div> */}
                <div className="flex gap-2 justify-center items-center  border-r-[1px] pr-4 cursor-pointer relative"
                    onClick={() => dispatch(setModel({ product: <RightCart /> }))
                    }>
                    <ShopIcon className="text-main " size={30} />
                    {width !== 1 ? <div

                        className="flex items-center justify-center gap-1  hover:text-main "
                    >
                        <span>{totalItems || 0}</span>
                        <span className="flex items-center">{`${totalItems > 1 ? "items" : "item"
                            }`}</span>
                    </div> :
                        <div className="flex items-center justify-center absolute bottom-0 right-1 text-black w-[20px] h-[20px] rounded-full bg-white border shadow-lg">
                            {totalItems||0}
                        </div>}
                </div>
                {isLoggedIn && currentUser ? (
                    <div ref={buttonRef} className="relative inline-block">
                        <div
                            className=" w-[40px] h-[40px] rounded-full border flex flex-col items-center justify-center cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            {currentUser?.avatar?.path ? (
                                <img src={currentUser?.avatar?.path} className="w-full h-full object-cover rounded-full" alt="" />
                            ) : <UserIcon size={20} className="w-[16px] h-[16px]" />}
                        </div>
                        {isOpen && (
                            <div className="absolute bg-white border rounded-md shadow-lg w-[180px] translate-x-[-90%]">
                                <ul>
                                    <li className=" hover:bg-gray-300 duration-300 cursor-pointer">
                                        <Link
                                            to={
                                                `/${currentUser.role === 4
                                                    ? `${path.MEMBER}/${path.PERSONAL}`
                                                    : `${path.ADMIN}/${path.DASHBOARD}`}`
                                            }
                                            className="w-full h-full flex justify-center  px-4  py-2 "
                                        >
                                            {currentUser.role === 4 ? "My Profile" : "Admin Workspace"}
                                        </Link>
                                    </li>
                                    <li className="  hover:bg-gray-300 duration-300 cursor-pointer">
                                        <Link
                                            to={`/${path.CART}`}
                                            className="w-full h-full flex justify-center px-4  py-2 "
                                        >
                                            My Cart
                                        </Link>
                                    </li>
                                    <li
                                        className="px-4 py-2 flex justify-center hover:bg-gray-300 duration-300 cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to={`/${path.LOGIN}`}
                        className="flex gap-2 justify-center items-center px-6 py-2 text-main duration-300 rounded-sm border  hover:bg-main hover:text-white"
                    >
                        <span className="font-semibold cursor-pointer">
                            Login
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
