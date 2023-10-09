import React, { useState, useRef, useEffect, memo } from "react";
import { NextIcon } from "ultils/icons";

const MobileOption = ({ title, options, onSelect, selected, isCreate }) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(
        (selected && selected[title]) ? selected[title] : []
    );
        
    const containerRef = useRef(null);
    const handleOptionChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(
                selectedOptions.filter((selected) => selected !== option)
            );
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    useEffect(() => {
        onSelect(title, selectedOptions);
    }, [selectedOptions]);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleOutsideClick = (event) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target)
        ) {
            setExpanded(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    return (
        <div className="relative text-[14px]" ref={containerRef}>
            <div
                onClick={toggleExpand}
                className="px-5 py-3 cursor-pointer flex items-center justify-between gap-4"
            >
                <div className="flex gap-2">
                    <span>{title}</span>
                    {selectedOptions.length > 0 &&
                        <span className="text-[14px] w-[20px] h-[20px] flex items-center justify-center rounded-full bg-gray-300 text-black">
                            {selectedOptions.length}
                        </span>}
                </div>
                <NextIcon size={15} />
            </div>
            {expanded && (
                <div className={`flex flex-col gap-3 shadow-md absolute z-10 px-3 py-3 bg-white top-[calc(100%+1px)] border left-0  max-h-[300px] overflow-auto w-full`}>
                    {options.map((option) => (
                        <label
                            className="flex items-center gap-2 "
                            key={option}
                        >
                            <input
                                className="outline-none border w-4 h-4 cursor-pointer"
                                type="checkbox"
                                value={option}
                                checked={selectedOptions.includes(option) || (selected && selected[title]?.includes(option))}
                                onChange={() => handleOptionChange(option)}
                            />
                            <span className="font-semibold">{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default memo(MobileOption);
