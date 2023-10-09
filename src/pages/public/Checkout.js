import { apiCreateOrder, apiSendOTP } from 'apis/order';
import { setLoading } from 'app/appSlice';
import CartProductItem from 'components/Cart/CartProductItem';
import Input from 'components/admin/Input';
import Paypal from 'components/common/Paypal';
import React, { memo, useEffect, useState } from 'react'
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
const Checkout = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user);
    const { width } = useSelector(state => state.app);
    const [products, setProducts] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const [isFilling, setIsFilling] = useState(false)
    useEffect(() => {
        if (location.state !== null)
            setProducts(location.state.products);
        else navigate("/")
    }, [])
    const [user, setUser] = useState({
        firstname: currentUser?.firstname || '',
        lastname: currentUser?.lastname || '',
        email: currentUser?.email || '',
        mobile: currentUser?.mobile || '',
        address: currentUser?.address || '',
    })
    useEffect(() => {
        if (currentUser) setUser({
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            email: currentUser.email,
            mobile: currentUser.mobile,
            address: currentUser.address,
        });
    }, [currentUser])

    useEffect(() => {
        const notFill = Object.keys(user).some(key => user[key] === '');
        setIsFilling(!notFill);
    }, [user])

    const handleAttribute = useCallback((field, value) => {
        setUser(user => ({ ...user, [field]: value }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    const handleCheckOut = async (paymentMethod = "COD", fill) => {
        const complete = async (code) => {
            const productsData = products.map(item => ({
                product: item.pid,
                variants: item.variants,
                quantity: item.quantity
            }))

            const data = {
                products: productsData,
                total: products.reduce((a, b) => a + (+b.price * +b.quantity), 0),
                orderedBy: currentUser && currentUser._id,
                tempUser: !currentUser && user,
                code,
                paymentMethod
            }
            const res = await apiCreateOrder(data);
            if (res.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `Your order has been created successfully. Your order id is ${res.order._id}`,
                }).then(() => {
                    window.location.reload();
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.message,
                })
            }
        }
        if (fill) {
            if (currentUser) complete();
            else {
                dispatch(setLoading(true));
                await apiSendOTP(user.email);
                dispatch(setLoading(false));
                const { value: inputValue } = await Swal.fire({
                    title: 'OTP',
                    inputLabel: 'We are sending OTP to your email',
                    input: 'text', // Specify the input type (text, email, password, etc.)
                    inputPlaceholder: 'Type your OTP here...',
                    showCancelButton: true,
                    confirmButtonText: 'Submit',
                    cancelButtonText: 'Cancel',
                    inputValidator: (value) => {
                        // You can add custom input validation logic here
                        if (!value) {
                            return 'Please enter something';
                        }
                    },
                });
                complete(inputValue);
            }
        }
        else
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all fields',
            })
    }
    return (
        <div className="w-full h-full flex flex-col gap-3">
            <span className='mt-5 font-semibold text-[24px]'>Check Out</span>
            <div className={` w-full  shadow-2xl p-5 mb-5 border ${width === 3 ? "grid grid-cols-5" : "flex flex-col"}`}>
                <div className='col-span-3 flex flex-col gap-3 pr-5 border-r-[1px] pb-8 '>
                    <span className='font-medium   text-[20px]'>Order Information</span>
                    <div className="flex flex-col gap-3 ">
                        <Input
                            label="First Name"
                            handleAttribute={handleAttribute}
                            field="firstname"
                            value={user?.firstname}
                            required={true}
                        />
                        <Input
                            label="Last Name"
                            handleAttribute={handleAttribute}
                            field="lastname"
                            required={true}
                            value={user?.lastname}
                        />
                    </div>
                    <div className={`flex items-center gap-5 ${width === 1 ? "flex-col" : ""}`}>
                        <Input
                            label="Email"
                            handleAttribute={handleAttribute}
                            field="email"
                            required={true}
                            value={user?.email}
                        />
                        <Input
                            label="Mobile Phone"
                            handleAttribute={handleAttribute}
                            field="mobile"
                            required={true}
                            value={user?.mobile}
                        />
                    </div>
                    <Input
                        label="Address"
                        handleAttribute={handleAttribute}
                        field="address"
                        required={true}
                        value={user?.address}
                    />
                </div>
                {products &&
                    <div className='col-span-2 pl-5 flex flex-col gap-4'>
                        <div className='max-h-[400px] my-5 overflow-y-auto' >
                            {products?.map((item, index) =>
                                <div key={index} className="flex flex-col my-3 border-b-[1px] gap-3 ">
                                    <div className='grid grid-cols-5 gap-5 p-2 flex items-center '>
                                        <div className='relative'>
                                            <img src={item?.thumbnail?.path ? item.thumbnail.path : item.thumbnail} alt="" className='w-[70px] h-[70px] object-cover' />
                                            <span className='w-[20px] h-[20px] text-[12px] bg-gray-600 text-white rounded-full absolute top-[-5px] right-[-5px] flex items-center justify-center'>{item?.quantity}</span>
                                        </div>
                                        <div className='flex flex-col col-span-2'>
                                            <span className='truncate'>{item.title}</span>
                                            <div className='text-span text-[12px] italic flex flex-wrap'>
                                                {item.variants && Object.keys(item.variants).length > 0 && Object.keys(item.variants).map(
                                                    (item2, index) => (
                                                        <span>{item.variants[item2]}/</span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <span className='text-span font-semibold text-[16px] col-span-2'>
                                            {(+item?.price * +item?.quantity).toLocaleString("vi-VN") + " VND"}
                                        </span>
                                    </div>

                                </div>
                            )}
                        </div>
                        <div className='flex items-center justify-between text-[18px] font-bold w-full'>
                            <span>Total : </span>
                            <span>{products.reduce((a, b) => a + (+b.price * +b.quantity), 0).toLocaleString("vi-VN")} VND</span>
                        </div>
                        <div className='h-fit'>
                            <Paypal handleCheckOut={handleCheckOut} isFilling={isFilling} products={products} amount={Math.round(products.reduce((a, b) => a + (+b.price * +b.quantity), 0) / 24000)} />
                        </div>
                        <div className='text-span italic'>
                            *Cash On Delivery
                        </div>
                        <div
                            className="p-3 rounded-md bg-main text-white text-center font-semibold cursor-pointer hover:bg-red-400 duration-300"
                            onClick={() => handleCheckOut('COD', isFilling)}
                        >
                            Check out
                        </div>
                    </div>}

            </div>

        </div>
    )
}

export default memo(Checkout)
