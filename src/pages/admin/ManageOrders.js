import { apiGetOrders } from 'apis/order'
import Pagination from 'components/Pagination/Pagination';
import OrderItem from 'components/order/OrderItem';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from 'ultils/hook';
import { SearchIcon } from 'ultils/icons';

const ManageOrders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const orderIdParams = queryParams.get('id') || '';
  const page = parseInt(queryParams.get("page")) || 1;

  const [orderId, setOrderId] = useState(orderIdParams);
  const { width } = useSelector(state => state.app)
  const debounceSearch = useDebounce(orderId?.trim(), 500);

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [orders, setOrders] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await apiGetOrders({
        page: currentPage,
        id: debounceSearch,

      });
      if (response.success) {
        setOrders(response.orders);
        setTotal(response.total);
      }
    };
    queryParams.set("page", currentPage);
    queryParams.set("id", debounceSearch);
    navigate("?" + queryParams.toString());
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debounceSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debounceSearch]);
  return (
    <div className="container mx-auto p-4 text-left ">
      <div className="flex flex-col gap-3">
        <div className="font-semibold text-[20px] my-5 mb-8">
          Manage Orders
        </div>
        <div className={`flex items-center gap-1 border-[1px] border-black p-2  rounded-md ${width === 1 ? "w-full" : "w-fit"}`}>
          <input type="text"
            placeholder="Type your Order ID..."
            className={`outline-none ${width === 1 ? "w-full" : " w-[400px]"}`}
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}

          />
          <SearchIcon className="cursor-pointer" />
        </div>
        {orders && (orders?.length > 0 ? orders?.map(order =>
          <div className="my-3"> <OrderItem admin={true} item={order} key={order?._id} /></div>
        )
          : <OrderItem admin={true} item={orders} key={orders?._id} />)}
      </div>
      <div className="float-right">
        <Pagination
          totalCount={total}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default ManageOrders
