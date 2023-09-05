import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteIcon } from "ultils/icons";

const CartProductItem = ({ item, id, updateCart, deleteItem }) => {
    const { width } = useSelector(state => state.app)
    const [quantity, setQuantity] = useState(+item?.quantity);
    useEffect(() => {
        setQuantity(+item?.quantity);
    }, [item])
    const [total, setTotal] = useState(+item?.quantity * +item?.product.price);
    useEffect(() => {
        setTotal(+quantity * +item?.product.price);
        updateCart(id, quantity);
    }, [quantity]);
    return (
        <div>
            <div className={` py-5 border-b-[1px] gap-5 ${width === 3 ? "grid grid-cols-5" : "flex flex-col items-center"}`}>
                <div className="grid grid-cols-3 col-span-3 gap-5">
                    <div className="col-span-1">
                        <Link
                            to={`/collections/${item?.product.category}/products/${item.product._id}`}
                        >
                            <img
                                src={item?.product?.thumbnail?.path ? item.product.thumbnail.path : item.product.thumbnail}
                                alt=""
                                className="w-full h-full"
                            />
                        </Link>
                    </div>
                    <div className="flex justify-between col-span-2 items-center gap-5">
                        <div className=" flex flex-col gap-3 items-start justify-center">
                            <Link className="hover:text-main"
                                to={`/collections/${item?.product.category}/products/${item.product._id}`}
                            >
                                {item?.product?.title}
                            </Link>
                            <div className="flex gap-3 text-[14px] italic opacity-70 flex-wrap">
                                {item?.variants &&
                                    Object.keys(item?.variants).length > 0 &&
                                    Object.keys(item?.variants).map(
                                        (item2, index) => (
                                            <span key={index}>
                                                {item?.variants[item2]}{" "}
                                                {index <
                                                    Object.keys(item.variants)
                                                        .length -
                                                    1
                                                    ? " / "
                                                    : ""}
                                            </span>
                                        )
                                    )}
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-2 hover:text-main cursor-pointer"
                            onClick={() => deleteItem(id)}
                        >
                            <DeleteIcon /> <span>Delete</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 flex  items-center justify-center">
                    <div className=" border bg-gray-200 ">
                        <button
                            onClick={() =>
                                quantity > 1 && setQuantity(quantity - 1)
                            }
                            className="px-2 py-1 text-center cursor-pointer hover:bg-gray-700 hover:text-white duration-300"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            className="w-[50px] outline-none border-x border-black h-full px-1 bg-gray-200"
                            value={+quantity}
                            min="1"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <button
                            className="px-2 py-1 text-center cursor-pointer hover:bg-gray-700 hover:text-white duration-300"
                            onClick={() => setQuantity(+quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="col-span-1 font-semibold text-end flex items-center justify-end">
                    {total.toLocaleString("vi-VN") + " VND"}
                </div>
            </div>
        </div>
    );
};

export default memo(CartProductItem);
