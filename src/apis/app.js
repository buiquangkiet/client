import axios from "../axios";

export const apiGetCategory = () => {
    return axios({
        url: "product-category/",
        method: "get",
    });
};
