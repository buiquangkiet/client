import { apiGetCurrent, apiUpdateUser } from 'apis/user';
import { setLoading } from 'app/appSlice';
import { updateCurrentUser } from 'app/user/userSlice';
import Input from 'components/admin/Input';
import moment from 'moment';
import React, { memo, useCallback } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getBase64, validateEmail, validatePhone } from 'ultils/helpers';
import { EditIcon, UserIcon } from 'ultils/icons';
import path from 'ultils/paths';

const Personal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState()
  const [currentUser, setCurrentUser] = useState();
  // const [updateUser, setUpdateUser] = useState();
  const { width } = useSelector(state => state.app);
  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true))
      const res = await apiGetCurrent();
      if (res.success) {
        dispatch(setLoading(false))
        if (res.response.role !== 4)
          navigate(path.PUBLIC);
        else {
          setCurrentUser(res.response);
        }
      } else {
        Swal.fire("Error", res.message, "error").then(() =>
          navigate(path.PUBLIC)
        );
      }
      dispatch(setLoading(false))

    };
    fetchUser();
  }, []);
  const handleAttribute = useCallback((field, value) => {
    setCurrentUser({ ...currentUser, [field]: value })
  }, [currentUser])

  const handleSubmit = async () => {
    if (!validateEmail(currentUser.email)) return Swal.fire("Error", "Invalid Email", "error");
    if (!validatePhone(currentUser.mobile)) return Swal.fire("Error", "Invalid Mobile", "error");
    if (!currentUser.firstname || !currentUser.lastname || !currentUser.email
      || !currentUser.mobile)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all fields',
      })
    else {
      const updateAttributes = {
        firstname: "",
        lastname: 0,
        email: 0,
        mobile: "",
        address:"",
        avatar: FileList,
      }
      Object.keys(updateAttributes).forEach(key => {
        updateAttributes[key] = currentUser[key]
      })
      const formData = new FormData();
      Object.keys(updateAttributes).forEach(key => {
        formData.append(key, updateAttributes[key])
      })
      dispatch(setLoading(true))
      const res = await apiUpdateUser(formData);
      if (res.success) {
        Swal.fire("Success", "Updated", "success").then(() => {
          setCurrentUser(res.updateUser);
          dispatch(updateCurrentUser(res.updateUser))
        })
      }
      else {
        Swal.fire("Error", "Something went wrong", "error")
      }
      dispatch(setLoading(false))
    }
  }
  return (
    <div className='p-8 flex flex-col gap-3 w-full'>
      <div className={`flex items-center ${width === 1 ? "flex-col" : " gap-[100px]"}`}>
        <div
          onClick={() => document.getElementById("input-file").click()}
          className='cursor-pointer  flex-none flex items-center justify-center rounded-full bg-gray-200 w-[168px] h-[168px] relative'>
          {previewImage ? <img src={previewImage} alt="Preview" className='w-full h-full rounded-full object-cover' />
            : currentUser?.avatar ? <img src={currentUser?.avatar?.path} alt="Preview" className='w-full h-full object-cover rounded-full' /> :
              <UserIcon size={50} />}
          <div className='absolute bottom-0 right-0'>
            <EditIcon size={25} className='' />
            <input type="file" id="input-file" className='hidden' onChange={(e) => {
              setCurrentUser({ ...currentUser, avatar: e.target.files[0] })
              getBase64(e.target.files[0]).then((data) => setPreviewImage(data))
            }} />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full flex-auto">
          <Input
            label="First Name"
            handleAttribute={handleAttribute}
            field="firstname"
            value={currentUser?.firstname}
            required={true}
          />
          <Input
            label="Last Name"
            handleAttribute={handleAttribute}
            field="lastname"
            value={currentUser?.lastname}
            required={true}
          />
        </div>
      </div>
      <div className={`flex items-center gap-5 ${width === 1 ? "flex-col" : ""}`}>
        <Input
          label="Email"
          handleAttribute={handleAttribute}
          field="email"
          value={currentUser?.email}
          required={true}
          disabled={true}
        />
        <Input
          label="Mobile Phone"
          handleAttribute={handleAttribute}
          field="mobile"
          value={currentUser?.mobile}
          required={true}
        />
      </div>
      <Input
          label="Address"
          handleAttribute={handleAttribute}
          field="address"
          value={currentUser?.address}
          required={true}
        />
      <div className='flex items-center gap-2'>
        <span className='font-semibold'>Account Status : </span>
        <span>{currentUser?.isBlocked ? "Blocked" : "Active"}</span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='font-semibold'>Role : </span>
        <span>{currentUser?.role === 4 ? "User" : "Admin"}</span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='font-semibold'>Created At : </span>
        <span>{moment(currentUser?.createdAt).format("DD/MM/YYYY")}</span>
      </div>
      <button onClick={handleSubmit} className='px-4 py-2 w-fit bg-main text-white rounded-md my-5'>Update</button>
    </div >
  )
}

export default memo(Personal)
