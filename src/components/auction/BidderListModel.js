import { offModel } from 'app/ProductModel';
import React from 'react'
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'ultils/icons';

const BidderListModel = ({ auctionHistory, currentId = "" }) => {
    const { width } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const formatDate = (time) => {
        const date = new Date(time);
        // Format the date in the desired format
        const formattedDate = date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        return formattedDate
    }
    return (
        <div className={`fixed  z-40 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  bg-white  overflow-x-auto whitespace-normal
        ${width < 3 ? "w-[95%] h-[80%]" : " w-[60%] h-[70%]"}`}>
            <div className="flex justify-between py-5 px-3 bg-slate-100 ">
                <div className=' text-[20px] font-semibold'>Bidding Details</div>
                <CloseIcon onClick={() => dispatch(offModel())} className="w-[20px] h-[20px] border border-black rounded-full flex items-center justify-center p-[1px] cursor-pointer duration-200 font-semibold hover:text-white hover:bg-black" />
            </div>
            <div className="p-3 h-[80%] overflow-y-scroll">
                <div className="grid grid-cols-4 gap-3 font-semibold py-3 border-b-[1px] border-b-black">
                    <span>Avatar</span>
                    <span>Bidder Name</span>
                    <span>Bid Amount</span>
                    <span>Bidding Date</span>
                </div>
                <div classname=" ">
                    {auctionHistory.map(user =>
                        <div
                            className={`grid grid-cols-4 my-2 py-2 border-b-[1px] gap-3  flex items-center 
                        ${currentId === user?.bidedBy?._id && "text-main"}`}
                            key={user?.bidedBy?._id}
                        >
                            <img src={user?.bidedBy?.avatar?.path} alt="" className='w-[50px] h-[50px] rounded-full object-cover' />
                            <span className={``}>{user?.bidedBy.firstname} {user?.bidedBy.lastname}</span>
                            <span>{user?.price?.toLocaleString("vi-VN")} VND</span>
                            <span>{formatDate(user?.bideddAt)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(BidderListModel)
