import React, { useEffect, useState } from "react";
import { Banner, Sidebar, ProductSlider, DealDaily } from "components";
import { apiGetProducts } from "apis/product";
import adv1 from "assets/adv1.png";
import adv2 from "assets/adv2.png";
import FeatureProduct from "components/home/FeatureProduct";
import NewArrival from "components/home/NewArrival";
import HotCollection from "components/home/HotCollection";
import { useSelector } from "react-redux";
import AuctionProduct from "components/home/Auction";

const Home = () => {
    const [best, setBest] = useState();
    const [newArrival, setNewArrival] = useState();
    const [newPhones, setNewPhones] = useState();
    const [newTablets, setNewTablets] = useState();
    const [newLaptops, setNewLaptops] = useState();
    const { width } = useSelector(state => state.app);
    // console.log(currentUser);
    const fetchProducts = async () => {
        const [bestSellers, newArrivals, newPhones, newTablets, newLaptops] = await Promise.all([
            apiGetProducts({ sort: "-sold" }),
            apiGetProducts({ sort: "-createdAt" }),
            apiGetProducts({
                category: "648d97545103d9501ccf6679",
                sort: "-createAt",
            }),
            apiGetProducts({
                category: "648d97545103d9501ccf667a",
                sort: "-createAt",
            }),
            apiGetProducts({
                category: "648d97545103d9501ccf667b",
                sort: "-createAt",
            }),
        ]);
        if (bestSellers.success) setBest(bestSellers.products);
        if (newArrivals.success) setNewArrival(newArrivals.products);
        if (newPhones.success) setNewPhones(newPhones.products);
        if (newTablets.success) setNewTablets(newTablets.products);
        if (newLaptops.success) setNewLaptops(newLaptops.products);
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="w-full mt-5 mb-[100px] flex flex-col  gap-5">
            <div className="flex gap-5 ">

                <div className="flex flex-col w-[75%] flex-auto gap-5">
                    <Banner />
                    {width < 3 &&
                        <DealDaily />
                    }
                    <ProductSlider
                        bestSellers={best}
                        newArrivals={newArrival}
                    />
                    <div className={` ${width === 1 ? "flex-col" : "flex justify-between items-center mt-5"}`}>
                        <div className="relative group">
                            <div className="absolute top-0 left-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                            <div className="absolute bottom-0 right-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                            <img src={adv1} className="w-full" alt="" />
                        </div>

                        <div className="relative group">
                            <div className="absolute top-0 left-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                            <div className="absolute bottom-0 right-0 w-0 h-0 bg-[rgba(0,0,0,0.2)] group-hover:w-full group-hover:h-full duration-300 "></div>
                            <img src={adv2} className="w-full" alt="" />
                        </div>
                    </div>
                </div>
                {width === 3 &&
                    <div className="flex flex-col w-[25%] gap-5 flex-auto">
                        <Sidebar />
                        <DealDaily />
                    </div>}
            </div>
            <AuctionProduct />

            <FeatureProduct />
            <NewArrival
                newPhones={newPhones}
                newTablets={newTablets}
                newLaptops={newLaptops}
            />
            <HotCollection />
        </div>
    );
};

export default Home;
