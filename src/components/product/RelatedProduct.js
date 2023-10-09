import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { NextIcon, PrevIcon } from "ultils/icons";
import ProductType2 from "./ProductType2";
import { useSelector } from "react-redux";

const RelatedProduct = ({ products }) => {
    const swiperRef = useRef();
    const { width } = useSelector(state => state.app)
    return (
        <div className="flex flex-col gap-3">
            <span className="font-semibold text-[20px] py-1 border-b-[2px] border-b-red-600">OTHER CUSTOMERS ALSO BUY:</span>
            <div className="mt-5 w-full relative overflow-hidden">
                <Swiper
                    slidesPerView={width + 1}
                    spaceBetween={20}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {products?.map((product) => (
                        <SwiperSlide key={product._id}>
                            <ProductType2 product={product} fatherPath={`/collections/${product.category._id}/products/${product._id}`} swiperRef={swiperRef} />
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

export default RelatedProduct;
