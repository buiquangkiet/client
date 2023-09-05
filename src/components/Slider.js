import React, { useRef } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { NextIcon, PrevIcon } from "../ultils/icons";
import Product from "./product/Product";
import { useSelector } from "react-redux";

const Slider = ({ products }) => {
    const { width } = useSelector(state => state.app);

    const swiperRef = useRef();
    return (
        <div className="mt-5 w-full relative overflow-hidden">
            <Swiper
                slidesPerView={width === 1 ? 2 : 3}
                loop={true}
                spaceBetween={width === 1 ? 5 : 20}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {products?.map((item) => (
                    <SwiperSlide key={item._id}>
                        <Product product={item} />
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
    );
};

export default Slider;
