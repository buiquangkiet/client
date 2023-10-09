import { apiCancelOrder, apiGetOrder } from 'apis/order';
import OrderItem from 'components/order/OrderItem';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Purchases = () => {
  const { currentUser } = useSelector(state => state.user);
  const [orders, setOrders] = useState([]);
  const [shipState, setShipState] = useState([
    { title: "Processing", count: 0 },
    { title: "Shipping", count: 0 },
    { title: "Success", count: 0 },
    { title: "Cancelled", count: 0 },
  ]);

  const [status, setStatus] = useState(shipState[0].title);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser?.orders) { // Check if currentUser?.orders is defined
        const orderPromises = currentUser?.orders.map(async (_id) => {
          const res = await apiGetOrder(_id);
          if (res.success) {
            return res.response;
          }
          return null; // Return null for unsuccessful requests
        });

        // Wait for all promises to resolve and filter out null responses
        const fetchedOrders = (await Promise.all(orderPromises)).filter(order => order !== null);

        setOrders(fetchedOrders);
      }
    };

    fetchOrders();
  }, [currentUser]);
  useEffect(() => {
    const updatedShipState = [...shipState];
    updatedShipState.forEach(item => (item.count = 0));
    orders.forEach(order => {
      const index = updatedShipState.findIndex(item => item.title === order.status);
      if (index !== -1) {
        updatedShipState[index].count++;
      }
    });
    setShipState(updatedShipState);
  }, [orders]);
  return (
    <div className=' flex flex-col gap-3 w-full mb-8'>
      <div className="font-semibold text-[20px] my-5 mb-8">
        My Purchases
      </div>
      <div className="flex items-center border-b-[1px] border-b-red-600 mb-8">
        {shipState.map(item =>
          <div
            className={`${item.title === status ? 'bg-main text-white' : 'hover:bg-red-200'} relative p-2 cursor-pointer duration-200`}
            onClick={() => setStatus(item.title)}
            key={item.title}
          >
            <span>{item.title}</span>
            <span className="absolute top-[-10px] right-[-5px] w-[20px] h-[20px] text-[12px] rounded-full bg-white text-black border  shadow-md flex items-center justify-center z-10">
              {item.count}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5">
        {orders.filter(item => item.status === status).map(item =>
          <OrderItem item={item} key={item._id} />
        )}
      </div>
    </div>
  );
};

export default memo(Purchases);
