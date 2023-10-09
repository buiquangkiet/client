import React, { memo, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Filter from "../../components/collection/Filter";
import Pagination from "components/Pagination/Pagination";
import { useDebounce } from "ultils/hook";
import { useDispatch, useSelector } from "react-redux";
import { FilterIcon, SearchIcon } from "ultils/icons";
import MobileFilter from "../../components/collection/MobileFilter";
import { setLoading } from "app/appSlice";
import { apiGetAuctionProducts } from "apis/auctionProduct";
import AuctionProductCart from "components/auction/AuctionProductCart";
const AuctionProducts = () => {
    const { width } = useSelector(state => state.app);
    const location = useLocation();
    const [isMobileFilterShow, setIsMobileFilterShow] = useState(false)
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState();
    const [newProducts, setNewProducts] = useState();
    const [officialProducts, setOfficialProducts] = useState();
    const [variants, setVariants] = useState();
    const [selected, setSelected] = useState({});
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
    const selectedDebounce = useDebounce(selected, 500);
    const data = { page: currentPage };

    const fetchProducts = async () => {
        const data = { limit: 999 };
        dispatch(setLoading(true));
        const response = await apiGetAuctionProducts({
            ...data,
        });
        if (response.success) {
            setTotal(response.total);
            setProducts(response.products);
            setOfficialProducts(response.products);
        }
        dispatch(setLoading(false));
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const variantsParams = {};
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        for (let param of searchParams.entries()) {
            const [key, value] = param;

            if (key.startsWith("variants.")) {
                const variantKey = capitalizeFirstLetter(key.split(".")[1]);
                if (!variantsParams[variantKey]) {
                    variantsParams[variantKey] = [];
                }
                variantsParams[variantKey]?.push(value.toUpperCase());
            }
        }
        setSelected(variantsParams);
    }, []);
    useEffect(() => {
        const tempVariants = {};
        products?.forEach((product) => {
            if (product.variants)
                Object.keys(product.variants).forEach((label) => {
                    tempVariants[label] = tempVariants[label]
                        ? [...tempVariants[label], ...product.variants[label]]
                        : product.variants[label];
                });
        });
        tempVariants &&
            Object.keys(tempVariants).forEach((key) => {
                const uniqueArray = [...new Set(tempVariants[key])].sort();
                tempVariants[key] = uniqueArray;
            });
        setVariants(tempVariants);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);
    useEffect(() => {
        if (newProducts) setOfficialProducts(newProducts);
        else setOfficialProducts(products);
    }, [newProducts]);
    useEffect(() => {
        setCurrentPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDebounce]);
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
        function removeEmptyArrayFields(obj) {
            const result = {};
            obj &&
                Object.keys(obj).forEach((key) => {
                    if (Array.isArray(obj[key]) && obj[key].length > 0) {
                        result[key] = obj[key];
                    }
                });
            return result;
        }
        const filteredData = removeEmptyArrayFields(selected);
        const formattedData = {};

        Object.keys(filteredData).forEach(
            (key) => (formattedData[`variants.${key}`] = filteredData[key])
        );

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
    }, [selectedDebounce, currentPage, debounceSearch]);
    useEffect(() => {
        if (width !== 1) setIsMobileFilterShow(false)
    }, [width])
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
            {isMobileFilterShow && <MobileFilter
                isMobileFilterShow={isMobileFilterShow}
                variants={variants} selected={selected}
                setSelected={setSelected}
                setMobile={setIsMobileFilterShow} />}
            {width === 3 ? <Filter
                variants={variants}
                selected={selected}
                setSelected={setSelected}
            />
                :
                <div
                    onClick={() => setIsMobileFilterShow(!isMobileFilterShow)}
                    className="w-full border-[2px] gap-3 border-black flex items-center justify-center mt-5 py-3 cursor-pointer ">
                    <FilterIcon />
                    <span>Filter Products</span>
                    {Object.keys(selected).reduce((total, key) => selected[key].length + total, 0) > 0 &&
                        <span className="text-[14px] w-[20px] h-[20px] flex items-center justify-center rounded-full bg-gray-300 text-black">
                            {Object.keys(selected).reduce((total, key) => selected[key].length + total, 0)}
                        </span>}
                </div>}

            <div className={`grid   py-5 ${width === 1 ? "grid-cols-2 gap-1" : width === 2 ? "grid-cols-3 gap-5" : "grid-cols-4 gap-5"}`}>
                {officialProducts?.map((product) => (
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
