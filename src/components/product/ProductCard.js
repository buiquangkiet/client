import React from "react";
import { getStars } from "ultils/helpers";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
    const product = props.product;
    return (
        <Link
            to={`/collections/${product?.category?._id}/products/${product?._id}`}
            className="p-[15px] flex gap-3 items-center border"
        >
            <img src={product?.thumbnail} alt="" className="w-[85px] h-[85px]" />
            <div className="flex flex-col  justify-center gap-2 text-[14px] truncate">
                <span className="hover:text-main cursor-pointer">
                    {product?.title}
                </span>
                <div className="flex">
                    {getStars(product?.totalRating).map((item, index) => (
                        <div key={index} className="text-yellow-500">
                            {item}
                        </div>
                    ))}
                </div>
                <p
                    className="hover:text-main cursor-pointer"
                    title={`$${(product?.price * 0.000043).toFixed(2)}USD`}
                >
                    {product?.price.toLocaleString("vi-VN") + " VND"}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;
