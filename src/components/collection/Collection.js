import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "app/asyncActions";
import phone from "assets/category/mobile.webp";
import laptop from "assets/category/laptop_300x.avif";
import headphone from "assets/category/headphone.webp";
import tablet from "assets/category/pc-1_300x.avif";
import tv from "assets/category/television.avif";
import printer from "assets/category/printer.avif";
import { Link } from "react-router-dom";
const Collection = () => {
    const categorySelector = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const { width } = useSelector((state) => state.app);
    useEffect(() => {
        dispatch(getCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const newCate = categorySelector?.categories?.filter(
        (item) => item.title !== "Camera" && item.title !== "Speaker"
    );
    const img = [laptop, headphone, phone, tablet, tv, printer];

    const collections = newCate?.map((item, index) => {
        return {
            ...item,
            img: img[index],
        };
    });
    return (
        <div>
            <h1 className="text-[18px] font-medium py-[15px] border-b-[2px] border-b-red-600">
                COLLECTIONS
            </h1>
            <div className={`grid  gap-5 my-8 ${width === 3 ? "grid-cols-3" : width === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                {collections?.map((item) => (
                    <Link
                        to={item._id}
                        key={item._id}
                        className="p-4 flex gap-8 border items-center group cursor-pointer"
                    >
                        <img
                            src={item.img}
                            alt=""
                            className="w-fit h-fit group-hover:scale-125 duration-300"
                        />
                        <div className="flex flex-col gap-1 group-hover:scale-125 duration-300">
                            <span className="font-medium">{item.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Collection;
