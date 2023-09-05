const path = {
    PUBLIC: "/",
    HOME: "",
    ALL: "*",
    LOGIN: "login",
    OUT_SERVICES: "services",
    PRODUCTS: "products",
    BLOGS: "blogs",
    FAQ: "faq",
    CONFIRM_REGISTRATION: "confirm/:state",
    RESET_PASSWORD: "resetpassword/:token",
    COLLECTION: "",
    COLLECTIONS: "collections",
    DETAIL_COLLECTION: ":cid",
    DETAIL_PRODUCT: "products/:pid",
    getDetailProduct: (pid) => `products/${pid}`,
    CART: "cart",

    //admin
    ADMIN: "admin",
    DASHBOARD: "dashboard",
    CREATE_PRODUCT: "create-product",
    MANAGE_ORDERS: "manage-orders",
    MANAGE_PRODUCTS: "manage-products",
    MANAGE_USERS: "manage-users",
    EDIT_PRODUCT: "edit-product/:pid",
    //member
    MEMBER: "member",
    PERSONAL: "personal",
    MY_PURCHASES: "my-purchases",
};
export default path;
