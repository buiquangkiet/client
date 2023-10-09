import React, { memo, useState } from "react";
import LeftReview from "./LeftReview";
import RightReview from "./RightReview";
import { useDispatch, useSelector } from "react-redux";
import { setModel } from "app/ProductModel";
import RatingModel from "./RatingModel";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getStars } from "ultils/helpers";
import Comment from "./Comment";
import { UserIcon } from "ultils/icons";

const Reviews = ({ product }) => {
    const currentUser = JSON.parse(window.localStorage.getItem("persist:user"));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { width } = useSelector(state => state.app);
    const handleVote = () => {
        if (currentUser.isLoggedIn === "false") {
            Swal.fire({
                title: "Opps",
                text: "You need to login to vote !",
                confirmButtonText: "Login",
                showCancelButton: true,
                cancelButtonText: "Cancel",
            }).then((rs) => {
                if (rs.isConfirmed) navigate("/login");
            });
        } else {
            dispatch(
                setModel({
                    product: <RatingModel product={product} />,
                })
            );
        }
    };
    // console.log(currentUser);
    return (
        <div className="flex flex-col gap-5 p-3">
            <span className="text-[20px] font-semibold">REVIEWS</span>
            <div className={`flex items-center justify-between h-full border-b-[1px] ${width < 3 && "flex-col"}`}>
                <div className={`  ${width < 3 ? "w-full" : "w-[30%] border-r-[1px]"}`}>
                    <LeftReview
                        total={product?.totalRating}
                        quantityRate={product?.rating?.length}
                    />
                </div>
                <div className={` h-full ${width < 3 ? "w-full" : "w-[70%]"}`}>
                    <RightReview rating={product?.rating} />
                </div>
            </div>
            <div className="mx-auto flex flex-col gap-3 items-center justify-center">
                <span>Do you want to review this product ?</span>
                <button
                    onClick={handleVote}
                    className="px-3 py-2 rounded-md w-fit bg-main text-white outline-none hover:bg-black duration-300"
                >
                    Vote now !
                </button>
            </div>
            <div className="flex flex-col gap-3">
                {product?.rating?.length > 0 &&
                    <span className="text-[20px] font-semibold">
                        CUSTOMER REVIEWS
                    </span>}
                <div className="flex flex-col gap-2">
                    {product?.rating?.map((item, index) => (
                        <div key={index} className="flex gap-1">
                            <div className="w-8 h-8 flex-none flex items-center justify-center text-white font-semibold bg-gray-400 rounded-full">
                                {item?.postedBy?.avatar?.path ?
                                    <img src={item?.postedBy?.avatar?.path} alt="" className="w-full h-full object-cover rounded-full" /> :
                                    <UserIcon size={25} />}
                            </div>
                            <div className="flex flex-col gap-2 p-3 rounded-md bg-gray-100  overflow-hidden">
                                <div className="flex items-center text-yellow-500">
                                    {item &&
                                        getStars(item?.star).map(
                                            (item) => item
                                        )}
                                </div>
                                <div className="flex  flex-col gap-1">
                                    <span className="text-[14px] font-semibold">
                                        {item?.postedBy?.lastname}{" "}
                                        {item?.postedBy?.firstname}
                                    </span>
                                    <span className="font-[13px] text-gray-500">
                                        {new Date(
                                            item?.postedAt
                                        ).toDateString()}
                                    </span>
                                </div>
                                <Comment item={item} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(Reviews);
