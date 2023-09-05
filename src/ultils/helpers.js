import { StarFillIcon, StarOutlineIcon } from "./icons";

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