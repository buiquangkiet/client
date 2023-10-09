import { StarFillIcon, StarOutlineIcon } from "./icons";
import CryptoJS from 'crypto-js'
const secretKey = "gefnp9af6p2ktnlx6np98fqq"
export const getStars = (num, size) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < num) stars.push(<StarFillIcon size={size} />);
        else stars.push(<StarOutlineIcon size={size} />);
    }
    return stars;
};
export const reviewStars = (num, size) => {
    const stars = [];
    // console.log(num);
    for (let i = 0; i < num; i++) {
        stars.push(<StarFillIcon size={size} />);
    }
    return stars
};

export const getBase64 = (file) => {
    if (!file) return ''
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export const validateEmail = (email) => {
    const regex = /.*@gmail\.com$/;
    return regex.test(email)
}
export const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone)
}
export const encrypt = (password = '') => {
    var encodePassword = CryptoJS.AES.encrypt(password, secretKey);
    return encodePassword.toString();
}
export const decryptPassword = (password = '') => {
    var code = CryptoJS.AES.decrypt(password, secretKey);
    var decryptedPassword = code.toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
}
export const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
    const year = String(date.getFullYear()).slice(2); // Get the last two digits of the year

    return `${day}/${month}/${year}`;
}