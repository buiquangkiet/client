import { apiGetCategory } from 'apis/app'
import { apiCreateProduct } from 'apis/product'
import { setLoading } from 'app/appSlice'
import Input from 'components/admin/Input'
import MarkdownEditor from 'components/admin/MarkdownEditor'
import Filter from 'components/collection/Filter'
import React, { memo, useState } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { getBase64 } from 'ultils/helpers'
import { variants } from 'ultils/constaint'
import { useRef } from 'react'
const CreateProduct = () => {
  const dispatch = useDispatch()
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    quantity: 0,
    variants: {},
    category: '',
    brand: '',
    description: '',
    thumb: FileList,
    image: FileList,
  })
  const [selected, setSelected] = useState({});
  const [category, setCategory] = useState();
  const [previewImage, setPreviewImage] = useState({
    thumb: '',
    image: []
  });
  useEffect(() => {
    const fetchCate = async () => {
      const res = await apiGetCategory();
      if (res.success) setCategory(res.response.filter(
        (item) => item.title !== "Camera" && item.title !== "Speaker"
      ))
    }
    fetchCate()
  }, [])
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
    if (!product.title || !product.price || !product.quantity
      || !product.category || !product.brand || product.image.length === 0 || product.thumb.length === 0)

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all fields',
      })
    else {
      const formData = new FormData();
      // product.image.append()
      Object.keys(product).forEach(key => {
        key !== 'image' && key !== 'variants' && formData.append(key, product[key])
      })
      for (let image of product.image) formData.append('image', image)

      Object.keys(product.variants).forEach(variant => {
        const variantValue = product.variants[variant];
        if (variantValue.length === 1) {
          formData.append(`variants.${variant}`, variantValue);
        } else {
          for (let key of product.variants[variant])
            formData.append(`variants.${variant}`, key)
        }
      });
      dispatch(setLoading(true))
      const res = await apiCreateProduct(formData);
      if (res.success) {
        Swal.fire("Success", "Created Product", "success").then(() =>
          setProduct({
            title: '',
            price: 0,
            quantity: 0,
            variants: {},
            category: '',
            brand: '',
            description: '',
            thumb: FileList,
            image: FileList
          }))
        setPreviewImage({
          thumb: '',
          image: []
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
          <Input label="Category" handleAttribute={handleAttribute} field="category" select value={category?.map(item => item?.title)} required={true} />
          <Input label="Brand" handleAttribute={handleAttribute} field="brand" value={category?.filter(item => item.title === product.category)?.map(item2 => item2.brand)[0]} select required={true} />
        </div>

        <Filter variants={variants} selected={selected}
          setSelected={setSelected} isCreate={true} />

        <MarkdownEditor field="description" value={product.description} onSubmit={handleAttribute} label="Description" />
        <div className='flex flex-col gap-4 my-5'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Thumbnail</label>
            <input
              onChange={(e) => {
                setProduct({ ...product, thumb: e.target.files[0] })
                getBase64(e.target.files[0]).then((data) => setPreviewImage({ ...previewImage, thumb: data }))
              }}
              type="file" />
            {previewImage.thumb && (
              <div className="flex flex-col gap-2">
                <div className="image-container">
                  <img className="h-[300px] object-cover" src={previewImage.thumb} alt="Preview" />
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
            <div className="flex  gap-4 items-center">
              {previewImage.image.length > 0 && (
                previewImage?.image?.map((item, index) => (
                  <div className="flex flex-col gap-2" key={index}>
                    <div className=" relative">
                      <img className="h-[200px] max-w-[500px] object-cover" src={item.path} alt="Preview" />

                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <button className='px-4 py-2 w-fit bg-main text-white rounded-md my-5' onClick={handleSubmit}>Create New Product</button>
      </div>
    </div >
  )
}

export default memo(CreateProduct)
