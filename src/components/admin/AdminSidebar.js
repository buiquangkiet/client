import React, { useState } from "react";
import logo from "assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import path from "ultils/paths";
import {
    CreateProductIcon,
    DashBoardIcon,
    ManageProductIcon,
    ShopIcon,
    UserManagerIcon,
} from "ultils/icons";
const AdminSidebar = () => {
    const sidebarItems = [
        { title: "Dashboard", link: path.DASHBOARD, icon: <DashBoardIcon /> },

        { title: "Users", link: path.MANAGE_USERS, icon: <UserManagerIcon /> },
        { title: "Orders", link: path.MANAGE_ORDERS, icon: <ShopIcon /> },
        {
            title: "Products ",
            icon: <ManageProductIcon />,
            dropdown: true,
            child: [
                {
                    title: "Create Product",
                    link: path.CREATE_PRODUCT,
                    icon: <CreateProductIcon />,
                },
                {
                    title: "Manage Products",
                    link: path.MANAGE_PRODUCTS,
                    icon: <ManageProductIcon />,
                },
            ],
        },
    ];
    const [isDropdown, setIsDropdown] = useState(false);
    return (
        <div className="  flex flex-col  border-r-[1px] gap-8 ">
            {/* <div className="flex flex-col gap-2 items-center">
                <Link to={path.DASHBOARD}>
                    {" "}
                    <img src={logo} alt="" className="w-[150px]" />
                </Link>
                <span className="text-[14px]">Admin Workspace</span>
            </div> */}
            <div className="flex flex-col  items-start ">
                {sidebarItems.map((item) =>
                    !item.dropdown ? (
                        <NavLink
                            key={item.title}
                            to={item.link}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-main bg-gray-300  w-full px-4 py-2 flex gap-2 items-center"
                                    : "w-full px-4  py-2 hover:bg-gray-100 duration-200  flex gap-2 items-center"
                            }
                        >
                            <p>{item.icon}</p>
                            <p>{item.title}</p>
                        </NavLink>
                    ) : (
                        <div className="w-full " key={item.title}>
                            <span
                                className={`hover:cursor-pointer w-full px-4 flex justify-between py-2 ${isDropdown ? "text-main " : ""
                                    }`}
                                onClick={() => setIsDropdown(!isDropdown)}
                            >
                                <div className=" flex gap-2 items-center">
                                    <span>{item.icon}</span>
                                    <span>{item.title}</span>
                                </div>
                                <span className="w-[16px] h-[16px] flex items-center justify-center border rounded-full">
                                    {isDropdown ? "-" : "+"}
                                </span>
                            </span>
                            {isDropdown && (
                                <div className="flex flex-col   animate-showMenu2">
                                    {item.child.map((item2) => (
                                        <NavLink
                                            to={item2.link}
                                            key={item2.title}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "text-main bg-gray-300  w-full pl-6  py-2  flex gap-2 items-center"
                                                    : "w-full pl-6  py-2 hover:bg-gray-100 duration-200  flex gap-2 items-center"
                                            }
                                        >
                                            <span>{item2.icon}</span>
                                            <span>{item2.title}</span>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default AdminSidebar;
