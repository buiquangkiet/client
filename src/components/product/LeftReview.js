import React, { memo } from "react";
import { HalfStar, StarFillIcon, StarOutlineIcon } from "ultils/icons";

const LeftReview = ({ total, quantityRate }) => {
    const getStars = (num, size) => {
        if (Number(num) === num && num % 1 !== 0) {
            const half = Math.round(num) - 1;
            const stars = [];
            for (let i = 1; i <= half; i++) {
                if (i <= half) stars.push(<StarFillIcon size={size} />);
            }
            stars.push(<HalfStar size={size} />);
            for (let i = half + 2; i <= 5; i++) {
                stars.push(<StarOutlineIcon size={size} />);
            }
            return stars;
        } else {
            const stars = [];
            for (let i = 0; i < 5; i++) {
                if (i < num) stars.push(<StarFillIcon size={size} />);
                else stars.push(<StarOutlineIcon size={size} />);
            }
            return stars;
        }
    };

    return (
        <div className="flex  items-center justify-center gap-2 p-5">
            <div className="text-[50px] font-semibold">{total}</div>
            <div className="flex flex-col gap-1 justify-center">
                <div className="flex items-center">
                    {getStars(total, 18).map((item, index) => (
                        <div key={index} className="text-yellow-500">
                            {item}
                        </div>
                    ))}
                </div>
                <div>{`( ${quantityRate} ${
                    quantityRate > 1 ? "reviews" : "review"
                } )`}</div>
            </div>
        </div>
    );
};

export default memo(LeftReview);
