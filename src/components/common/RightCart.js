import { apiUpdateCart } from "apis/user";
import { offModel } from "app/ProductModel";
import { updateCurrentUser } from "app/user/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CloseIcon, DeleteIcon } from "ultils/icons";
import path from "ultils/paths";

const RightCart = () => {
    const [totalBill, setTotalBill] = useState();
    const { width } = useSelector((state) => state.app);
    const { currentUser } = useSelector((state) => state.user);
    const [cart, setCart] = useState(currentUser?.cart);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        setCart(currentUser?.cart);
    }, [currentUser?.cart, currentUser]);
    useEffect(() => {
        updateTotalBill();
    }, [cart]);
    const handleUpdateCart = async (newCart) => {
        const response = await apiUpdateCart({ cart: newCart });
        Swal.fire(
            response.success ? "Success" : "Failed",
            response.message,
            response.success ? "success" : "error"
        ).then(() => {
            if (response.success) {
                setCart(response.updateCart.cart);
                dispatch(updateCurrentUser(response.updateCart));
            }
        });
    };
    const handleDeleteItem = (id) => {
        Swal.fire({
            title: "Remove this item?",
            text: "",
            confirmButtonText: "Yes",
            showCancelButton: true,
            cancelButtonText: "No",
        }).then((rs) => {
            if (rs.isConfirmed) {
                const newCart = cart.filter((item) => item._id !== id);
                handleUpdateCart(newCart);
            }
        });
    };
    const updateTotalBill = () => {
        let total = 0;
        cart?.forEach((item) => {
            if (item.product !== null) {
                const quantity = item.quantity;
                const price = item.product.price;
                total += quantity * price
            }
        });
        setTotalBill(total);
    };
    const handleCheckout = () => {
        const checkoutProducts = cart.map(item => ({
            pid: item.product._id,
            title: item.product.title,
            quantity: +item.quantity,
            variants: item.variants,
            thumbnail: item.product.thumbnail,
            price: item.product.price
        }))
        navigate("/checkout", {
            state: {
                products: checkoutProducts
            }
        })
    }
    return (
        <div className={`fixed flex flex-col h-screen right-0 z-40 bg-[#1c1d1d] animate-slideLeftToRight p-5 text-white ${width === 1 ? "w-[350px] max-w-full" : " w-[400px]"}`}>
            {cart ? (
                <>
                    <div className="flex items-center justify-between pb-5 border-b-[0.5px] flex-none">
                        <span className="text-[20px] font-semibold">
                            Your Cart
                        </span>
                        <div
                            className="cursor-pointer "
                            onClick={() => dispatch(offModel())}
                        >
                            <CloseIcon size={16} />
                        </div>
                    </div>
                    <div className=" my-5 pb-5 flex flex-col gap-8 flex-auto overflow-auto ">
                        {cart && cart.map((item, index) =>
                            item?.product !== null ?
                                <div
                                    key={index}
                                    className="flex pb-5 gap-3 border-b-[1px] items-center "
                                >
                                    <Link className="w-[70px] h-[70px] flex-none"
                                        to={`collections/${item?.product?.category}/products/${item?.product?._id}`}
                                    >
                                        <img
                                            src={
                                                item?.product?.thumbnail?.path ? item?.product?.thumbnail?.path :
                                                    item.product?.thumbnail
                                            }
                                            alt=""
                                            className="w-[70px] h-[70px] object-cover flex-none"
                                        />
                                    </Link>
                                    <div className="flex flex-col gap-1 text-[14px] justify-between flex-1 truncate">
                                        <Link
                                            to={`collections/${item?.product?.category}/products/${item?.product?._id}`}
                                            className="font-semibold "
                                        >
                                            {item?.product?.title}
                                        </Link>
                                        <div>
                                            {item?.variants &&
                                                Object.keys(item?.variants).map(
                                                    (item2, index) => (
                                                        <span key={index}>
                                                            {item?.variants[item2]}{" "}
                                                            {`${index <
                                                                Object.keys(
                                                                    item.variants
                                                                ).length -
                                                                1
                                                                ? " / "
                                                                : ""
                                                                }`}
                                                        </span>
                                                    )
                                                )}
                                        </div>
                                        <span className="font-semibold">
                                            {item?.product?.price?.toLocaleString(
                                                "vi-VN"
                                            ) + " VND"}
                                        </span>
                                    </div>

                                    <div className="flex gap-3 items-center justify-between">
                                        <span className=" mr-3">
                                            x{item?.quantity}
                                        </span>
                                        <DeleteIcon
                                            size={25}
                                            className="hover:text-main cursor-pointer"
                                            onClick={() =>
                                                handleDeleteItem(item?._id)
                                            }
                                        />
                                    </div>
                                </div>
                                :
                                <div
                                    key={index}
                                    className="flex pb-5 gap-3 border-b-[1px] items-center justify-between "
                                >
                                    <span>This product is unavailable</span>
                                    <DeleteIcon
                                        size={25}
                                        className="hover:text-main cursor-pointer"
                                        onClick={() =>
                                            handleDeleteItem(item?._id)
                                        }
                                    />
                                </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 flex-none">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">SUBTOTAL</span>
                            <span>
                                {totalBill?.toLocaleString("vi-VN")} VND
                            </span>
                        </div>
                        <span className="text-center flex justify-center text-[14px] italic opacity-70 ">
                            Shipping, taxes, and discounts calculated at
                            checkout.
                        </span>
                        <Link to={path.CART}>
                            <button className="text-white flex items-center bg-main w-full py-1 justify-center">
                                SHOPPING CART
                            </button>
                        </Link>
                        <button className="text-white flex items-center bg-main w-full py-1 justify-center"
                            onClick={handleCheckout}>
                            <span> CHECKOUT</span>
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex justify-between items-center">
                    <span>You are not login.</span>
                    <Link
                        className="px-3 py-1 border-[1px] hover:bg-main duration-300"
                        to={path.LOGIN}
                    >
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
};

export default RightCart;
