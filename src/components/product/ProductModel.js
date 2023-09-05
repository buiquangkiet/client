import { offModel } from "app/ProductModel";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "ultils/icons";
import * as DOMPurify from 'dompurify';
const ProductModel = ({ product }) => {
    const [thumb, setThumb] = useState(product?.thumbnail?.path ? product.thumbnail.path : product.thumbnail);
    const dispatch = useDispatch();
    const { width } = useSelector((state) => state.app);
    return (
        <div
            className={`fixed  z-40 top-[50%] left-[50%] h-[80%]  translate-x-[-50%] translate-y-[-50%] p-5 bg-white flex justify-between gap-5
             ${width === 1 ? "w-full " : "w-[80%]"}`}>
            <div
                className="absolute right-5 top-5 cursor-pointer "
                onClick={() => dispatch(offModel())}
            >
                <CloseIcon size={20} />
            </div>
            <div className={`flex w-full justify-between gap-8 mt-8 overflow-x-hidden  overflow-y-auto ${width < 3 && "flex-col items-center"}`}>
                <div className={`flex flex-col gap-5 flex-none  ${width === 3 && "border-r-[1px] "}`}>
                    <div className="w-full">
                        <img
                            src={thumb}
                            className=" object-cover max-w-[300px] max-h-[300px]"
                            alt=""
                        />
                    </div>
                    <div className="flex ">
                        {product?.image.map((item, index) => (
                            <div
                                key={index}
                                className="col-span-1 p-[10px] border flex items-center justify-center cursor-pointer"
                                onClick={() => setThumb(item)}
                            >
                                <img src={item.path ? item.path : item} alt="" className="w-[100px] h-[100px] object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 whitespace-nowrap px-5">
                    <span className="text-[20px] font-semibold mb-8">
                        {product?.title}
                    </span>
                    <div className="flex flex-col gap-1 h-full">
                        <ul className="list-disc ">
                            {product.description.length > 1 ? product?.description?.map((item, index) => (
                                <li className="text-[15px] px-5" key={index}>
                                    {item}
                                </li>
                            )) : <div className="text-[15px] text-justify line-clamp-[10] " dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}></div>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ProductModel);
