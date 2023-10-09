import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetDetailProduct, apiGetProducts } from "apis/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { AuctionIcon, NextIcon, PrevIcon } from "ultils/icons";
import ReactImageMagnify from "react-image-magnify";
import { getStars } from "ultils/helpers";
import { extraInfo } from "ultils/constaint";
import ProductInfo from "components/product/ProductInfo";
import RelatedProduct from "components/product/RelatedProduct";
import { useDispatch, useSelector } from "react-redux";
import { setDetail } from "app/productSlice";
import { apiAddToCart } from "apis/user";
import { updateCurrentUser } from "app/user/userSlice";
import Swal from "sweetalert2";
import { setModel } from "app/ProductModel";
import * as DOMPurify from 'dompurify';
import RightCart from "components/common/RightCart";
import { setLoading } from "app/appSlice";
import { memo } from "react";
import { apiBidProduct, apiGetDetailAuctionProduct } from "apis/auctionProduct";
import BidderListModel from "components/auction/BidderListModel";
const DetailAuctionProduct = () => {
    const { pid } = useParams();
    const navigate = useNavigate();
    const swiperRef = useRef();
    const [activeThumbnail, setActiveThumbnail] = useState();
    const [relatedProducts, setRelatedProducts] = useState();
    const [initVariant, setInitVariant] = useState();
    const [activeVariant, setActiveVariant] = useState();
    const detailProduct = useSelector((state) => state.product.detailProduct);
    const dispatch = useDispatch();
    const currentUser = JSON.parse(window.localStorage.getItem("persist:user"));
    const user = useSelector(state => state.user.currentUser);
    const { width } = useSelector(state => state.app)
    const [remainingTime, setRemainingTime] = useState();
    const [bidPrice, setBidPrice] = useState();
    // Function to calculate the remaining time in seconds
    const formatDate = (time) => {
        const date = new Date(time);
        // Format the date in the desired format
        const formattedDate = date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        return formattedDate
    }
    function calculateRemainingTime() {
        const givenDate = new Date(detailProduct?.expire);
        const currentDate = new Date();
        const timeDifference = givenDate - currentDate;
        return Math.max(Math.floor(timeDifference / 1000), 0);
    }
    useEffect(() => {
        setRemainingTime(calculateRemainingTime())
    }, [detailProduct?.expire])
    // Update the remaining time in the state every second
    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevRemainingTime => Math.max(prevRemainingTime - 1, 0));
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(timer);
    }, []);
    // Function to format the remaining time
    function formatRemainingTime() {
        if (remainingTime === 0) return `This auction has ended.`
        const formattedDays = Math.floor(remainingTime / 86400);
        const formattedHours = Math.floor((remainingTime % 86400) / 3600);
        const formattedMinutes = Math.floor((remainingTime % 3600) / 60);
        const formattedSeconds = remainingTime % 60;

        return {
            day: (formattedDays >= 10 && formattedDays !== 0) ? formattedDays : `0${formattedDays}`,
            hour: (formattedHours >= 10 && formattedHours !== 0) ? formattedHours : `0${formattedHours}`,
            minute: (formattedMinutes >= 10 && formattedMinutes !== 0) ? formattedMinutes : `0${formattedMinutes}`,
            second: (formattedSeconds >= 10 && formattedSeconds !== 0) ? formattedSeconds : `0${formattedSeconds}`,
        };
    }
    const fetchProduct = async () => {
        dispatch(setLoading(true));
        const response = await apiGetDetailAuctionProduct(pid);
        if (response.success) {
            dispatch(setDetail(response.product));
        }

        const response2 = await apiGetProducts({
            category: response?.product?.category,
            limit: 10,
        });
        if (response2.success)
            setRelatedProducts(
                response2?.products?.filter((item) => item._id !== pid)
            );
        dispatch(setLoading(false));

    };
    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid]);
    useEffect(() => {
        setInitVariant(detailProduct?.variants);
    }, [detailProduct]);
    useEffect(() => {
        if (initVariant)
            Object.keys(initVariant).forEach((label) => {
                setActiveVariant((prev) => ({
                    ...prev,
                    [label]: initVariant[label][0],
                }));
            });
    }, [initVariant]);
    const handleSetVariant = (label, variant) => {
        const obj = { ...activeVariant, [label]: variant };
        setActiveVariant(obj);
    };
    const handleBidProduct = async () => {
        // console.log(currentUser);
        // apiBidProduct
        if (currentUser.isLoggedIn === "false") {
            Swal.fire({
                title: "Opps",
                text: "Login to use this feature !",
                confirmButtonText: "Login",
                showCancelButton: true,
                cancelButtonText: "Cancel",
            }).then((rs) => {
                if (rs.isConfirmed) navigate("/login");
            });
        } else {
            const minPrice = detailProduct.maxPrice + detailProduct.stepPrice;
            if (bidPrice >= minPrice) {
                dispatch(setLoading(true))
                const res = await apiBidProduct({ pid: detailProduct._id, price: bidPrice });
                dispatch(setLoading(false))
                if (res.success) {
                    Swal.fire({
                        title: "Success",
                        text: "You have successfully bid on this product !",
                    }).then(() => {
                        dispatch(setDetail(res.product))
                        dispatch(updateCurrentUser(res.user));
                        setBidPrice("");
                    })
                }
                else {
                    if (res.message === "Invalid Price") {
                        Swal.fire({
                            title: "Opps",
                            text: "Someone has already bid this product on higher price !",
                            confirmButtonText: "Reload This Page",
                        }).then(rs => rs.isConfirmed && window.location.reload())
                    }
                    else {
                        Swal.fire({
                            title: "Opps",
                            text: res.message
                        })
                    }
                }
            }
            else {
                Swal.fire({
                    title: "Opps",
                    text: `Minimum bidding amount allowed ${detailProduct.auctionHistory.length > 0 ? detailProduct.auctionHistory[0].price + detailProduct.stepPrice : detailProduct.reservePrice + detailProduct.stepPrice} VND`
                })
            }
        }
    }
    // console.log(detailProduct);
    return (
        <div className="w-full">
            {detailProduct ? (
                <div className="flex flex-col gap-5">
                    <div className={` py-5 w-full gap-8 ${width === 3 ? "grid grid-cols-5 " : "flex flex-col gap-5"}`}>
                        <div className="col-span-2 flex flex-col ">
                            <div className=" p-2 border h-fit flex justify-center">
                                <div className="h-full flex items-center justify-center">
                                    {width === 3 ? <ReactImageMagnify
                                        {...{
                                            smallImage: {
                                                alt: "Wristwatch by Ted Baker London",
                                                isFluidWidth: true,
                                                src:
                                                    activeThumbnail ||
                                                    (detailProduct?.thumbnail?.path ? detailProduct?.thumbnail?.path : detailProduct?.thumbnail),
                                                width: 300,
                                                height: 450,
                                            },
                                            largeImage: {
                                                src:
                                                    activeThumbnail ||
                                                    (detailProduct?.thumbnail?.path ? detailProduct?.thumbnail?.path : detailProduct?.thumbnail),
                                                width: 1200,
                                                height: 1800,
                                            },
                                        }}
                                    /> : <img src={activeThumbnail ||
                                        (detailProduct?.thumbnail?.path ? detailProduct?.thumbnail?.path : detailProduct?.thumbnail)} className="w-full" alt="" />}
                                </div>
                            </div>
                            <div className="mt-5 w-full relative overflow-hidden ">
                                <Swiper
                                    slidesPerView={3}
                                    loop={true}
                                    spaceBetween={10}
                                    onBeforeInit={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                >
                                    {[detailProduct?.thumbnail.path ? detailProduct?.thumbnail.path : detailProduct?.thumbnail, ...detailProduct?.image].map((item) => (
                                        <SwiperSlide key={item._id}>
                                            <div
                                                className="p-2 border h-[150px] flex items-center justify-center bg-white"
                                                onClick={() =>
                                                    setActiveThumbnail(item.path ? item.path : item)
                                                }
                                            >
                                                <img
                                                    src={item.path ? item.path : item}
                                                    alt=""
                                                    className="h-fit"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <div
                                    onClick={() =>
                                        swiperRef.current?.slideNext()
                                    }
                                    className="absolute w-28 h-28 bg-[#fff9]/30 pl-1 hover:bg-white hover:border transition duration-300 rounded-full translate-x-[65%] flex justify-start items-center cursor-pointer top-2/4 right-[-4px] -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl"
                                >
                                    <NextIcon size={35} color="black" />
                                </div>
                                <div
                                    onClick={() =>
                                        swiperRef.current?.slidePrev()
                                    }
                                    className="absolute w-28 h-28 bg-[#fff9]/30 pr-1 hover:bg-white hover:border transition duration-300 rounded-full -translate-x-[65%] flex justify-end items-center cursor-pointer top-2/4 left-[-4px] -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl "
                                >
                                    <PrevIcon size={35} color="black" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col gap-4 px-5">
                            <p className="text-[30px] cursor-pointer font-semibold text-main">{detailProduct?.title}</p>
                            <ul className="list-disc ">
                                {detailProduct.description.length > 1 ? detailProduct?.description?.map((item, index) => (
                                    <li className="text-[15px] px-5" key={index}>
                                        {item}
                                    </li>
                                )) : <div className="text-[15px] text-justify line-clamp-[10] " dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detailProduct?.description[0]) }}></div>}
                            </ul>
                            <div className="flex flex-col gap-8">
                                {detailProduct?.variants &&
                                    activeVariant &&
                                    Object.keys(detailProduct?.variants)?.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 items-start"
                                            >
                                                <span className="font-medium w-[20%] flex-none">
                                                    {item}
                                                </span>
                                                <div className="flex gap-3 flex-auto flex-wrap">
                                                    {detailProduct?.variants[
                                                        item
                                                    ].map((variant, index) => (
                                                        <span
                                                            onClick={() =>
                                                                handleSetVariant(
                                                                    item,
                                                                    variant
                                                                )
                                                            }
                                                            key={index}
                                                            className={`px-3 py-1 border text-[15px] cursor-pointer ${variant ===
                                                                activeVariant[
                                                                item
                                                                ] &&
                                                                "border-red-600"
                                                                }`}
                                                        >
                                                            {variant}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                            <div className="flex items-center gap-2 text-main font-semibold mt-3 underline text-[20px]">
                                <span>Live Auction</span>
                                <AuctionIcon />
                            </div>
                            <div className="p-5 border border-black flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold">Bid End Date : </span>
                                    <span>{formatDate(detailProduct?.expire)}</span>
                                </div>
                                {remainingTime === 0 ?
                                    <span className="text-main font-semibold">This auction has ended</span>
                                    :
                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="flex flex-col justify-center items-center border border-black bg-gray-50 w-full h-full  py-3">
                                            <span className="font-bold text-main">{formatRemainingTime().day}</span>
                                            <span>Days</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center border border-black bg-gray-50 w-full h-full py-3">
                                            <span className="font-bold text-main">{formatRemainingTime().hour}</span>
                                            <span>Hours</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center border border-black bg-gray-50 w-full h-full py-3">
                                            <span className="font-bold text-main">{formatRemainingTime().minute}</span>
                                            <span>Minutes</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center border border-black bg-gray-50 w-full h-full py-3">
                                            <span className="font-bold text-main">{formatRemainingTime().second}</span>
                                            <span>Seconds</span>
                                        </div>
                                    </div>
                                }
                                <div className="flex flex-col gap-2 pt-5 border-t-[1px] border-t-black">
                                    <span className="font-semibold text-[14px]">Reserved Price</span>
                                    <span className="font-bold text-[24px]">{detailProduct?.reservePrice?.toLocaleString("vi-VN") +
                                        " VND"}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold text-[14px]">Step Price</span>
                                        {/* <span className="text-[12px] w-[15px] h-[15px] flex items-center justify-center rounded-full border border-black font-bold cursor-pointer">
                                            i
                                        </span> */}
                                    </div>
                                    <span className="font-bold text-[24px]">{detailProduct?.stepPrice?.toLocaleString("vi-VN") +
                                        " VND"}</span>
                                </div>
                                {detailProduct?.auctionHistory?.length > 0 &&
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-[14px]">Highest Bid</span>
                                            <span className="font-semibold text-[14px] underline cursor-pointer text-main"
                                                onClick={() =>
                                                    dispatch(setModel({ product: <BidderListModel auctionHistory={detailProduct.auctionHistory} currentId={user?._id} /> }))}>
                                                {detailProduct?.auctionHistory.length} Bid(s)
                                            </span>
                                        </div>
                                        <span className={`font-bold text-[24px]  
                                        ${user?._id === detailProduct?.auctionHistory[0]?.bidedBy._id ? "text-green-500" : "text-main"}`}>
                                            {detailProduct?.auctionHistory[0]?.price?.toLocaleString("vi-VN") +
                                                " VND"} {user?._id === detailProduct?.auctionHistory[0]?.bidedBy._id && "(You)"}
                                        </span>
                                    </div>
                                }
                                {remainingTime !== 0 &&
                                    <div>
                                        <div className={`flex gap-3 pt-5 border-t-[1px] border-t-black justify-between ${width === 1 && "flex-col"}`}>
                                            <div className="flex-auto">
                                                <input type="number" placeholder={`${(detailProduct?.maxPrice + detailProduct?.stepPrice).toLocaleString("vi-VN")} VND`}
                                                    value={bidPrice}
                                                    onChange={(e) => setBidPrice(e.target.value)}
                                                    className="p-1 border outline-none text-[17px] font-semibold w-full" />
                                            </div>
                                            <button onClick={handleBidProduct} className="px-3 py-2 flex-none outline-none bg-main text-white font-medium hover:bg-red-400">Place Live Bid</button>
                                        </div>
                                        <span className="text-[14px] font-light italic">Minimum bidding amount allowed
                                            <span className="text-main ml-2">{detailProduct?.maxPrice + detailProduct?.stepPrice} </span>
                                            VND
                                        </span>
                                    </div>}
                            </div>
                        </div>
                        <div className={`col-span-1 flex flex-col gap-3 w-full ${width < 3 && "px-5"}`}>
                            {extraInfo.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-3 items-center w-full border px-3 py-1"
                                >
                                    <div className="p-2 bg-gray-700 text-white rounded-full">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col gap-1 text-[14px]">
                                        <span>{item.name}</span>
                                        <span className="text-[13px] text-gray-400">
                                            {item.sub}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <ProductInfo
                        product={detailProduct}
                        info={detailProduct?.info}
                    /> */}
                    {/* <RelatedProduct products={relatedProducts} /> */}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default memo(DetailAuctionProduct);
