import axios from "../axios";

export const apiCreateOrder = (data) => {
    return axios({
        url: "order",
        method: "post",
        data,
    });
};

export const apiSendOTP = (email) => {
    return axios({
        url: "order/getOTP/" + email,
        method: "get",
    });
};
export const apiGetOrder = (_id) => {
    return axios({
        url: "order/get-one/" + _id,
        method: "get",
    });
};

export const apiCancelOrder = (_id, data) => {
    return axios({
        url: "order/cancel/" + _id,
        method: "put",
        data
    });
};

export const apiGetOrders = (params) => {
    return axios({
        url: "order/getall/",
        method: "get",
        params,
        withCredentials: true,
    });
};

export const apiUpdateStatus = (_id, data) => {
    return axios({
        url: "order/" + _id,
        method: "put",
        data
    });
};