import React, { useEffect, useState } from "react";
import { StarFillIcon, ThreelineIcon } from "ultils/icons";
import { apiGetProducts } from "apis/product";
import { getStars } from "ultils/helpers";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";

const DealDaily = () => {
    const [product, setProduct] = useState(() => {
        const storedProduct = localStorage.getItem("dailydealProduct");
        return storedProduct ? JSON.parse(storedProduct) : null;
    });
    const storedHours = parseInt(localStorage.getItem("countdownHours"));
    const storedMinutes = parseInt(localStorage.getItem("countdownMinutes"));
    const storedSeconds = parseInt(localStorage.getItem("countdownSeconds"));
    const [hours, setHours] = useState(storedHours);
    const [minutes, setMinutes] = useState(storedMinutes);
    const [seconds, setSeconds] = useState(storedSeconds);
    const fetchProduct = async () => {
        const response = await apiGetProducts({
            sort: "totalRating",
            limit: 10,
        });
        if (response.success) {
            setProduct(response.products[Math.round(Math.random() * 5)]);
        }
    };
    useEffect(() => {
        const storedProduct = localStorage.getItem("dailydealProduct");
        if (
            storedProduct === "null" ||
            storedProduct === "undefined" ||
            !storedProduct
        ) {
            fetchProduct();
        } else {
            setProduct(JSON.parse(storedProduct));
        }
        const currentTime = new Date();
        const storagedTime = new Date(localStorage.getItem("countdownDate"));
        if (!storagedTime || storagedTime <= currentTime) {
            const now = new Date();
            const end = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + 1,
                now.getHours(),
                now.getMinutes(),
                now.getSeconds()
            );
            localStorage.setItem("countdownDate", end.toDateString());
            fetchProduct();
            localStorage.setItem("dailydealProduct", JSON.stringify(product));
        } else {
            const remainingTime =
                new Date(storagedTime).getTime() - currentTime.getTime();

            const remainingSeconds = Math.floor(remainingTime / 1000);
            const remainingMinutes = Math.floor(remainingSeconds / 60);
            const remainingHours = Math.floor(remainingMinutes / 60);

            setHours(remainingHours);
            setMinutes(remainingMinutes % 60);
            setSeconds(remainingSeconds % 60);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (product)
            localStorage.setItem("dailydealProduct", JSON.stringify(product));
    }, [product]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (seconds === 0 && minutes === 0 && hours === 0) {
                fetchProduct();
                localStorage.setItem(
                    "dailydealProduct",
                    JSON.stringify(product)
                );
                const now = new Date();
                const end = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate() + 1,
                    now.getHours(),
                    now.getMinutes(),
                    now.getSeconds()
                );
                localStorage.setItem("countdownDate", end.toDateString());
                const remainingTime = new Date(end).getTime() - now.getTime();

                const remainingSeconds = Math.floor(remainingTime / 1000);
                const remainingMinutes = Math.floor(remainingSeconds / 60);
                const remainingHours = Math.floor(remainingMinutes / 60);

                setHours(remainingHours);
                setMinutes(remainingMinutes % 60);
                setSeconds(remainingSeconds % 60);

                clearInterval(intervalId);
                // Countdown finished, perform necessary actions here
                return;
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    setHours(hours - 1);
                    setMinutes(59);
                    setSeconds(59);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds, minutes, hours]);
    return (
        <div className="border w-full flex-auto flex flex-col justify-between gap-5 p-5">
            <div className="text-[20px] flex gap-8 font-normal">
                <div className="text-main ">
                    <StarFillIcon size={25} />
                </div>
                <div>DAILY DEALS</div>
            </div>
            <Link to={`/collections/${product?.category?._id}/products/${product?._id}`}>
                <img
                    src={product?.thumbnail?.path ? product?.thumbnail?.path : product?.thumbnail}
                    alt=""
                    className="w-full object-cover"
                />
            </Link>
            <div className="flex flex-col items-center justify-center gap-5 text-[18px] text-center">

                <Link className="hover:text-main cursor-pointer "
                    to={`/collections/${product?.category?._id}/products/${product?._id}`} >
                    {product?.title}
                </Link>

                <div className="flex">
                    {getStars(product?.totalRating, 20).map((item, index) => (
                        <div key={index} className="text-yellow-500">
                            {item}
                        </div>
                    ))}
                </div>
                <p
                    className="hover:text-main cursor-pointer "
                    title={`$${(product?.price * 0.000043).toFixed(2)}USD`}
                >
                    {product?.price?.toLocaleString("vi-VN") + " VND"}
                </p>
            </div>
            <div>
                <div className="flex gap-1 mb-5">
                    <CountDown time={hours || 0} unit="Hours" />
                    <CountDown time={minutes || 0} unit="Minutes" />
                    <CountDown time={seconds || 0} unit="Seconds" />
                </div>
                <div className="flex items-center justify-center gap-3 text-white w-full py-[11px] px-[15px] duration-300 bg-main cursor-pointer hover:bg-[#333]">
                    <ThreelineIcon />
                    <span>OPTIONS</span>
                </div>
            </div>
        </div>
    );
};

export default DealDaily;
