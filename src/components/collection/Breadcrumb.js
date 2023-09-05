import React, { memo, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { apiGetOneCategory } from "apis/category";
import { apiGetDetailProduct } from "apis/product";

const Breadcrumb = () => {
    const location = useLocation();
    const params = useParams();
    const [title, setTitle] = useState("");
    const [cateName, setCateName] = useState("");
    const [productName, setProductName] = useState("");
    const initRoute = [
        { name: "Home", path: "/" },
        { name: "Collections", path: "/collections" },
    ];
    useEffect(() => {
        if (params.cid && !params.pid) {
            const temp = routes.slice(0, 3);
            setRoutes(temp);
        }
    }, [location]);
    const [routes, setRoutes] = useState(initRoute);
    const fetchCategory = async () => {
        if (params.cid) {
            const response = await apiGetOneCategory({
                pcid: location.pathname.split("/")[2],
            });
            if (response.success) setCateName(response?.response?.title);
        }
    };
    const fetchProduct = async () => {
        const response2 = await apiGetDetailProduct(params.pid);
        if (response2.success) {
            setProductName(response2?.product?.title);
        }
    };
    useEffect(() => {
        if (params.pid) {
            fetchCategory();
            fetchProduct();
        } else if (params.cid) {
            fetchCategory();
        } else setRoutes(initRoute);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.pid, params.cid]);
    useEffect(() => {
        if (cateName) {
            setRoutes([
                ...initRoute,
                { name: cateName, path: `${params.cid}` },
            ]);
            // setTitle(cateName);
        }
    }, [cateName]);
    useEffect(() => {
        if (productName)
            setRoutes([
                ...initRoute,
                { name: cateName, path: `${params.cid}` },
                { name: productName, path: "" },
            ]);
    }, [productName]);
    return (
        <div className="flex flex-col gap-5 pb-5 border-b-[2px] border-b-red-600 truncate">
            <span className="font-semibold">{title}</span>
            <div className="flex gap-1 items-center text-[14px]">
                {routes?.map((route, index) =>
                    index < routes.length - 1 ? (
                        <div className="flex gap-1 items-center" key={index}>
                            <Link className="hover:text-main" to={route.path}>
                                {route.name}
                            </Link>
                            <span className="text-[12px] font-semibold">/</span>
                        </div>
                    ) : (
                        <span
                            key={index}
                            className="font-medium text-gray-600 cursor-default"
                        >
                            {route.name}
                        </span>
                    )
                )}
            </div>
        </div>
    );
};

export default memo(Breadcrumb);
