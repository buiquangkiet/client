import { apiUpdateCart } from "apis/user";
import { setLoading } from "app/appSlice";
import { updateCurrentUser } from "app/user/userSlice";
import CartProductItem from "components/Cart/CartProductItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteIcon } from "ultils/icons";

const Cart = () => {
    const dispatch = useDispatch();
    const [cart, setCart] = useState();
    const [totalBill, setTotalBill] = useState();
    const { currentUser } = useSelector((state) => state.user);
    const { isLoggedIn } = JSON.parse(
        window.localStorage.getItem("persist:user")
    );
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (
    //         isLoggedIn === "false" ||
    //         !isLoggedIn ||
    //         !currentUser ||
    //         currentUser === "null"
    //     ) {
    //         navigate("/login");
    //     }
    // }, [isLoggedIn]);
    const { width } = useSelector((state) => state.app);
    useEffect(() => {
        setCart(currentUser?.cart);
    }, [currentUser?.cart, currentUser]);

    useEffect(() => {
        updateTotalBill();
    }, [cart]);
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
    const updateCart = (id, quantity) => {
        const newCart = [...cart];
        for (let i = 0; i < newCart.length; i++) {
            if (newCart[i]._id === id) {
                newCart[i] = {
                    ...newCart[i],
                    quantity: quantity,
                };
                break;
            }
        }
        setCart(newCart);
    };
    const handleUpdateCart = async (newCart) => {
        dispatch(setLoading(true));
        const response = await apiUpdateCart({ cart: newCart });
        dispatch(setLoading(false));
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
    const handleUpdateCartClick = async () => {
        if (isLoggedIn) {
            const newCart = cart.filter(
                (item) => item.quantity !== 0 && item.quantity !== ""
            );
            handleUpdateCart(newCart);
        }
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
    return (
        <div className="w-main mt-5  mb-[100px] flex flex-col  gap-5">
            {currentUser ? (
                <div>
                    <span className="text-[20px] font-semibold">Your Cart</span>
                    <div className="flex flex-col border-[1px] p-5 ">
                        {width === 3 && <div className="grid grid-cols-5 border-b-[1px] pb-5 gap-5">
                            <div className="col-span-3"></div>
                            <div className="col-span-1 font-semibold text-center">
                                QUANTITY
                            </div>
                            <div className="col-span-1 font-semibold text-end">
                                TOTAL
                            </div>
                            <div className="col-span-1"></div>
                        </div>}
                        {cart &&
                            cart.map((item, index) =>
                                item?.product !== null ?
                                    <CartProductItem
                                        key={index}
                                        item={item}
                                        id={item._id}
                                        updateCart={updateCart}
                                        deleteItem={handleDeleteItem}
                                    /> :
                                    <div
                                        key={index}
                                        className="flex py-5  gap-3 border-b-[1px] items-center justify-between "
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
                        <div className="flex justify-end py-5">
                            <div className=" flex flex-col items-end gap-3">
                                <div className="flex  gap-8">
                                    <span>SubTotal</span>
                                    <span className="text-[18px] font-semibold">
                                        {totalBill?.toLocaleString("vi-VN")} VND
                                    </span>
                                </div>
                                <span className="text-[14px] italic opacity-70">
                                    Shipping, taxes, and discounts calculated at
                                    checkout
                                </span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleUpdateCartClick}
                                        className="px-3 py-2 bg-black text-white hover:bg-main duration-300 rounded-md"
                                    >
                                        Update Cart
                                    </button>
                                    <button className="px-3 py-2 bg-main text-white hover:bg-black duration-300">
                                        Check Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Not login</div>
            )}
        </div>
    );
};

export default Cart;
