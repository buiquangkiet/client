import React from "react";
import {
    FbIcon,
    GoogleIcon,
    LocationIcon,
    MailIcon,
    PhoneIcon,
    PinterestIcon,
    TwitterIcon,
} from "../ultils/icons";
import { useSelector } from "react-redux";

const Footer = () => {
    const { width } = useSelector(state => state.app);

    const footer = [
        {
            title: "INFORMATION",
            items: [
                "Typography",
                "Gallery",
                "Store Location",
                "Today's Deals",
                "Contact",
            ],
        },
        {
            title: "WHO WE ARE",
            items: [
                "Help",
                "Free Shipping",
                "FAQs",
                "Return & Exchange",
                "Testimonials",
            ],
        },
        { title: "#DIGITALWORLDSTORE" },
    ];
    const icon = [
        <FbIcon />,
        <TwitterIcon />,
        <PinterestIcon />,
        <GoogleIcon size={20} />,
    ];
    return (
        <div className="flex flex-col w-full ">
            <div className="w-full bg-main flex justify-center">
                <div className="w-main  flex items-center justify-center">
                    <div
                        className={`w-full  py-[25px] flex gap-5  text-white ${width < 3 ? "flex-col items-center justify-center" : "  px-5 justify-between  items-center"}`}>
                        <div className={`flex flex-col flex-none ${width < 3 ? "items-center" : ""}`}>
                            <span className="text-[20px] ">
                                SIGN UP TO NEWSLETTER
                            </span>
                            <span className="text-[14px] opacity-60">
                                Subscribe now and receive weekly newsletter
                            </span>
                        </div>
                        <div className=" text-white flex w-full flex-auto items-center rounded-full bg-[rgba(255,255,255,0.2)] pr-5 gap-2 ">
                            <input
                                type="text"
                                placeholder="Email address"
                                className="outline-none border-none rounded-full bg-transparent h-[50px] w-full px-5"
                            />
                            <div>
                                <MailIcon size={20} className="cursor-pointer " />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-black flex justify-center">
                <div className="w-main flex items-center justify-center ">
                    <div className={`grid gap-8 w-full py-[50px] text-white  ${width === 3 ? "grid-cols-5 px-10" : width === 2 ?"grid-cols-4 px-5"  : "grid-cols-1 px-1"}`}>
                        <div className="col-span-2 flex flex-col gap-4">
                            <div className="border-l-[3px] border-l-red-600 pl-4 font-medium">
                                ABOUT US
                            </div>
                            <div className=" flex flex-col gap-2 text-[14px]">
                                <div className="flex gap-2 items-center">
                                    <LocationIcon />
                                    <span>
                                        {" "}
                                        Address: 474 Ontario St Toronto, ON M4X 1M7
                                        Canada
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <PhoneIcon />
                                    <span>Phone: (+1234)56789xxx</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <MailIcon />
                                    <span>Mail: tadathemes@gmail.com</span>
                                </div>
                            </div>
                            <div className="flex text-white gap-2">
                                {icon.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-3 bg-[#191919] text-white cursor-pointer rounded-md flex justify-center items-center"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {footer.map((item) => (
                            <div key={item.title} className="flex flex-col gap-3">
                                <div className="border-l-[3px] border-l-red-600 pl-4 font-medium">
                                    {item.title}
                                </div>
                                <div className="flex flex-col gap-2 text-[14px] ">
                                    {item.items &&
                                        item.items.map((item) => (
                                            <div
                                                className="opacity-60 hover:opacity-100 cursor-pointer"
                                                key={item}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
