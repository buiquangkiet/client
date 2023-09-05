import React, { memo, useState } from "react";
import Reviews from "./Reviews";
import { useSelector } from "react-redux";

const ProductInfo = ({ product, info }) => {
    const {width} = useSelector(state => state.app)
    const infoArray = [];
    const [active, setActive] = useState(0);
    let index = 0;
    for (let item in info) {
        infoArray.push({ title: item, value: info[item], index: index });
        index++;
    }
    infoArray.push({
        title: "CUSTOMER REVIEW",
        value: <Reviews product={product} />,
        index: index,
    });
    return (
        <div className="flex flex-col ">
            <div className={`flex  ${width <3 ? "flex-col" : "items-center gap-2 "}`}>
                {infoArray.map((item) => (
                    <div
                        key={item.index}
                        onClick={() => {
                            setActive(item.index);
                        }}
                        className={`px-3 py-1 border cursor-pointer hover:bg-gray-100 border-b-white ${
                            active === item.index
                                ? "bg-white text-black"
                                : "bg-gray-200"
                        }`}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
            <div className=" border text-[14px] ">
                {active < infoArray.length - 1 ? (
                    <div className=" p-5 flex flex-col text-justify  gap-[2px] ">
                        {infoArray[active].value
                            .split("\n")
                            .map((item2, index2) => (
                                <span
                                    className={`  ${
                                        index2 === 1 &&
                                        "font-semibold text-[20px]"
                                    }`}
                                    key={index2}
                                >
                                    {item2}
                                </span>
                            ))}
                    </div>
                ) : (
                    infoArray[active].value
                )}
            </div>
        </div>
    );
};

export default memo(ProductInfo);
