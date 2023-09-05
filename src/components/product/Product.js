import React from "react";
import { EyeIcon, HeartIcon, ThreelineIcon } from "ultils/icons";
import { getStars } from "ultils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModel } from "app/ProductModel";
import path from "ultils/paths";
import ProductModel from "./ProductModel";

const Product = (props) => {
    const product = props.product;
    const icon = [
        <HeartIcon size={20} />,
        <ThreelineIcon size={20} />,
        <EyeIcon size={20} />,
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-[10px] px-4 py-5 border group cursor-pointer">
            <div className="relative">
                <Link
                    to={`/collections/${product?.category?._id}/products/${product?._id}`}
                >
                    <img
                        src={product?.thumbnail?.path ? product?.thumbnail?.path : product?.thumbnail}
                        alt=""
                        className="w-full h-[243px] object-cover"
                    />
                </Link>
                <div className="flex gap-4 justify-center opacity-0 items-center absolute bottom-0 left-0 right-0 group-hover:animate-showMenu group-hover:opacity-100">
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
            <Link
                to={`/collections/${product?.category}/products/${product?._id}`}
                className="hover:text-main cursor-pointer truncate"
            >
                {product?.title}
            </Link>
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
                {product?.price?.toLocaleString("vi-VN") + " VND"}
            </p>
        </div>
    );
};

export default Product;
