import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
    Blog,
    DetailProduct,
    FAQ,
    Home,
    Products,
    Public,
    Services,
} from "./pages/public";
import path from "./ultils/paths";
import LoginPage from "./pages/public/Login";
import ResetPassword from "./pages/public/ResetPassword";
import Collections from "./pages/public/Collections";
import Collection from "./components/collection/Collection";
import DetailCollection from "./components/collection/DetailCollection";
import ScrollToTop from "./ultils/ScrollToTop";
import FilterCollection from "components/collection/FilterCollection";
import Cart from "pages/public/Cart";
import {
    AdminLayout,
    CreateProduct,
    Dashboard,
    ManageOrders,
    ManageProducts,
    ManageUsers,
} from "pages/admin";
import { MemberLayout, Personal } from "pages/private";
import Loading from "components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import Model from "components/common/Model";
import EditProduct from "pages/admin/EditProduct";
import Purchases from "pages/private/Purchases";
import { getCurrent } from "app/user/asyncAction";
import { setWidth } from "app/appSlice";
import { offModel } from "app/ProductModel";
import AuctionProducts from "pages/public/AuctionProducts";
import DetailAuctionProduct from "pages/public/DetailAuctionProduct";
import MyAuctions from "pages/private/MyAuctions";
import Checkout from "pages/public/Checkout";
import SearchOrder from "pages/public/SearchOrder";
import CreateAuctionProduct from "pages/admin/CreateAuctionProduct";
import ManageAuctionProducts from "pages/admin/ManageAuctionProducts";
import EditAuctionProduct from "pages/admin/EditAuctionProduct";

function App() {
    const { isLoading } = useSelector(state => state.app);
    const model = useSelector((state) => state.model);
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.user);
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
    const setWidthFunction = (e) => {
        setCurrentWidth(e.target.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", setWidthFunction);
        return () => {
            window.removeEventListener("resize", setWidthFunction);
        };
    });
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrent());
        }, 300);
        return () => {
            clearTimeout(timeoutId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, dispatch]);
    useEffect(() => {
        if (currentWidth <= 600) dispatch(setWidth(1));
        else if (currentWidth <= 992) dispatch(setWidth(2))
        else dispatch(setWidth(3))
    }, [currentWidth]);

    const myFunction = () => {
        dispatch(offModel())
    };

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape') {
                event.preventDefault();
                myFunction();
            }
        };

        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    return (
        <div className="font-main font-light">

            {isLoading && <Loading />}
            {model.isShow && <Model children={model?.product} />}

            <ScrollToTop />
            <Routes>
                <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={path.LOGIN} element={<LoginPage />} />
                <Route path={path.ADMIN} element={<AdminLayout />}>
                    <Route path={path.DASHBOARD} element={<Dashboard />} />
                    <Route
                        path={path.CREATE_PRODUCT}
                        element={<CreateProduct />}
                    />
                    <Route
                        path={path.CREATE_AUCTION_PRODUCT}
                        element={<CreateAuctionProduct />}
                    />
                    <Route
                        path={path.MANAGE_AUCTION_PRODUCTS}
                        element={<ManageAuctionProducts />}
                    />
                    <Route
                        path={path.MANAGE_ORDERS}
                        element={<ManageOrders />}
                    />
                    <Route
                        path={path.MANAGE_PRODUCTS}
                        element={<ManageProducts />}
                    />
                    <Route path={path.MANAGE_USERS} element={<ManageUsers />} />
                    <Route path={path.EDIT_PRODUCT} element={<EditProduct />} />
                    <Route path={path.EDIT_AUCTION_PRODUCT} element={<EditAuctionProduct />} />
                </Route>
                <Route path={path.MEMBER} element={<MemberLayout />}>
                    <Route path={path.PERSONAL} element={<Personal />} />
                    <Route path={path.MY_PURCHASES} element={<Purchases />} />
                    <Route path={path.MY_AUCTION} element={< MyAuctions />} />
                </Route>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.ALL} element={<Home />} />
                    <Route path={path.CHECK_OUT} element={<Checkout />} />
                    <Route path={path.SEARCH_ORDER} element={<SearchOrder />} />
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.BLOGS} element={<Blog />} />
                    <Route path={path.CART} element={<Cart />} />
                    <Route path={path.PRODUCTS} element={<Products />} />
                    <Route path={path.FAQ} element={<FAQ />} />
                    <Route path={path.OUT_SERVICES} element={<Services />} />
                    <Route path={path.COLLECTIONS} element={<Collections />}>
                        <Route
                            path={path.COLLECTION}
                            element={<Collection />}
                        />
                        <Route
                            path={path.DETAIL_COLLECTION}
                            element={<DetailCollection />}
                        >
                            <Route
                                path={path.DETAIL_PRODUCT}
                                element={<DetailProduct />}
                            />
                            <Route
                                path={path.COLLECTION}
                                element={<FilterCollection />}
                            />
                        </Route>
                    </Route>
                    <Route path={path.AUCTION_PRODUCTS} element={<AuctionProducts />}> </Route>
                    <Route path={path.DETAIL_AUCTION_PRODUCT} element={<DetailAuctionProduct />}>

                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
