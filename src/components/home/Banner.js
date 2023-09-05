import React from "react";
import banner from "assets/banner.webp";
const Banner = () => {
    return (
        <div>
            <img src={banner} alt="" className=" h-[430px] w-full object-cover"/>
        </div>
    );
};

export default Banner;
