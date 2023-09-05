import React, { useEffect } from "react";
import { ListIcon } from "ultils/icons";
import { categories as cateIcon } from "ultils/constaint";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "app/asyncActions";
import { Link } from "react-router-dom";
import path from "ultils/paths";
import { useState } from "react";

const Sidebar = () => {
    const { categories } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    const newCategory = categories
        ?.slice() // Create a shallow copy of the original array
        .sort((a, b) => a.title.localeCompare(b.title)) // Sort by title
        .map((category, index) => ({
            icon: cateIcon[index].icon,
            title: category.title,
            id: category._id,
        }));
    return (
        <div className="flex flex-col border text-[14px]">
            <div className="flex items-center gap-3 px-5 py-[10px] bg-main text-white">
                <ListIcon />
                <span>ALL COLLECTIONS</span>
            </div>
            {newCategory?.map((category, index) => (
                <Link
                    to={`/${path.COLLECTIONS}/${category.id}`}
                    key={index}
                    className="flex items-center gap-3 px-5 py-[10px] cursor-pointer hover:text-main"
                >
                    {category.icon}
                    <span>{category?.title}</span>
                </Link>
            ))}
        </div>
    );
};

export default Sidebar;
