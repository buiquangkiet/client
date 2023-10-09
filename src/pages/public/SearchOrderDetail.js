import React from 'react'
import orderbanner from '../../assets/order/search-print.jpg'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { apiGetOrder } from 'apis/order';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setLoading } from 'app/appSlice';
import OrderItem from 'components/order/OrderItem';
const SearchOrderDetail = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const orderIdParams = urlParams.get('oid');
    const [order, setOrder] = useState();
    const dispatch = useDispatch();
    // const { currentUser } =
    useEffect(() => {
        const fetchOrder = async () => {
            dispatch(setLoading(true))
            const res = await apiGetOrder(orderIdParams);
            dispatch(setLoading(false))

            if (res.success) setOrder(res.response)
            else {
                setOrder(undefined)
                Swal.fire("Error", "Order not found", "error")
            }
        }
        if (orderIdParams)
            fetchOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderIdParams])
    return (
        <div>
            {order ?
                <>
                    <OrderItem item={order} />
                </>
                :
                <div className="w-full flex items-center justify-center">
                    <div className='flex flex-col items-center'>
                        <img src={orderbanner} alt="" />

                    </div>
                </div>
            }
        </div>
    )
}

export default SearchOrderDetail
