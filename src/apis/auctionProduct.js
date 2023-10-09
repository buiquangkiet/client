import axios from "../axios";

export const apiCreateAuctionProduct = (data) => {
    return axios({
        url: `auction`,
        method: "post",
        data,
    });
};

export const apiGetAuctionProducts = (params) => {
    return axios({
        url: "auction",
        method: "get",
        params,
    });
};
export const apiGetDetailAuctionProduct = (pid) => {
    return axios({
        url: `auction/${pid}`,
        method: "get",
    });
};

export const apiBidProduct = (data) => {
    return axios({
        url: `auction/bid`,
        method: "post",
        data,
        withCredentials: true,
    });
};
// export const apiCreateAuctionProduct = (data) => {
//     return axios({
//         url: `product`,
//         method: "post",
//         data,
//     });
// };

export const apiDeleteAuctionProduct = (data) => {
    return axios({
        url: `auction/${data}`,
        method: "delete",
        // data,
    });
};

export const apiUpdateAuctionProduct = (param, data) => {
    return axios({
        url: `auction/${param}`,
        method: "put",
        data,
    });
};