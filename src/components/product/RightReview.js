import React, { memo } from "react";
import {  reviewStars } from "ultils/helpers";

const RightReview = ({ rating }) => {
    const count = [5, 4, 3, 2, 1].map(
        (item) => rating?.filter((rate) => rate.star === item).length
    );
    let star = [5, 4, 3, 2, 1];
    return (
        <div className="py-3 px-8">
            <div className="flex flex-col gap-2 justify-center">
                {count.map((item, index) => (
                    <div key={index}  className="flex gap-3 items-center justify-between">
                        <div className="flex items-center justify-end gap-2 text-yellow-500 w-[15%]">
                            {reviewStars(star[index]).map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                        <div className="w-[60%]  relative">
                            <div className="absolute h-[5px] rounded full bg-slate-600 opacity-25 w-full"></div>
                            <div
                                className={`absolute bg-main left-0 h-[5px] rounded-full  `}
                                style={{
                                    right: `  ${
                                        100 - (item * 100) / rating?.length
                                    }%`,
                                }}
                            ></div>
                        </div>
                        <span className="text-[14px] opacity-80">
                            {item > 1 ? `${item} Reviews` : `${item} Review`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(RightReview);
