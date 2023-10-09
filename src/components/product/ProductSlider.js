import React, { useEffect, useState } from "react";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import Slider from "../common/Slider";
const ProductSlider = ({ bestSellers, newArrivals }) => {
    const title = ["BEST SELLER", "NEW ARRIVALS"];
    const [active, setActive] = useState(title[0]);
    const [main, setMain] = useState(bestSellers);

    useEffect(() => {
        if (bestSellers) setMain(bestSellers);
    }, [bestSellers]);
    useEffect(() => {
        if (active === "BEST SELLER") {
            setMain(bestSellers);
        } else {
            setMain(newArrivals);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);
    return (
        <div className="mt-5 ">
            <div className="flex gap-4 py-3 border-b-[2px] border-b-red-600">
                {title.map((item, index) => (
                    <div
                        onClick={() => setActive(item)}
                        key={item}
                        className={`text-[18px] pr-4 cursor-pointer font-normal  ${
                            active === item && "text-main"
                        } ${
                            index < title.length - 1 &&
                            " border-r-[1px] border-r-[rgba(0,0,0,0.1)]"
                        }`}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <Slider products={main} />
        </div>
    );
};

export default ProductSlider;
