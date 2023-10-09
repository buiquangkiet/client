import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({navItems}) => {
    return (
        <div className="px-5 max-w-main w-full py-2 flex items-center gap-[30px] text-[16px] font-light border-b-[1px] border-b-[rgba(0,0,0,0.1)]">
            {navItems?.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) => (isActive ? "text-main" : "")}
                >
                    {item.name}
                </NavLink>
            ))}
        </div>
    );
};

export default Navigation;
