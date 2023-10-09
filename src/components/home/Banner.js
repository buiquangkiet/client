import React from "react";
import banner from "assets/banner.webp";
import banner2 from "assets/banner2.jpg"
import banner3 from "assets/banner3.jpg"


const Banner = () => {
    return (
        <div className="flex flex-col gap-5">
            <img src={banner3} alt="" className=" h-[430px] w-full object-cover"/>
        </div>
    );
};

export default Banner;
