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
const AdminSidebar = () => {
    const sidebarItems = [
        { title: "Dashboard", items: [{ title: "Dashboard", link: path.DASHBOARD, icon: <DashBoardIcon /> }] },

        { title: "User", items: [{ title: "Users", link: path.MANAGE_USERS, icon: <UserManagerIcon /> }] },
        { title: "Order", items: [{ title: "Orders", link: path.MANAGE_ORDERS, icon: <ShopIcon /> }] },

        {
            title: "Product",
            items: [{
                title: "Create Product",
                link: path.CREATE_PRODUCT,
                icon: <CreateProductIcon />,
            },
            {
                title: "Manage Products",
                link: path.MANAGE_PRODUCTS,
                icon: <ManageProductIcon />,
            },]
        },

        {
            title: "Auction",
            items: [
                {
                    title: "Create Auction",
                    link: path.CREATE_AUCTION_PRODUCT,
                    icon: < CreateProductIcon />,
                },
                {
                    title: "Manage Auction",
                    link: path.MANAGE_AUCTION_PRODUCTS,
                    icon: <ManageProductIcon />,
                }
            ],
        }
    ];
    return (
        <div className=" flex flex-col  border-r-[1px] px-2 pt-[30px] gap-5">
            {sidebarItems.map(item =>
                <div className="flex flex-col items-start gap-1 w-full px-2">
                    <span className="text-span opacity-50 text-[18px]">{item.title}</span>
                    <div className="w-full">
                        {item.items.map((item2) =>
                        (
                            <NavLink
                                key={item2.title}
                                to={item2.link}
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-main duration-300 text-white w-full px-4 py-2 flex gap-2 items-center shadow-xl rounded-3xl"
                                        : "w-full px-4  py-2 hover:bg-red-400 hover:text-white duration-300  flex gap-2 items-center rounded-3xl"
                                }
                            >
                                <p>{item2.icon}</p>
                                <p>{item2.title}</p>
                            </NavLink>
                        )
                        )}
                    </div>
                </div>

            )}

        </div>
    );
};

export default AdminSidebar;
