import React, { memo } from "react";
import { EyeIcon, HeartIcon, ThreelineIcon } from "ultils/icons";
import { getStars } from "ultils/helpers";
import { Link, useNavigate } from "react-router-dom";
import path from "ultils/paths";
//collections -> products
import * as DOMPurify from 'dompurify';
import { setModel } from "app/ProductModel";
import ProductModel from "./ProductModel";
import { useDispatch } from "react-redux";

const ProductType2 = ({ product, fatherPath }) => {
    const icon = [
        <HeartIcon size={20} />,
        <ThreelineIcon size={20} />,
        <EyeIcon size={20} />,
    ];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-5 px-4 py-5 border group cursor-pointer relative ">
            <div className="opacity-0 group-hover:opacity-100 duration-200 w-full h-full px-5 py-[10px] bg-white absolute top-0 left-0">
                <div className="flex flex-col items-center justify-between pb-[10px] border-b-[1px]">
                    <Link
                        to={
                            fatherPath ||
                            path.getDetailProduct(product._id)
                        }
                        className="text-[18px] font-semibold text-center"
                    >
                        {product.title}
                    </Link>
                    <p
                        className="hover:text-main cursor-pointer"
                        title={`$${(product.price * 0.000043).toFixed(2)}USD`}
                    >
                        {product.price.toLocaleString("vi-VN") + " VND"}
                    </p>
                </div>
                <div className="flex flex-col mt-[10px] text-[14px] ">
                    {(product?.description && product?.description?.length > 1) ? product?.description.slice(0, 7).map((item, index) => (
                        <div key={index}>{item}</div>
                    )) : <div className="text-[15px] text-justify line-clamp-[10] "
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}>
                    </div>}
                </div>
                <div className="flex gap-4 justify-center opacity-0 items-center absolute bottom-0 left-5 group-hover:bottom-6 duration-300 group-hover:opacity-100">
                    {icon.map((item, index) => (
                        <div
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
                            className="p-2 rounded-full border  bg-white cursor-pointer hover:bg-black hover:text-white "
                            key={index}
                        >
                            {item}
                        </div>
                    ))}
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
            <div className="flex">
                {getStars(product?.totalRating).map((item, index) => (
                    <div key={index} className="text-yellow-500">
                        {item}
                    </div>
                ))}
            </div>
            <p
                className="hover:text-main cursor-pointer"
                title={`$${(product.price * 0.000043).toFixed(2)}USD`}
            >
                {product.price.toLocaleString("vi-VN") + " VND"}
            </p>
        </div>
    );
};

export default memo(ProductType2);
