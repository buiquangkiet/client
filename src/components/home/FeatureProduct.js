import React, { useEffect, useState } from "react";
import { apiGetProducts } from "apis/product";
import ProductCard from "../product/ProductCard";
import banner1 from "assets/featurebanner1.jpg";
import banner2 from "assets/featurebanner2.jpg";
import banner3 from "assets/featurebanner3.jpg";
import banner4 from "assets/featurebanner4.jpg";
import { useSelector } from "react-redux";
const FeatureProduct = () => {
    const { width } = useSelector(state => state.app);

    const [products, setProduct] = useState([]);
    const fetchProducts = async () => {
        const response = await apiGetProducts({
            limit: 9,
            sort: "totalRating",
            page: 1,
        });
        if (response.success) {
            setProduct(response.products);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="mt-5">
            <div className=" py-[15px] border-b-[2px] border-b-red-600 text-[18px] font-medium">
                FEATURED PRODUCTS
            </div>
            <div
                className={`my-5 grid gap-5 ${width === 1 ? "grid-cols-1" : width === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            </div>
            <div className={`${width >= 2 ? "grid grid-cols-4 gap-3" : "flex flex-col gap-3"} `}>
                <div className=" col-span-2 relative group">
                    <img src={banner1} className="h-full w-full" alt="" />
                    <div className="absolute top-0 left-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                    <div className="absolute bottom-0 right-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                </div>
                <div className="col-span-1 flex flex-col justify-between">
                    <div className="relative group">
                        <img src={banner2} alt="" className="h-full w-full" />
                        <div className="absolute top-0 left-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                        <div className="absolute bottom-0 right-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                    </div>
                    <div className="relative group">
                        <img src={banner3} alt="" className="h-full w-full" />
                        <div className="absolute top-0 left-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                        <div className="absolute bottom-0 right-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                    </div>
                </div>
                <div className="col-span-1 relative group">
                    <img src={banner4} alt="" className="h-full w-full" />
                    <div className="absolute top-0 left-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                    <div className="absolute bottom-0 right-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                </div>
            </div>
        </div>
    );
};

export default FeatureProduct;
