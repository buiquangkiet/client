import axios from "../axios";

export const apiGetProducts = (params) => {
    return axios({
        url: "product",
        method: "get",
        params,
    });
};
export const apiGetDetailProduct = (pid) => {
    return axios({
        url: `product/${pid}`,
        method: "get",
    });
};
export const apiRatingProduct = (data) => {
    return axios({
        url: `product/rating`,
        method: "post",
        data,
        withCredentials: true,
    });
};
export const apiCreateProduct = (data) => {
    return axios({
        url: `product`,
        method: "post",
        data,
    });
};

export const apiDeleteProduct = (data) => {
    return axios({
        url: `product/${data}`,
        method: "delete",
        // data,
    });
};

export const apiUpdateProduct = (param, data) => {
    return axios({
        url: `product/${param}`,
        method: "put",
        data,
    });
};