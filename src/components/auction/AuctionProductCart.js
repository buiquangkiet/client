import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { AuctionIcon } from 'ultils/icons'
import path from 'ultils/paths'

const AuctionProductCart = ({ product }) => {
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

    // Function to calculate the remaining time in seconds
    function calculateRemainingTime() {
        const givenDate = new Date(product.expire);
        const currentDate = new Date();
        const timeDifference = givenDate - currentDate;
        return Math.max(Math.floor(timeDifference / 1000), 0);
    }

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

        return `${formattedDays}d ${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
    }
    return (
        <div className="flex flex-col gap-3 px-4 py-5 border group cursor-pointer relative overflow-hidden">
            <div className="absolute top-[24px] right-[-50px] rotate-45 px-2 py-1 bg-[#C83241] text-white ">
                <div className=" border-dotted border-[2px] px-8 py-[1px] flex items-center justify-center gap-2 ">
                    <span className='font-extrabold text-[14px]'>AUCTION</span>
                    <AuctionIcon size={20} />
                </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 duration-200 w-full h-full px-5 py-[10px] bg-white absolute top-0 left-0">
                <div className="flex flex-col items-center justify-between pb-[10px] border-b-[1px]">
                    <Link
                        to={`/auction-products/${product._id}`}
                        className="text-[18px] font-semibold text-center "
                    >
                        {product.title}
                    </Link>
                    <p
                        className="hover:text-main cursor-pointer"
                        title={`$${(
                            product.reservePrice * 0.000043
                        ).toFixed(2)}USD`}
                    >
                        {product?.auctionHistory?.length > 0 ? product?.auctionHistory[0].price?.toLocaleString("vi-VN") + " VND" :
                            product?.reservePrice?.toLocaleString("vi-VN") + " VND"
                        }
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

            </div>
            <img
                src={product.thumbnail?.path ? product.thumbnail.path : product.thumbnail}
                alt=""
                className="w-full h-[245px] object-contain"
            />
            <p className="hover:text-main cursor-pointer truncate">
                {product.title}
            </p>
            <div className="text-[16px] flex items-center gap-1">
                {/* Auction ends in: {formatRemainingTime()} */}
                {/* {remainingTime !== 0 ? <span> Auction ends in:</span> : <></>} */}
                <span className="text-main">{formatRemainingTime()} </span>
            </div>
            <p
                className="hover:text-main cursor-pointer"
                title={`$${(
                    product.reservePrice * 0.000043
                ).toFixed(2)}USD`}
            >
                {product?.maxPrice?.toLocaleString("vi-VN") + " VND"
                }
            </p>
        </div>
    )
}

export default memo(AuctionProductCart)
