import axios from "../axios";

export const apiGetOneCategory = ({ pcid }) => {
    return axios({
        url: `product-category/${pcid}`,
        method: "get",
    });
};
