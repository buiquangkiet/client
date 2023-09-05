import React from "react";

const CountDown = ({ time = 0, unit = "" }) => {
    return (
        <div className="bg-[#f4f4f4] w-full flex flex-col items-center justify-center py-[10px] px-[5px]">
            <span className="font-medium text-[16px]">{+time}</span>
            <span className="text-[14px]">{unit}</span>
        </div>
    );
};

export default CountDown;
