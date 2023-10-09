import React, { memo } from "react";
import { useSelector } from "react-redux";
import { reviewStars } from "ultils/helpers";

const RightReview = ({ rating }) => {
    const { width } = useSelector((state) => state.app);
    const count = [5, 4, 3, 2, 1].map(
        (item) => rating?.filter((rate) => rate.star === item).length
    );
    let star = [5, 4, 3, 2, 1];
    return (
        <div className="py-3 px-8">
            <div className="flex flex-col gap-2 justify-center">
                {count.map((item, index) => (
                    <div key={index} className={`flex items-center justify-between ${width === 1 ? "gap-1" : "gap-3"}`}>
                        <div className={`flex items-center justify-end  text-yellow-500 w-[15%] ${width === 1 ? "gap-1" : "gap-2"}`}>
                            {reviewStars(star[index]).map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                        <div className="w-[60%]  relative">
                            <div className="absolute h-[5px] rounded full bg-slate-600 opacity-25 w-full"></div>
                            <div
                                className={`absolute bg-main left-0 h-[5px] rounded-full  `}
                                style={{
                                    right: `  ${100 - (item * 100) / rating?.length
                                        }%`,
                                }}
                            >

                            </div>
                        </div>
                        {width !== 1 ? <span className="text-[14px] opacity-80">
                            {item > 1 ? `${item} Reviews` : `${item} Review`}
                        </span> : <span className="text-[14px] opacity-80 w-[5px]">{item}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(RightReview);
