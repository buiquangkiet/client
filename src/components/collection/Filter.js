import React, { memo, useState } from "react";
import CustomOptionSelect from "./Option";
import { DeleteIcon } from "ultils/icons";

const Filter = ({ variants, selected, setSelected, isCreate }) => {
    const handleSelect = (title, selectedOptions) => {
        setSelected({ ...selected, [title]: selectedOptions });
    };
    return (
        <div className="p-2 my-3  flex flex-col gap-3">
            <div className="font-semibold">{isCreate ? "Variants" : "Filter"}</div>
            <div className={`flex items-center flex-wrap   ${isCreate ? "gap-5" : " gap-1"}`}>
                {variants &&
                    Object.keys(variants).map((variant) => (
                        <CustomOptionSelect
                            key={variant}
                            title={variant}
                            options={variants[variant]}
                            onSelect={handleSelect}
                            selected={selected}
                            isCreate
                        />
                    ))}
            </div>

            <div className="text-[14px] font-semibold flex gap-3 items-center">
                <span className="flex-none">{isCreate ? "Chosen Variants : " : "Filted by : "}</span>
                <div className="flex-auto">
                    {selected && (
                        <div className="flex items-center flex-wrap gap-4 ">
                            {Object.keys(selected).map((item, index) => (
                                <div
                                    key={index}

                                >

                                    {selected[item].length !== 0 &&
                                        <div className="flex items-center gap-1">
                                            <span className="mr-1">{item} :</span>
                                            {selected[item].map((item2, index2) => (
                                                <div
                                                    className="px-3 py-1 border"
                                                    key={index2}
                                                >
                                                    {item2}
                                                </div>
                                            ))}
                                        </div>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(Filter);
