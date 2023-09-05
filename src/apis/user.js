import axios from "../axios";

export const apiRegister = (data) => {
    return axios({
        url: `user/register`,
        method: "post",
        data,
        withCredentials: true,
    });
};
export const apiConfirmOTP = (data) => {
    return axios({
        url: `user/confirm`,
        method: "post",
        data,
    });
};
export const apiLogin = (data) => {
    return axios({
        url: `user/login`,
        method: "post",
        data,
    });
};

export const apiForgotPassword = (data) => {
    return axios({
        url: `user/forgot`,
        method: "post",
        data,
    });
};
export const apiResetPassword = (data) => {
    return axios({
        url: `user/resetpassword`,
        method: "put",
        data,
    });
};

export const apiGetCurrent = () => {
    return axios({
        url: `user/current`,
        method: "get",
    });
};
export const apiAddToCart = (data) => {
    return axios({
        url: `user/addtocart`,
        method: "put",
        data,
    });
};
export const apiUpdateCart = (data) => {
    return axios({
        url: `user/updatecart`,
        method: "put",
        data,
    });
};

export const apiGetUsers = (data) => {
    return axios({
        url: `user`,
        method: "get",
        params: data,
    });
};
export const apiUpdateUserByAdmin = (data) => {
    return axios({
        url: `user`,
        method: "put",
        data,
    });
}
export const apiDeleteUser = (_id) => {
    return axios({
        url: `user`,
        method: "delete",
        params: { _id },
    });
};

export const apiUpdateUser = (data)=>{
    return axios({
        url: `user`,
        method: "put",
        data,
    });
}