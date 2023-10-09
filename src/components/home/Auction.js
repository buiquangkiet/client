import React, { useEffect, useState } from "react";
import auction from "assets/auction.jpg";
import { useSelector } from "react-redux";
import { AuctionIcon, NextIcon, PrevIcon } from "ultils/icons";
import { apiGetAuctionProducts } from "apis/auctionProduct";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AuctionProductCart from "components/auction/AuctionProductCart";
import { Link } from "react-router-dom";
import path from "ultils/paths";
const AuctionProduct = () => {
    const { width } = useSelector(state => state.app);
    const swiperRef = useRef();

    const [products, setProduct] = useState([]);
    const fetchProducts = async () => {
        const response = await apiGetAuctionProducts({
            limit: 9,
            page: 1,
            sort: "-createAt",
        });
        if (response.success) {
            setProduct(response.products);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="mt-5 flex flex-col gap-5">
            <div className=" py-[15px] border-b-[2px] border-b-red-600 text-[18px] font-medium flex items-center gap-2">
                <span>Auction Products</span>
                <AuctionIcon size={25} />
            </div>
            <Link to={path.AUCTION_PRODUCTS}><img src={auction} alt="" className=" w-full object-cover" /></Link>
            <div className="mt-5 w-full relative overflow-hidden">
                <Swiper
                    slidesPerView={width + 1}
                    spaceBetween={width === 1 ? 3 : 20}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {products &&
                        products?.map((product) => (
                            <SwiperSlide key={product._id}>
                                <AuctionProductCart product={product} />
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

export default AuctionProduct;
