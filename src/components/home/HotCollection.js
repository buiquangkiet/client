import React from "react";
import { useSelector } from "react-redux";
import phone from "assets/category/mobile.webp";
import laptop from "assets/category/laptop_300x.avif";
import headphone from "assets/category/headphone.webp";
import tablet from "assets/category/pc-1_300x.avif";
import tv from "assets/category/television.avif";
import printer from "assets/category/printer.avif";
import { Link } from "react-router-dom";
const HotCollection = () => {
    const { width } = useSelector(state => state.app);
    const categorySelector = useSelector((state) => state.app);
    const newCate = categorySelector?.categories?.filter(
        (item) => item.title !== "Camera" && item.title !== "Speaker"
    );
    const img = [laptop, headphone, phone, tablet, tv, printer];
    const categories = newCate?.map((item, index) => {
        return {
            ...item,
            img: img[index],
        };
    });
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-[18px] font-medium py-[15px] border-b-[2px] border-b-red-600">
                HOT COLLECTIONS
            </h1>
            <div
                className={`grid gap-5 ${width === 3 ? "grid-cols-3 " : width === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                {categories?.map((item) => (
                    <div
                        key={item._id}
                        className="p-4 flex gap-8 border items-center"
                    >
                        <Link to={`/collections/${item._id}`}>
                            <img
                                src={item.img}
                                alt=""
                                className="w-fit h-fit"
                            />
                        </Link>
                        <div className="flex flex-col gap-1">
                            <Link
                                to={`/collections/${item._id}`}
                                className="font-medium hover:text-main"
                            >
                                {item.title}
                            </Link>
                            <div className="flex flex-col gap-1 text-[14px]">
                                {item.brand.map((br) => (
                                    <span
                                        className="hover:text-main cursor-pointer"
                                        key={br}
                                    >{`> ${br}`}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default HotCollection;
