import { apiCancelOrder, apiSendOTP, apiUpdateStatus } from 'apis/order';
import { setLoading } from 'app/appSlice';
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { CheckIcon, CloseIcon, EditIcon } from 'ultils/icons';
import paytag from "../../assets/order/pay_tag.png"
const OrderItem = ({ item, admin }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [isShowEdit, setIsShowEdit] = useState(false);
    const allStatus = ['Processing', 'Shipping', 'Success', 'Cancelled']
    const [status, setStatus] = useState();
    const dispatch = useDispatch()
    useEffect(() => {
        setStatus(item?.status)
    }, [item])
    const handleCancelOrder = async (oid) => {
        const completeCancelOrder = async (code, email) => {
            const data = { email, code }
            const res = await apiCancelOrder(oid, data);
            if (res.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `Your order has been cancelled successfully.`,
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

        const { value: emailValue } = await Swal.fire({
            title: 'Email',
            inputLabel: 'We need your Email to complete this cancel',
            input: 'text',
            inputPlaceholder: 'Type your Email here...',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter something';
                }
            },
        });
        if (emailValue) {
            if (emailValue === item?.tempUser?.email || emailValue === item?.orderedBy?.email) {
                dispatch(setLoading(true));
                await apiSendOTP(emailValue);
                dispatch(setLoading(false));
                const { value: otpValue } = await Swal.fire({
                    title: 'OTP',
                    inputLabel: 'We are sending OTP to your email',
                    input: 'text',
                    inputPlaceholder: 'Type your OTP here...',
                    showCancelButton: true,
                    confirmButtonText: 'Submit',
                    cancelButtonText: 'Cancel',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Please enter something';
                        }
                    },
                });
                if (otpValue) {
                    completeCancelOrder(otpValue, emailValue)
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid Email',
                })
            }
        }
    }
    const handleUpdateStatus = async () => {
        await apiUpdateStatus(item?._id, { status });
        setIsShowEdit(false)
    }
    return (
        <div>
            {item &&
                <div className='p-3 relative bg-gray-100 rounded-md shadow-lg' key={item?._id}>
                    {item.paymentMethod === "PayPal" &&
                        <img src={paytag} alt="" className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100px] h-[100px]' />}
                    <div className='flex justify-between items-center  pb-3 border-b-[1px] border-b-[black]'>
                        <span className='text-gray-500 font-medium text-[14px]'>Order ID : #{item?._id}</span>
                        <div className="flex items-center gap-3 justify-end ">

                            {isShowEdit ?
                                <div className="flex items-center gap-3">
                                    <CheckIcon onClick={() => handleUpdateStatus()} className='text-green-500 cursor-pointer' />
                                    <CloseIcon className='text-red-500 cursor-pointer' onClick={() => setIsShowEdit(false)} />
                                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                        {allStatus?.map((status, index) => (
                                            <option key={index} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                :
                                <div className="flex items-center gap-3">
                                    {admin &&
                                        <EditIcon className='cursor-pointer' onClick={() => setIsShowEdit(true)} />
                                    }

                                    <span className='text-main'>{status}</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 border-b-[1px]  py-5 '>
                        {item?.products?.map(product =>
                            <div className='flex items-center gap-5 w-full' key={product.product._id}>
                                <div className='relative'>
                                    <img src={product.product.thumbnail.path ? product.product.thumbnail.path : product.product.thumbnail} className='w-[70px] h-[70px]' alt="" />
                                    <span className='w-[20px] h-[20px] rounded-full flex items-center justify-center text-[12px] italic bg-gray-600 text-white absolute top-[-5px] right-[-5px]'>
                                        {product.quantity}
                                    </span>
                                </div>
                                <div className='flex flex-col gap-2 flex-1'>
                                    <span>{product.product.title}</span>
                                    <span className='text-span text-[12px] italic'>
                                        {product?.variants && Object.keys(product?.variants).map((key, index) =>
                                            <span key={index}>{product?.variants[key]} {index < Object.keys(product?.variants).length - 1 && '/'}
                                            </span>)}
                                    </span>
                                </div>
                                <span className="text-main italic font-medium">{(+product?.product.price * +product?.quantity)?.toLocaleString("vi-VN")} VND</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-3 items-center pt-3">
                        <span className="text-span">Order Total :</span>
                        <span className="text-[20px] font-semibold text-main">{item?.total?.toLocaleString("vi-VN")} VND</span>
                    </div>
                    {(item.status === "Processing" || item.status === "Shipping") &&
                        <div className="flex items-center justify-between mt-3">
                            <div className="flex flex-col gap-2 text-span italic text-[14px]">
                                <span className='text-main'>
                                    {item.paymentMethod === 'PayPal' ? "Paid by Paypal" : "Cash on Delivery"}
                                </span>
                                <span className=''>
                                    Ordered at {moment(item?.updatedAt).format(
                                        "DD/MM/YYYY"
                                    )}
                                </span>
                            </div>
                            <div
                                onClick={() => handleCancelOrder(item._id)}
                                className="p-3 bg-main text-white border rounded-md cursor-pointer hover:bg-black duration-200 ">
                                Cancel Order
                            </div>
                        </div>
                    }
                </div>}
        </div>
    )
}

export default OrderItem
