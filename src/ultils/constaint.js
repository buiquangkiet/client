import {
    CameraIcon,
    GiftIcon,
    HeadphonesIcon,
    LaptopIcon,
    PrinterIcon,
    ReturnArrowIcon,
    ShieldIcon,
    ShippingIcon,
    SmartphoneIcon,
    SpeakerIcon,
    TableIcon,
    TelephoneIcon,
    TvIcon,
} from "./icons";
import path from "./paths";

export const navItems = [
    {
        name: "Home",
        path: path.HOME,
    },
    {
        name: "Products",
        path: path.PRODUCTS,
    },
    {
        name: "Auction Product",
        path: path.AUCTION_PRODUCTS,
    },
    {
        name: "Search Your Orders",
        path: path.SEARCH_ORDER,
    },
    {
        name: "Out Services",
        path: path.OUT_SERVICES,
    },
    {
        name: "FAQ",
        path: path.FAQ,
    },
];
export const navItemsMobile = [
    {
        name: "Home",
        path: path.HOME,
    },
    {
        name: "Products",
        path: path.PRODUCTS,
    },
    {
        name: "Auction",
        path: path.AUCTION_PRODUCTS,
    },
    {
        name: "SearchOrders",
        path: path.SEARCH_ORDER,
    },
    {
        name: "Services",
        path: path.OUT_SERVICES,
    },
    {
        name: "FAQ",
        path: path.FAQ,
    },
];
export const categories = [
    {
        icon: <CameraIcon />,
    },
    {
        icon: <HeadphonesIcon />,
    },
    {
        icon: <LaptopIcon />,
    },
    {
        icon: <PrinterIcon />,
    },
    {
        icon: <SmartphoneIcon />,
    },
    {
        icon: <SpeakerIcon />,
    },
    {
        icon: <TableIcon />,
    },
    {
        icon: <TvIcon />,
    },


];

export const extraInfo = [
    { name: "Guarantee", sub: "Quality Checked", icon: <ShieldIcon /> },
    {
        name: "Free Shipping",
        sub: "Free On All Products",
        icon: <ShippingIcon />,
    },
    {
        name: "Special Gift Cards",
        sub: "Special Gift Cards",
        icon: <GiftIcon />,
    },
    { name: "Free Return", sub: "Within 7 Days", icon: <ReturnArrowIcon /> },
    { name: "Consultancy", sub: "Lifetime 24/7/356", icon: <TelephoneIcon /> },
];

export const variants = {
    Capacity: ['128GB', '16GB', '32GB', '64GB'],
    Color: ['BLACK', 'BLACK LEATHER', 'BLACK METAL', 'BLUE',
        'CAMELLIA RED', 'CARBON GRAY', 'CERAMIC', 'DAZZLING WHITE',
        'DEEP PINK', 'FOREST BLUE', 'GLACIER SILVER', 'GOLD', 'GRAY',
        'GREY', 'MINERAL BLACK', 'NAVY BLUE', 'PLATINUM', 'QUITE BLACK',
        'REALLY BLUE', 'RED', 'ROSE GOLD', 'SILVER', 'WHITE'],
    Type: ['EDITION', 'SPORT'],
    Traps: ['42MM', '46MM'], Strap: ['38MM', '42MM'],
    Size: ['128GB', '16GB', '32GB', '64GB', 'LARGE'],
    Ram: ['2GB', '3GB'],
    Internal: ['128GB', '12GB', '16GB', '256GB', '32GB', '64GB']
}