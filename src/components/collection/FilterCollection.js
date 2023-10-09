import React, { memo, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { apiGetProducts } from "apis/product";
import ProductType2 from "../product/ProductType2";
import Filter from "./Filter";
import Pagination from "components/Pagination/Pagination";
import { useDebounce } from "ultils/hook";
import { useDispatch, useSelector } from "react-redux";
import { FilterIcon, SearchIcon } from "ultils/icons";
import MobileFilter from "./MobileFilter";
import { setLoading } from "app/appSlice";

const FilterCollection = ({ fromProduct }) => {
    const { width } = useSelector((state) => state.app);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const params = useParams();
    const navigate = useNavigate();

    const [isMobileFilterShow, setIsMobileFilterShow] = useState(false);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState();
    const [newProducts, setNewProducts] = useState();
    const [officialProducts, setOfficialProducts] = useState();
    const [variants, setVariants] = useState();
    const [selected, setSelected] = useState({});
    const [currentPage, setCurrentPage] = useState(
        parseInt(queryParams.get("page")) || 1
    );

    const [searchInput, setSearchInput] = useState(queryParams.get("name") || "");
    const debounceSearch = useDebounce(searchInput.trim(), 500);
    const dispatch = useDispatch();
    const params2 = new URLSearchParams();
    const selectedDebounce = useDebounce(selected, 500);
    const data = params.cid
        ? { category: params.cid, page: currentPage }
        : { page: currentPage };

    const fetchProducts = async () => {
        const data = params.cid ? { category: params.cid, limit: 999 } : { limit: 999 };
        dispatch(setLoading(true));
        const response = await apiGetProducts({ ...data });
        if (response.success) {
            setTotal(response.total);
            setProducts(response.products);
            setOfficialProducts(response.products);
        }
        dispatch(setLoading(false));
    };

    const updateSelectedVariants = () => {
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
    };

    useEffect(() => {
        fetchProducts();
        updateSelectedVariants();
    }, []);

    useEffect(() => {
        const tempVariants = {};
        products?.forEach((product) => {
            if (product.variants) {
                Object.keys(product.variants).forEach((label) => {
                    tempVariants[label] = tempVariants[label]
                        ? [...tempVariants[label], ...product.variants[label]]
                        : product.variants[label];
                });
            }
        });

        Object.keys(tempVariants).forEach((key) => {
            const uniqueArray = [...new Set(tempVariants[key])].sort();
            tempVariants[key] = uniqueArray;
        });

        setVariants(tempVariants);
    }, [products]);

    useEffect(() => {
        if (newProducts) {
            setOfficialProducts(newProducts);
        } else {
            setOfficialProducts(products);
        }
    }, [newProducts]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedDebounce]);

    useEffect(() => {
        const fetchNewProducts = async () => {
            dispatch(setLoading(true));
            const res = await apiGetProducts({ ...data, ...formattedData });
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
            params2.append("title", debounceSearch);
        }

        if (!params2.pid) {
            const basePath = params.cid
                ? `/collections/${params.cid}`
                : "/products";

            navigate(`${basePath}?${params2.toString()}`, {
                replace: true,
            });

            fetchNewProducts();
        }

        params2.append("page", currentPage);
        navigate("?" + params2.toString());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDebounce, currentPage, debounceSearch]);

    useEffect(() => {
        if (width !== 1) {
            setIsMobileFilterShow(false);
        }
    }, [width]);

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleToggleMobileFilter = () => {
        setIsMobileFilterShow(!isMobileFilterShow);
    };

    return (
        <div className="min-w-full">
            <div
                className={`text-black flex items-center rounded-full my-5 bg-[rgba(255,255,255,0.2)] pr-5 gap-3 mb-5 border ${width === 3 ? "w-[50%]" : "w-full"
                    }`}
            >
                <input
                    type="text"
                    placeholder="Search Product by Title or Brand"
                    className="outline-none border-none rounded-full bg-transparent h-[40px] px-5 w-full flex-auto text-[16px]"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
                <div className="flex-none">
                    <SearchIcon size={20} className="cursor-pointer " />
                </div>
            </div>
            {isMobileFilterShow && (
                <MobileFilter
                    isMobileFilterShow={isMobileFilterShow}
                    variants={variants}
                    selected={selected}
                    setSelected={setSelected}
                    setMobile={setIsMobileFilterShow}
                />
            )}
            {width === 3 ? (
                <Filter variants={variants} selected={selected} setSelected={setSelected} />
            ) : (
                <div
                    onClick={handleToggleMobileFilter}
                    className="w-full border-[2px] gap-3 border-black flex items-center justify-center mt-5 py-3 cursor-pointer "
                >
                    <FilterIcon />
                    <span>Filter Products</span>
                    {Object.keys(selected).reduce(
                        (total, key) => selected[key].length + total,
                        0
                    ) > 0 && (
                            <span className="text-[14px] w-[20px] h-[20px] flex items-center justify-center rounded-full bg-gray-300 text-black">
                                {Object.keys(selected).reduce(
                                    (total, key) => selected[key].length + total,
                                    0
                                )}
                            </span>
                        )}
                </div>
            )}

            <div
                className={`grid   py-5 ${width === 1
                    ? "grid-cols-2 gap-1"
                    : width === 2
                        ? "grid-cols-3 gap-5"
                        : "grid-cols-4 gap-5"
                    }`}
            >
                {officialProducts?.map((product) => (
                    <ProductType2
                        key={product?._id}
                        product={product}
                        fatherPath={
                            fromProduct &&
                            `/collections/${product?.category?._id}/products/${product?._id}`
                        }
                    />
                ))}
            </div>
            <div className="float-right">
                <Pagination
                    totalCount={total}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default memo(FilterCollection);
