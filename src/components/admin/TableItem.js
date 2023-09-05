import React, { memo } from "react";
import { useState } from "react";
import { CheckIcon } from "ultils/icons";

const TableItem = ({ content, isEditable, onUpdate, field, id }) => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");
    return (
        <div className="py-2 text-[13px]">
            {showInput ? (
                <div className="flex flex-col gap-2 ">
                    <input
                        type="text"
                        placeholder={content}
                        className="outline-none py-1  px-1 w-full rounded-sm border  border-black"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className="flex gap-1 items-center text-white">
                        <span
                            className="px-2 h-[20px] flex items-center  bg-green-500 cursor-pointer"
                            onClick={() => { setInputValue(""); onUpdate(id, field, inputValue.trim()); setShowInput(false) }}>
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
                <span
                    className={`${isEditable ? "cursor-text" : "cursor-not-allowed"
                        }`}
                    title={isEditable ? "Double Click to edit" : "Not Editable"}
                    onDoubleClick={() => {
                        isEditable && setShowInput(true);
                    }}
                >
                    {content}
                </span>
            )}
        </div>
    );
};

export default memo(TableItem);
