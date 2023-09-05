import React, { useEffect, useRef, useState } from "react";
import { getStars } from "ultils/helpers";
import { EyeIcon, HeartIcon, ThreelineIcon } from "ultils/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { NextIcon, PrevIcon } from "ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import { memo } from "react";
import * as DOMPurify from 'dompurify';
import { useDispatch, useSelector } from "react-redux";
import { setModel } from "app/ProductModel";
import ProductModel from "components/product/ProductModel";

const NewArrival = ({ newPhones, newTablets, newLaptops }) => {
    const swiperRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [active, setActive] = useState({ title: "Smartphone", products: newPhones });
    const { width } = useSelector(state => state.app);

    const product = [
        { title: "Smartphone", products: newPhones },
        { title: "Tablet", products: newTablets },
        { title: "Laptop", products: newLaptops },
    ];
    const icon = [
        <HeartIcon size={20} />,
        <ThreelineIcon size={20} />,
        <EyeIcon size={20} />,
    ];

    useEffect(() => {
        if (newPhones) setActive({ title: "Smartphone", products: newPhones });
    }, [newPhones])
    return (
        <div className="flex flex-col gap-3">
            <div className="py-[15px] border-b-[2px] border-b-red-600 flex items-center justify-between">
                <h1 className="text-[18px] font-medium">NEW ARRIVALS</h1>
                <div className="flex items-center font-normal ">
                    {product.map((item) => (
                        <div
                            onClick={() => setActive(item)}
                            key={item.title}
                            className={`px-4 cursor-pointer ${active.title === item.title && "text-main"
                                } ${item.title !== "Laptop" && "border-r-[1px]"}`}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-5 w-full relative overflow-hidden">
                <Swiper
                    slidesPerView={width + 1}
                    spaceBetween={width === 1 ? 3 : 20}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {active?.products &&
                        active?.products?.map((product) => (
                            <SwiperSlide key={product._id}>
                                <div className="flex flex-col gap-3 px-4 py-5 border group cursor-pointer relative ">
                                    <div className="opacity-0 group-hover:opacity-100 duration-200 w-full h-full px-5 py-[10px] bg-white absolute top-0 left-0">
                                        <div className="flex flex-col items-center justify-between pb-[10px] border-b-[1px]">
                                            <Link
                                                to={`/collections/${product.category._id}/products/${product._id}`}
                                                className="text-[18px] font-semibold text-center "
                                            >
                                                {product.title}
                                            </Link>
                                            <p
                                                className="hover:text-main cursor-pointer"
                                                title={`$${(
                                                    product.price * 0.000043
                                                ).toFixed(2)}USD`}
                                            >
                                                {product.price.toLocaleString(
                                                    "vi-VN"
                                                ) + " VND"}
                                            </p>
                                        </div>
                                        <div className="flex flex-col mt-[10px] text-[14px]">
                                            {product.description?.length > 1 ? product?.description.map((item, index) => (
                                                <div key={index}>{item}</div>
                                            )) :
                                                <div className="text-[15px] text-justify line-clamp-[10] "
                                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description[0]) }}>
                                                </div>}
                                        </div>
                                        <div className="flex gap-4 justify-center opacity-0 items-center absolute bottom-0 left-5 group-hover:bottom-6 duration-300 group-hover:opacity-100">
                                            {icon.map((item, index) => (
                                                <div
                                                    className="p-2 rounded-full border  bg-white cursor-pointer hover:bg-black hover:text-white "
                                                    key={index}
                                                    onClick={() => {
                                                        if (index === 0) {
                                                        }
                                                        if (index === 1) {
                                                            navigate(`/collections/${product.category}/products/${product._id}`);
                                                        }
                                                        if (index === 2) {
                                                            dispatch(
                                                                setModel({
                                                                    product: (
                                                                        <ProductModel
                                                                            product={product}
                                                                        />
                                                                    ),
                                                                })
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <img
                                        src={product.thumbnail?.path ? product.thumbnail.path : product.thumbnail}
                                        alt=""
                                        className="w-full h-[245px] object-contain"
                                    />
                                    <p className="hover:text-main cursor-pointer truncate">
                                        {product.title}
                                    </p>
                                    <div className="flex">
                                        {getStars(product?.totalRating).map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="text-yellow-500"
                                                >
                                                    {item}
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <p
                                        className="hover:text-main cursor-pointer"
                                        title={`$${(
                                            product.price * 0.000043
                                        ).toFixed(2)}USD`}
                                    >
                                        {product.price.toLocaleString("vi-VN") +
                                            " VND"}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>

                <div
                    onClick={() => swiperRef.current?.slideNext()}
                    className="absolute w-28 h-28 bg-[#fff9]/30 pl-1 hover:bg-white hover:border transition duration-300 rounded-full translate-x-[65%] flex justify-start items-center cursor-pointer top-2/4 right-[-4px] -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl"
                >
                    <NextIcon size={35} color="black" />
                </div>
                <div
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="absolute w-28 h-28 bg-[#fff9]/30 pr-1 hover:bg-white hover:border transition duration-300 rounded-full -translate-x-[65%] flex justify-end items-center cursor-pointer top-2/4 left-[-4px] -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl "
                >
                    <PrevIcon size={35} color="black" />
                </div>
            </div>
        </div>
    );
};

export default memo(NewArrival);
