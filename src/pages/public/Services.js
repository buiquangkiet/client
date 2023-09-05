import React from "react";
import { useSelector } from "react-redux";

const Services = () => {
    const { width } = useSelector(state => state.app)
    const ServiceItem = ({ url, title, description }) => (
        <div className="flex flex-col items-center justify-center text-[#505050] text-center">
            <img src={url} alt="" />
            <span>{title}</span>
            <span className="text-[14px]">{description}</span>
        </div>
    );
    const ServiceArray = [
        {
            url: "https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711",
            title: "Customizable Page",
            description:
                "Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora",
        },
        {
            url: "https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656",
            title: "Revolution Slider",
            description:
                "Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora",
        },
        {
            url: "https://cdn.shopify.com/s/files/1/1636/8779/files/layout.png?v=1491835677",
            title: "Drag & Drop Page",
            description:
                "Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora",
        },
        {
            url: "https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656",
            title: "Revolution Slider",
            description:
                "Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora",
        },
        {
            url: "https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711",
            title: "Customizable Page",
            description:
                "Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora",
        },
        {
            url: "https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656",
            title: "Revolution Slider",
            description:
                "Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora",
        },
    ];
    return (
        <div className="w-main mt-5 mb-[100px] flex flex-col  gap-10">
            <span className="text-[20px] font-semibold">Services</span>
            <div className={`flex gap-5 ${width < 3 && "flex-col"}`}>
                <img
                    src="https://cdn.shopify.com/s/files/1/1636/8779/files/9069783_orig.jpg?v=1491836163"
                    alt=""
                />
                <div className="flex flex-col gap-3 text-justify">
                    <span>
                        Cras magna tellus, congue vitae congue vel, facilisis id
                        risus. Proin semper in lectus id faucibus. Aenean vitae
                        quam eget mi aliquam viverra quis quis velit.
                    </span>
                    <span>
                        Curabitur mauris diam, posuere vitae nunc eget, blandit
                        pellentesque mi. Pellentesque placerat nulla at
                        ultricies malesuada. Aenean mi lacus, malesuada at leo
                        vel, blandit iaculis nisl.
                    </span>
                    <span>
                        Praesent vestibulum nisl sed diam euismod, a auctor
                        neque porta. Vestibulum varius ligula non orci tincidunt
                        rutrum. Suspendisse placerat enim eu est egestas,
                        aliquam venenatis elit accumsan. Donec metus quam,
                        posuere sit amet odio et, ultricies consequat nibh.
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-[24px] font-semibold text-center text-[#505050]">
                    We Offer Best Services
                </span>
                <div className={`grid gap-10 ${width === 3 ? " grid-cols-3" : " grid-cols-2"}`}>
                    {ServiceArray.map((item, index) => (
                        <ServiceItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
