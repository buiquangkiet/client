import React, { memo } from "react";
import { useState } from "react";
import { CheckIcon, RadioButtonIcon } from "ultils/icons";

const TableItem = ({ content, onUpdate, field, id, value }) => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState(content);

    return (
        <div className="py-2 text-[12px]">
            {showInput ? (
                <div className="flex flex-col gap-2 ">
                    <div>
                        {value.map((item, index) =>
                            <div className="flex items-center cursor-pointer gap-1" key={index} >
                                <input className="cursor-pointer" type="radio" id={item} name={field} value={item} defaultChecked={content === item}
                                    onChange={() => setInputValue(item)}
                                />
                                <label className="cursor-pointer" for={item}>{item}</label>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-1 items-center text-white">
                        <span
                            className="px-2 h-[20px] flex items-center  bg-green-500 cursor-pointer"
                            onClick={() => { onUpdate(id, field, inputValue.trim()); setShowInput(false) }}>
                            <CheckIcon />
                        </span>
                        <span
                            className="px-2 h-[20px] bg-red-600 cursor-pointer"
                            onClick={() => setShowInput(false)}
                        >
                            x
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => setShowInput(true)} >
                    <span
                    >
                        {content}
                    </span>
                    <RadioButtonIcon />
                </div>
            )}
        </div>
    );
};

export default memo(TableItem);
