import React, { useState } from "react";
import logo from "assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import path from "ultils/paths";
import {
    AuctionIcon,
    CreateProductIcon,
    DashBoardIcon,
    ManageProductIcon,
    ShopIcon,
    UserManagerIcon,
} from "ultils/icons";
import AuctionProduct from "components/home/Auction";
import CreateAuctionProduct from "pages/admin/CreateAuctionProduct";
import ManageAuctionProducts from "pages/admin/ManageAuctionProducts";
const AdminSidebar = () => {
    const sidebarItems = [
        { title: "Dashboard", link: path.DASHBOARD, icon: <DashBoardIcon /> },

        { title: "Users", link: path.MANAGE_USERS, icon: <UserManagerIcon /> },
        { title: "Orders", link: path.MANAGE_ORDERS, icon: <ShopIcon /> },

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

        {
            title: "Create Auction",
            link: path.CREATE_AUCTION_PRODUCT,
            icon: < CreateProductIcon />,
        },
        {
            title: "Manage Auction",
            link: path.MANAGE_AUCTION_PRODUCTS,
            icon: <ManageProductIcon />,
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
            <div className="flex flex-col  items-start pt-[30px]">
                {sidebarItems.map((item) =>
                (
                    <NavLink
                        key={item.title}
                        to={item.link}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-main text-white w-full px-4 py-2 flex gap-2 items-center"
                                : "w-full px-4  py-2 hover:bg-red-400 hover:text-white duration-200  flex gap-2 items-center"
                        }
                    >
                        <p>{item.icon}</p>
                        <p>{item.title}</p>
                    </NavLink>
                )
                )}
            </div>
        </div>
    );
};

export default AdminSidebar;
