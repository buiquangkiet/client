import React, { memo, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Pagination from "components/Pagination/Pagination";
import { useDebounce } from "ultils/hook";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "app/appSlice";
import { apiGetAuctionProducts } from "apis/auctionProduct";
import AuctionProductCart from "components/auction/AuctionProductCart";
import { SearchIcon } from "ultils/icons";
const AuctionProducts = () => {
    const { width } = useSelector(state => state.app);
    const location = useLocation();
    const [total, setTotal] = useState(0);
    const [newProducts, setNewProducts] = useState();
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(page);
    const params = useParams();
    const navigate = useNavigate();
    const name = queryParams.get("name") || "";
    const [searchInput, setSearchInput] = useState(name);
    const debounceSearch = useDebounce(searchInput.trim(), 500);
    const dispatch = useDispatch()
    const params2 = new URLSearchParams();
    const data = { page: currentPage };

    useEffect(() => {
        const fetchNewProducts = async () => {
            dispatch(setLoading(true));
            const res = await apiGetAuctionProducts({
                ...data,
                ...formattedData,
            });
            if (res.success) {
                setNewProducts(res.products);
                setTotal(res.total);
            }
            dispatch(setLoading(false));
        };

        const formattedData = {};

        Object.keys(formattedData).forEach((key) => {
            formattedData[key].forEach((value) => {
                params2.append(key, value);
            });
        });
        if (debounceSearch) {
            formattedData["title"] = debounceSearch;
            params2.append("title", debounceSearch)
        }
        if (!params2.pid) {
            if (params.cid) {
                navigate(`/collections/${params.cid}?${params2.toString()}`, {
                    replace: true,
                });
            } else navigate(`/products?${params2.toString()}`);
            fetchNewProducts();
            // setCurrentPage(1);
        }
        // queryParams.set("page", currentPage);
        params2.append("page", currentPage);

        navigate("?" + params2.toString());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, debounceSearch]);

    return (
        <div className="min-w-full">
            <div
                className={`text-black flex items-center rounded-full my-5 bg-[rgba(255,255,255,0.2)] pr-5 gap-3 mb-5 border ${width === 3 ? "w-[50%]" : "w-full"}`}>
                <input
                    type="text"
                    placeholder="Search Product by Title or Brand"
                    className="outline-none border-none rounded-full bg-transparent h-[40px] px-5 w-full flex-auto text-[16px]"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <div className="flex-none">
                    <SearchIcon size={20} className="cursor-pointer " />
                </div>
            </div>


            <div className={`grid   py-5 ${width === 1 ? "grid-cols-2 gap-1" : width === 2 ? "grid-cols-3 gap-5" : "grid-cols-4 gap-5"}`}>
                {newProducts?.map((product) => (
                    <AuctionProductCart product={product} key={product._id} />
                ))}
            </div>
            <div className="float-right">
                <Pagination
                    totalCount={total}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div >
    );
};

export default memo(AuctionProducts);
