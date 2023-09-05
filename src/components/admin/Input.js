import React from 'react'
import { memo } from 'react'

const Input = ({ label, handleAttribute, field, value, select, number, required, selected }) => {
    return (
        <div className="w-full flex flex-col gap-1 my-2">
            <div className="flex items-center ">
                <label className="font-semibold" htmlFor={field}>{label}</label>
                {required && <span className="text-[12px]">(*)</span>}
            </div>
            {!select ?
                <input
                    className={`w-full px-2 py-1 border border-black outline-none 
                    ${required && (!value || value === '') && "border-red-500"}`}
                    id={field}
                    placeholder={label}
                    type={number ? 'number' : 'text'}
                    value={value} onChange={(e) => handleAttribute(field, e.target.value)} /> :
                <select className="w-full px-2 py-1 border border-black outline-none" onChange={(e) => handleAttribute(field, e.target.value)} >
                    {value && value?.map((item, index) => (
                        <option key={index} selected={item?.toLowerCase() === selected?.toLowerCase()}>{item}</option>
                    ))}
                </select>}
        </div>
    )
}

export default memo(Input)
