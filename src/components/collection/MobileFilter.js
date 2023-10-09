import React, { memo } from 'react'
import MobileOption from './MobileOption';
import { CloseIcon, DeleteIcon } from 'ultils/icons';
const MobileFilter = ({ variants, selected, setSelected, isCreate, isMobileFilterShow, setMobile }) => {
    const handleSelect = (title, selectedOptions) => {

        setSelected({ ...selected, [title]: selectedOptions });
    };

    return (
        <div className="w-full fixed h-full z-40">
            <div
                onClick={() => setMobile(!isMobileFilterShow)}
                className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-[rgba(0,0,0,0.3)]"></div>

            <div
                className={`fixed top-0 right-0 z-50 bg-white text-black p-2 animate-slideLeftToRight flex flex-col gap-3 shadow-xl w-[350px] min-h-screen`}>
                <div className="flex justify-between absolute top-5 w-full px-5 font-bold">
                    <span className="text-[20px]">Filter</span>
                    <CloseIcon className=" cursor-pointer" onClick={() => setMobile(false)} size={20} />
                </div>
                <div className={`flex flex-col flex-wrap mt-[50px]  ${isCreate ? "gap-5" : " gap-1"}`}>

                    {variants &&
                        Object.keys(variants).map((variant) => (
                            <MobileOption
                                key={variant}
                                title={variant}
                                options={variants[variant]}
                                onSelect={handleSelect}
                                selected={selected}
                                isCreate
                            />
                        ))}
                </div>
                <button className="px-5 py-2 rounded-md bg-main text-white font-medium flex items-center justify-center gap-3 mt-8"
                    onClick={() => { setSelected({}); setMobile(false) }}>
                    <DeleteIcon size={25} />
                    <span>Clear All</span>
                </button>
            </div>
        </div>
    );
}

export default memo(MobileFilter)
