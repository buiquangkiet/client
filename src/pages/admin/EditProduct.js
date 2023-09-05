import { apiGetCategory } from 'apis/app';
import { apiGetDetailProduct, apiUpdateProduct } from 'apis/product';
import { setLoading } from 'app/appSlice';
import Input from 'components/admin/Input';
import MarkdownEditor from 'components/admin/MarkdownEditor';
import Filter from 'components/collection/Filter';
import React from 'react'
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { variants } from 'ultils/constaint'
import { getBase64 } from 'ultils/helpers';

const EditProduct = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();
    const pid = location.pathname.split('/')[location.pathname.split('/').length - 1]
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState();
    const [selected, setSelected] = useState({});
    const [previewImage, setPreviewImage] = useState({
        thumb: '',
        image: []
    });
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await apiGetDetailProduct(pid);
            if (response.success) {
                setProduct(response.product);
                setSelected(response.product.variants);
                setPreviewImage({
                    thumb: response.product.thumbnail,
                    image: response.product.image
                })
            }
        }
        const fetchCate = async () => {
            const res = await apiGetCategory();
            if (res.success) setCategory(res.response.filter(
                (item) => item.title !== "Camera" && item.title !== "Speaker"
            ))
        }
        fetchCate()
        fetchProduct();
    }, [location, pid])

    const handleAttribute = useCallback((field, value) => {
        setProduct({ ...product, [field]: value })
    }, [product])

    useEffect(() => {
        function removeEmptyArrayFields(obj) {
            const result = {};
            obj &&
                Object.keys(obj).forEach((key) => {
                    if (Array.isArray(obj[key]) && obj[key].length > 0) {
                        result[key] = obj[key];
                    }
                });
            return result;
        }
        const filteredData = removeEmptyArrayFields(selected);
        const formattedData = {};

        Object.keys(filteredData).forEach(
            (key) => (formattedData[`variants.${key}`] = filteredData[key])
        );
        setProduct({ ...product, variants: filteredData })
    }, [selected])
    const handleSubmit = async () => {
        product.category = product.category.title;
        if (!product.title || !product.price || !product.quantity
            || !product.category || !product.brand)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all fields',
            })
        else {
            const updateAttributes = {
                title: "",
                price: 0,
                quantity: 0,
                variants: {},
                category: '',
                brand: '',
                description: '',
                thumb: FileList,
                image: FileList,
            }
            Object.keys(updateAttributes).forEach(key => {
                updateAttributes[key] = product[key]
            })
            const formData = new FormData();
            Object.keys(updateAttributes).forEach(key => {
                key !== 'image' && key !== 'variants' && formData.append(key, updateAttributes[key])
            })
            if (updateAttributes.image && updateAttributes.image.length > 0) {
                for (let image of updateAttributes.image) formData.append('image', image)
            }
            updateAttributes.variants && Object.keys(updateAttributes.variants).forEach(variant => {
                const variantValue = updateAttributes?.variants[variant];
                if (variantValue.length === 1) {
                    formData.append(`variants.${variant}`, variantValue);
                } else {
                    for (let key of updateAttributes.variants[variant])
                        formData.append(`variants.${variant}`, key)
                }
            });
            dispatch(setLoading(true))
            const res = await apiUpdateProduct(pid, formData);
            if (res.success) {
                Swal.fire("Success", "Updated Product", "success").then(() => {
                    navigate(-1);
                })
            }
            else {
                Swal.fire("Error", "Something went wrong", "error")
            }
            dispatch(setLoading(false))
        }
    }
    return (
        <div className="container mx-auto p-4 text-left ">
            <div className="font-semibold text-[20px] my-5 mb-8">
                Create Product
            </div>
            <div className="flex flex-col">
                <Input label="Product Name" handleAttribute={handleAttribute} field="title" value={product.title} required={true} />
                <div className="grid grid-cols-4 gap-5">
                    <Input label="Price" handleAttribute={handleAttribute} field="price" value={+product.price} number={true} required={true} />
                    <Input label="Quantity" handleAttribute={handleAttribute} field="quantity" value={+product.quantity} number={true} required={true} />
                    <Input
                        label="Category"
                        handleAttribute={handleAttribute}
                        field="category"
                        select
                        value={category?.map(item => item?.title)}
                        selected={product?.category?.title} required={true} />
                    <Input
                        label="Brand"
                        handleAttribute={handleAttribute}
                        field="brand" value={product?.category?.brand}
                        selected={product?.brand}
                        select
                        required={true}
                    />

                </div>
                <Filter variants={variants} selected={selected}
                    setSelected={setSelected} isCreate={true} />
                <MarkdownEditor
                    field="description"
                    value={Array.isArray(product.description) ? product.description.join('\n') : product.description}
                    onSubmit={handleAttribute}
                    label="Description" />
                <div className='flex flex-col gap-2'>
                    <label className='font-semibold'>Thumbnail</label>
                    <input
                        onChange={(e) => {
                            setProduct({ ...product, thumb: e.target.files[0] })
                            getBase64(e.target.files[0]).then((data) =>
                                setPreviewImage({ ...previewImage, thumb: data }))
                        }
                        }
                        type="file"
                    />
                    {previewImage.thumb && (
                        <div className="flex flex-col gap-2">
                            <div className="image-container">
                                <img className=" h-[300px] object-cover"
                                    src={previewImage.thumb.path ? previewImage.thumb.path : previewImage.thumb}
                                    alt="Preview"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-semibold'>More Images</label>
                    <input type="file" multiple onChange={async (e) => {
                        let imgs = []
                        for (let file of e.target.files) {
                            if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
                                Swal.fire("Error", "Only image files are allowed", "error");
                                return
                            }
                            const res = await getBase64(file);
                            imgs.push({ name: file.name, path: res })
                        }
                        setPreviewImage({ ...previewImage, image: imgs })
                        setProduct({ ...product, image: e.target.files })
                    }} />
                    <div className="flex flex-wrap gap-8 items-center">
                        {previewImage?.image?.length > 0 && (
                            previewImage?.image?.map((item, index) => (
                                <div className="image-container p-3 border" key={index}>
                                    <img className=" h-[200px] max-w-[500px] object-cover" src={item.path ? item.path : item} alt="Preview" />
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <button className='px-4 py-2 w-fit bg-main text-white rounded-md my-5' onClick={handleSubmit}>Update This Product</button>

            </div>
        </div>

    )
}

export default EditProduct
