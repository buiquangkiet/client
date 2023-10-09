import React, { useState } from "react";
import logo from "assets/logo.png";
import { CloseIcon, StarFillIcon, StarOutlineIcon } from "ultils/icons";
import { apiRatingProduct } from "apis/product";
import { useDispatch, useSelector } from "react-redux";
import { setDetail } from "app/productSlice";
import Swal from "sweetalert2";
import { offModel } from "app/ProductModel";
const RatingModel = ({ product }) => {
    const [comment, setComment] = useState("");
    const [starVote, setStarVote] = useState(0);
    const dispatch = useDispatch();
    const { width } = useSelector(state => state.app)
    const star = [
        {
            star: 1,
            title: "Terrible",
        },
        {
            star: 2,
            title: "Bad",
        },
        {
            star: 3,
            title: "Neutral",
        },
        {
            star: 4,
            title: "Good",
        },
        {
            star: 5,
            title: "Perfect",
        },
    ];
    const handleSubmit = async () => {
        if (starVote === 0) {
            Swal.fire({
                title: "Error",
                text: "Please select a star",
                confirmButtonText: "Ok",
            });
        }
        else {
            const response = await apiRatingProduct({
                comment: comment,
                star: starVote,
                pid: product?._id,
            });
            Swal.fire({
                title: "Success",
                text: "Thanks for your review !",
                confirmButtonText: "Ok",
            }).then(() => {
                dispatch(offModel());
                if (response.success) dispatch(setDetail(response.product));
            });
        }
    };
    return (
        <div className={`fixed  z-40 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  bg-white p-5 pt-8 
        ${width < 3 ? "w-[95%] h-[80%]" : " w-[60%] h-[70%]"}`}>
            <div
                className="absolute right-5 top-5 cursor-pointer "
                onClick={() => dispatch(offModel())}
            >
                <CloseIcon size={20} />
            </div>
            <div className="flex flex-col items-center justify-between gap-3">
                <img src={logo} alt="" className="" />
                <span className="text-[25px] font-semibold  text-center">
                    {product.title}
                </span>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="outline-none rounded-md w-full border px-5 py-4  text-[16px]"
                    placeholder="Write a review"
                />
                <span>How do you like this product ?</span>
                <div className={`grid grid-cols-5 ${width < 2 ? "gap-1" : " gap-5"}`}>
                    {star.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setStarVote(item.star)}
                            className={`flex flex-col items-center justify-center cursor-pointer bg-slate-300  rounded-sm   p-5 
                            ${width === 1 ? "h-[90px] gap-2" : "h-[120px] gap-5"}`}
                        >
                            {item.star <= starVote ? (
                                <StarFillIcon
                                    className="text-yellow-500"
                                    size={20}
                                />
                            ) : (
                                <StarOutlineIcon size={20} />
                            )}
                            <span className="text-[15px]">{item.title}</span>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-main text-white rounded-md hover:bg-black duration-300"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default RatingModel;
