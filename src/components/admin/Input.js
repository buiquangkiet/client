import React from 'react'
import { memo } from 'react'

const Input = ({ label, handleAttribute, field, value, select, number, required, selected, disabled, date }) => {
    const formatISODateToDateTimeLocal = (isoDate) => {
        const dateObj = new Date(isoDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // Format the date string before setting it as the value
    const formattedValue = date ? formatISODateToDateTimeLocal(value) : value;
    return (
        <div className="w-full flex flex-col gap-1 my-2">
            {label &&
                <div className="flex items-center ">
                    <label className="font-semibold" htmlFor={field}>{label}</label>
                    {required && <span className="text-[12px]">(*)</span>}
                </div>}
            {!select ?
                <input
                    className={`w-full px-2 py-2 border border-gray-400 outline-blue-500 duration-200 rounded-sm 
                    ${required && (!value || value === '') && "border-red-500"} `}
                    id={field}
                    disabled={disabled}
                    placeholder={label}
                    type={number ? 'number' : date ? 'datetime-local' : 'text'}
                    value={formattedValue}
                    onChange={(e) => handleAttribute(field, e.target.value)} />
                :
                <select className="w-full px-2 py-2 border border-black outline-none" onChange={(e) => handleAttribute(field, e.target.value)} >
                    {value && value?.map((item, index) => (
                        <option key={index} selected={item?.toLowerCase() === selected?.toLowerCase()}>{item}</option>
                    ))}
                </select>}
        </div>
    )
}

export default memo(Input)
