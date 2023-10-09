import React from 'react'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { SearchIcon } from 'ultils/icons'
import SearchOrderDetail from './SearchOrderDetail'
import { useSelector } from 'react-redux'

const SearchOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const orderIdParams = urlParams.get('oid');
  const [orderId, setOrderId] = useState(orderIdParams);
  const { width } = useSelector(state => state.app)
  const handleSearchOrder = () => {
    navigate(orderId ? `?oid=${orderId}` : '')
  }
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-5 my-5'>
        <span className='text-[20px] font-semibold'>Search Order</span>
        <div className={`flex items-center gap-1 border-[1px] border-black p-2  rounded-md ${width === 1 ? "w-full" : "w-fit"}`}>
          <input type="text"
            placeholder="Type your Order ID..."
            className={`outline-none ${width === 1 ? "w-full" : " w-[400px]"}`}
            value={orderId || ''}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchOrder()} />
          <SearchIcon className="cursor-pointer" onClick={handleSearchOrder} />
        </div>
        <SearchOrderDetail />
      </div>
    </div>
  )
}

export default SearchOrder
