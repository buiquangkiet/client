import { current } from '@reduxjs/toolkit';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { formatDate } from 'ultils/helpers';

const MyAuctions = () => {
  const { currentUser } = useSelector(state => state.user);
  const auctionState = ['Running Auctions', 'Winning Auctions', 'Didn\'t win']
  const [status, setStatus] = useState(auctionState[0]);
  const [auction, setAuction] = useState();
  const { width } = useSelector(state => state.app);
  const isExpired = (time) => new Date(time) - new Date() > 0 ? true : false;
  const formatMoney = (money) => money.toLocaleString("vi-VN") + " VND"
  useEffect(() => {
    if (status === 'Running Auctions') {
      const product = currentUser?.auction?.filter(item => isExpired(item.product.expire));
      setAuction(product);
    }
    else if (status === 'Winning Auctions') {
      const product = currentUser?.auction?.filter(item => (!isExpired(item.product.expire) && (item.product.maxPrice === item.price)));
      setAuction(product);
    }
    else {
      const product = currentUser?.auction?.filter(item => (!isExpired(item.product.expire) && (item.product.maxPrice > item.price)));
      setAuction(product);
    }
  }, [status, currentUser])
  // console.log(currentUser?.auction?.filter(item => isExpired(item.product.expire)));
  return (
    <div className="w-full mx-auto p-4 text-left flex flex-col ">
      <div className="font-semibold text-[20px] my-5 mb-8">
        My Auction
      </div>
      <div className="flex items-center  border-b-[1px] border-b-red-600 mb-8">
        {auctionState.map(item =>
          <div className={`${item === status ? 'bg-main text-white' : 'hover:bg-red-200'} relative p-2 cursor-pointer duration-200`}
            onClick={() => setStatus(item)}
          >
            {item}
          </div>
        )}
      </div>
      {auction ?
        width === 3 ?
          <div>
            <div className=' gap-3 font-semibold w-full grid grid-cols-9 mb-5'>
              <span>Product Image</span>
              <span className='col-span-2'>Product Name</span>
              <span>Reverse Price</span>
              <span>Your Bid</span>
              <span>Bid At</span>
              <span>Highest Bid</span>
              <span>Highest Bidder</span>
              <span>End Date</span>
            </div>
            {auction.map(product =>
              <div className=' gap-3  w-full grid grid-cols-9 mb-5 flex items-center pb-3 border-b-[1px]'>
                <img src={product.product.thumbnail.path ? product.product.thumbnail.path : product.product.thumbnail} alt="" className='w-[70px] object-cover' />
                <Link to={`/auction-products/${product.product._id}`} className='col-span-2 truncate hover:text-main'>{product.product.title}</Link>
                <span>{formatMoney(product.product.reservePrice)}</span>
                <span>{formatMoney(product.price)}</span>
                <span>{formatDate(new Date(product?.bidedAt))}</span>
                <span>{formatMoney(product.product.maxPrice)}</span>
                <span>
                  {product?.product?.highestBidder?._id === currentUser?._id ?
                    "You" :
                    product?.product?.highestBidder?.firstname + " " + product?.product?.highestBidder?.lastname}
                </span>
                <span>{formatDate(new Date(product?.product?.expire))}</span>
              </div>
            )}
          </div> :
          <div>
            {auction.map(product =>
              <div className="mb-5 py-3 border-b-[1px] flex flex-col gap-3" key={product._id}>
                <Link to={`/auction-products/${product.product._id}`} className='col-span-3 font-semibold truncate hover:text-main'>{product.product.title}</Link>
                <div className="flex items-center justify-between">
                  <img src={product.product.thumbnail.path ? product.product.thumbnail.path : product.product.thumbnail} alt="" className='w-[100px] object-cover' />
                  <div className="flex flex-col gap-3">
                    <span className='font-semibold'>Reverse Price</span>
                    <span>{formatMoney(product.product.reservePrice)}</span>
                  </div>

                </div>
                <div className='flex items-center gap-3'>
                  <span className='font-semibold'>Your Bid : </span>
                  <span>{formatMoney(product.price)}</span>
                  <span className='font-semibold'>At : </span>
                  <span>{formatDate(new Date(product?.bidedAt))}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='font-semibold'>Highest Bidder : </span>
                  <span>{product?.product?.highestBidder?._id === currentUser?._id ?
                    "You" :
                    product?.product?.highestBidder?.firstname + " " + product?.product?.highestBidder?.lastname}</span>
                  <span className='font-semibold'>Bid At Price : </span>
                  <span>{formatMoney(product.product.maxPrice)}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='font-semibold'>End Date :  </span>
                  <span>{formatDate(new Date(product?.product?.expire))}</span>
                </div>
              </div>)}
          </div>
        :
        <div>
        </div>}
    </div>
  )
}

export default memo(MyAuctions)
