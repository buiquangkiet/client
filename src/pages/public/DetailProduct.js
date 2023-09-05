import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetDetailProduct, apiGetProducts } from "apis/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { NextIcon, PrevIcon } from "ultils/icons";
import ReactImageMagnify from "react-image-magnify";
import { getStars } from "ultils/helpers";
import { extraInfo } from "ultils/constaint";
import ProductInfo from "components/product/ProductInfo";
import RelatedProduct from "components/product/RelatedProduct";
import { useDispatch, useSelector } from "react-redux";
import { setDetail } from "app/productSlice";
import { apiAddToCart } from "apis/user";
import { updateCurrentUser } from "app/user/userSlice";
import Swal from "sweetalert2";
import { setModel } from "app/ProductModel";
import * as DOMPurify from 'dompurify';
import RightCart from "components/RightCart";
import { setLoading } from "app/appSlice";
const DetailProduct = () => {
    const { pid } = useParams();
    const navigate = useNavigate();
    const swiperRef = useRef();
    const [activeThumbnail, setActiveThumbnail] = useState();
    const [relatedProducts, setRelatedProducts] = useState();
    const [quantity, setQuantity] = useState(1);
    const [initVariant, setInitVariant] = useState();
    const [activeVariant, setActiveVariant] = useState();
    const detailProduct = useSelector((state) => state.product.detailProduct);
    const dispatch = useDispatch();
    const currentUser = JSON.parse(window.localStorage.getItem("persist:user"));
    const { width } = useSelector(state => state.app)
    const fetchProduct = async () => {
        dispatch(setLoading(true));
        const response = await apiGetDetailProduct(pid);
        if (response.success) {
            dispatch(setDetail(response.product));
        }

        const response2 = await apiGetProducts({
            category: response?.product?.category,
            limit: 10,
        });
        if (response2.success)
            setRelatedProducts(
                response2?.products?.filter((item) => item._id !== pid)
            );
        dispatch(setLoading(false));

    };
    useEffect(() => {
        fetchProduct();
        setQuantity(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid]);
    useEffect(() => {
        setInitVariant(detailProduct?.variants);
    }, [detailProduct]);
    useEffect(() => {
        if (initVariant)
            Object.keys(initVariant).forEach((label) => {
                setActiveVariant((prev) => ({
                    ...prev,
                    [label]: initVariant[label][0],
                }));
            });
    }, [initVariant]);
    const handleSetVariant = (label, variant) => {
        const obj = { ...activeVariant, [label]: variant };
        setActiveVariant(obj);
    };
    const handleAddToCart = async () => {
        if (currentUser.isLoggedIn === "false") {
            Swal.fire({
                title: "Opps",
                text: "You need to login to add to cart !",
                confirmButtonText: "Login",
                showCancelButton: true,
                cancelButtonText: "Cancel",
            }).then((rs) => {
                if (rs.isConfirmed) navigate("/login");
            });
        } else {
            const response = await apiAddToCart({
                pid: detailProduct._id,
                quantity: +quantity,
                variants: activeVariant,
            });

            if (response.success) {
                dispatch(updateCurrentUser(response.updateCart));
                Swal.fire(
                    response.success ? "Add To Cart Success" : "Add To Cart Failed",
                    response.message,
                    response.success ? "success" : "error"
                ).then(() => {
                    dispatch(setModel({ product: <RightCart /> }));
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: "Opps",
                    text: "Some Products Maybe Inavailable",
                    confirmButtonText: "Go To Cart",
                    showCancelButton: true,
                    cancelButtonText: "Cancel",
                }).then((rs) => {
                    if (rs.isConfirmed) navigate("/cart");
                });
            }
        }
    };
    return (
        <div className="w-full">
            {detailProduct ? (
                <div className="flex flex-col gap-5">
                    <div className={` py-5 w-full gap-8 ${width === 3 ? "grid grid-cols-5 " : "flex flex-col gap-5"}`}>
                        <div className="col-span-2 flex flex-col ">
                            <div className=" p-2 border h-full flex justify-center">
                                <div className="h-full flex items-center justify-center">
                                    {width === 3 ? <ReactImageMagnify
                                        {...{
                                            smallImage: {
                                                alt: "Wristwatch by Ted Baker London",
                                                isFluidWidth: true,
                                                src:
                                                    activeThumbnail ||
                                                    (detailProduct?.thumbnail?.path ? detailProduct?.thumbnail?.path : detailProduct?.thumbnail),
                                                width: 300,
                                                height: 450,
                                            },
                                            largeImage: {
                                                src:
                                                    activeThumbnail ||
                                                    (detailProduct?.thumbnail?.path ? detailProduct?.thumbnail?.path : detailProduct?.thumbnail),
                                                width: 1200,
                                                height: 1800,
                                            },
                                        }}
                                    /> : <img src={activeThumbnail ||
                                        (detailProduct?.thumbnail?.path ? detailProduct?.thumbnail?.path : detailProduct?.thumbnail)} className="w-full" alt="" />}
                                </div>
                            </div>
                            <div className="mt-5 w-full relative overflow-hidden ">
                                <Swiper
                                    slidesPerView={3}
                                    loop={true}
                                    spaceBetween={10}
                                    onBeforeInit={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                >
                                    {[detailProduct?.thumbnail.path ? detailProduct?.thumbnail.path : detailProduct?.thumbnail, ...detailProduct?.image].map((item) => (
                                        <SwiperSlide key={item._id}>
                                            <div
                                                className="p-2 border h-[150px] flex items-center justify-center bg-white"
                                                onClick={() =>
                                                    setActiveThumbnail(item.path ? item.path : item)
                                                }
                                            >
                                                <img
                                                    src={item.path ? item.path : item}
                                                    alt=""
                                                    className="h-fit"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <div
                                    onClick={() =>
                                        swiperRef.current?.slideNext()
                                    }
                                    className="absolute w-28 h-28 bg-[#fff9]/30 pl-1 hover:bg-white hover:border transition duration-300 rounded-full translate-x-[65%] flex justify-start items-center cursor-pointer top-2/4 right-[-4px] -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl"
                                >
                                    <NextIcon size={35} color="black" />
                                </div>
                                <div
                                    onClick={() =>
                                        swiperRef.current?.slidePrev()
                                    }
                                    className="absolute w-28 h-28 bg-[#fff9]/30 pr-1 hover:bg-white hover:border transition duration-300 rounded-full -translate-x-[65%] flex justify-end items-center cursor-pointer top-2/4 left-[-4px] -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl "
                                >
                                    <PrevIcon size={35} color="black" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col gap-4 px-5">
                            <p className="text-[30px] cursor-pointer font-semibold text-main">{detailProduct?.title}</p>
                            <p
                                className="text-[30px] font-medium cursor-pointer"
                                title={`$${(
                                    detailProduct.price * 0.000043
                                ).toFixed(2)}USD`}
                            >
                                {detailProduct.price.toLocaleString("vi-VN") +
                                    " VND"}
                            </p>

                            <div className="flex">
                                {getStars(detailProduct?.totalRating, 20).map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="text-yellow-500"
                                        >
                                            {item}
                                        </div>
                                    )
                                )}
                                <span>{detailProduct?.totalRating}</span>
                            </div>
                            <div className="flex items-center text-[14px] gap-2">
                                <span className="pr-2 border-r-[1px]">
                                    Quantity : {detailProduct?.quantity}
                                </span>
                                <span>Sold : {detailProduct?.sold}</span>
                            </div>
                            <ul className="list-disc ">
                                {detailProduct.description.length > 1 ? detailProduct?.description?.map((item, index) => (
                                    <li className="text-[15px] px-5" key={index}>
                                        {item}
                                    </li>
                                )) : <div className="text-[15px] text-justify line-clamp-[10] " dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detailProduct?.description[0]) }}></div>}
                            </ul>
                            <div className="flex flex-col gap-8">
                                {detailProduct?.variants &&
                                    activeVariant &&
                                    Object.keys(detailProduct?.variants)?.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 items-start"
                                            >
                                                <span className="font-medium w-[20%] flex-none">
                                                    {item}
                                                </span>
                                                <div className="flex gap-3 flex-auto flex-wrap">
                                                    {detailProduct?.variants[
                                                        item
                                                    ].map((variant, index) => (
                                                        <span
                                                            onClick={() =>
                                                                handleSetVariant(
                                                                    item,
                                                                    variant
                                                                )
                                                            }
                                                            key={index}
                                                            className={`px-3 py-1 border text-[15px] cursor-pointer ${variant ===
                                                                activeVariant[
                                                                item
                                                                ] &&
                                                                "border-red-600"
                                                                }`}
                                                        >
                                                            {variant}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                            <div className="flex gap-3 my-4 ">
                                <span className="w-[20%] font-medium flex-none">
                                    Quantity
                                </span>
                                <div className="flex border justify-center bg-gray-200 ">
                                    <button
                                        onClick={() =>
                                            quantity > 1 &&
                                            setQuantity(quantity - 1)
                                        }
                                        className="px-2 py-1 text-center cursor-pointer hover:bg-gray-700 hover:text-white duration-300"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className="w-[50px] outline-none border-x border-black h-full px-1 bg-gray-200"
                                        value={+quantity}
                                        onChange={(e) =>
                                            setQuantity(+e.target.value <= +detailProduct.quantity ? +e.target.value : +detailProduct.quantity)
                                        }
                                        max={+detailProduct?.quantity}
                                    />
                                    <button
                                        className="px-2 py-1 text-center cursor-pointer hover:bg-gray-700 hover:text-white duration-300"
                                        onClick={() => {
                                            if (!detailProduct || quantity < detailProduct.quantity) {
                                                setQuantity(+quantity + 1);
                                            }
                                        }}
                                        disabled={!detailProduct || quantity >= detailProduct.quantity}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-2 bg-main text-white text-[15px] font-medium rounded-sm hover:bg-black duration-300"
                            >
                                ADD TO CART
                            </button>
                        </div>
                        <div className={`col-span-1 flex flex-col gap-3 w-full ${width < 3 && "px-5"}`}>
                            {extraInfo.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-3 items-center w-full border px-3 py-1"
                                >
                                    <div className="p-2 bg-gray-700 text-white rounded-full">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col gap-1 text-[14px]">
                                        <span>{item.name}</span>
                                        <span className="text-[13px] text-gray-400">
                                            {item.sub}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ProductInfo
                        product={detailProduct}
                        info={detailProduct?.info}
                    />
                    <RelatedProduct products={relatedProducts} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default DetailProduct;
