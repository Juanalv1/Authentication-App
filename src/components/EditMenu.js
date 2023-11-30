import React, { useState, useEffect } from 'react'
import PrimaryBtn from './PrimaryBtn'
import { CgArrowLeft, CgCloseR } from 'react-icons/cg'
import { CiCamera } from "react-icons/ci";
import { useThemeContext } from '../app/context/theme';
import { IoClose } from 'react-icons/io5';
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react';
 
const EditMenu = ({ isEditMenuOpen, setIsEditMenuOpen, user }) => {
  console.log(user)
  const { data: session } = useSession()
  const { handleSubmit, formState: {errors}, register, watch, unregister } = useForm()
  const imageFile = watch('image')
  const imageUrl = watch('imageUrl')

  useEffect(() => {
    if (imageFile) {
      setIsUploadPhotoOpen(false);
    }
  }, [imageFile]);
  

  const [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('file')
  const onSubmit = async (data) => {
    try {
      console.log('img', imageFile)
      console.log(data)
      const formData = new FormData();
      if (imageUrl) {
        formData.append("image", data.imageUrl);
      } else if (imageFile) {
        formData.append("image", data.image[0]);
      }
      if(data.name) {
        console.log('agregando nombre')
        formData.append("name", data.name)
      }
      if(data.bio) formData.append("bio", data.bio)
      if(data.email) formData.append("email", data.email)
      if(data.phone) formData.append("phone", data.phone)
      if(data.password) formData.append("password", data.password)
      if(session) formData.append("session", JSON.stringify(session))
      console.log([...formData.entries()]);
      const res = await fetch('/api/users', {
        method: "PATCH",
        body: formData,
      })
      const resJSON = await res.json()
      console.log(resJSON)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClick = () => {
    isEditMenuOpen ? setIsEditMenuOpen(false) : setIsEditMenuOpen(true)
  }
    
  return (
    
    <div className='flex w-full max-w-[600px] flex-col px-2 py-2 lg:mt-10'>



      <button className='flex text-blue-400 gap-x-1 items-center mb-2' onClick={handleClick}><CgArrowLeft /> Back</button>
      <div className='flex flex-col w-full px-4 py-2 border border-gray-400 rounded-lg '>
      <form onSubmit={handleSubmit(onSubmit)}>
      {isUploadPhotoOpen && (
           <div className='fixed w-full h-full bg-gray-800/50 z-10 flex justify-center items-center top-0 left-0'>
                <div className='z-20 relative bg-white flex flex-col p-4 rounded-xl'>
                <IoClose className='w-4 h-4 self-end mb-6' onClick={() => {
                  setIsUploadPhotoOpen(false)
                }}/>
                <label htmlFor='image-upload' className='flex flex-col items-center gap-x-4 cursor-pointer mb-6'>
                <input className=' hidden' type='file' id='image-upload' {...register('image')} />
                  <div className='flex items-center justify-center p-2 border-gray-400 border rounded bg-slate-100'>  
                      <CiCamera className='absolute w-8 h-8'/>
                      <img src='./test-pic.png' className='w-12 h-12 rounded-lg lg:w-20 lg:h-20'/>
                  </div>
                </label>      
                  <div className='items-center flex flex-col justify-center'>
                    <label className='mb-2'>Or paste a image URL</label>
                    <input type="text" className='p-1 border border-gray-400 rounded-lg' placeholder='Enter URL' {...register('imageUrl')}/>
                  </div>
                  <button className='bg-blue-500 rounded-xl my-2 mt-6 py-1 text-white' onClick={() => {
                    setLastUpdated('url')
                    setIsUploadPhotoOpen(false)
                    }}>Upload</button>
              </div>
            </div>
        )}
        <div className='mb-6 lg:p-2'>
          <h1 className='text-lg'>Change Info</h1>
          <h2 className='text-xs text-gray-400'>Changes will be reflected to every services</h2>
        </div>
        <div className='flex items-center gap-x-4 lg:px-4' onClick={() => {setIsUploadPhotoOpen(true)}}>
            <div className='flex relative items-center justify-center cursor-pointer gap-x-3' >
            {user?.img && !imageFile && lastUpdated === 'file' &&(<img src={user.img} alt="Uploaded File" className='w-12 h-12 rounded-lg lg:w-20 lg:h-20'/>) }
            {lastUpdated === 'file' && imageFile?.length >= 1 && (
            <img src={URL.createObjectURL(imageFile[0])} alt="Uploaded File" className='w-12 h-12 rounded-lg lg:w-20 lg:h-20'/>
            )}
            {lastUpdated === 'url' && (
            <img src={imageUrl} alt="Uploaded File" className='w-12 h-12 rounded-lg lg:w-20 lg:h-20'/>
            )}
            {!imageFile && !imageUrl && !user.img &&(
              <img src='./test-pic.png' alt="Uploaded File" className='w-12 h-12 rounded-lg lg:w-20 lg:h-20'/>
            )}
            <span className='text-xs text-gray-600 font-semibold'>UPLOAD PHOTO</span>
            </div>
        </div>
        <div className='mt-4 flex flex-col gap-y-4 lg:gap-y-6 lg:px-4 lg:w'>
          <div className='flex flex-col gap-y-1 lg:mt-2'>
            <label htmlFor='name' className='text-sm'>
              Name
            </label>
            <input type='text' placeholder='Enter your Name...' className='py-1 px-2 rounded-lg border border-gray-400 lg:px-4 lg:py-2' {...register('name')}/>
          </div>
          <div  className='flex flex-col gap-y-1'>
            <label htmlFor='bio' className='text-sm'>
              Bio
            </label>
            <input type='text' placeholder='Enter your bio...' className='py-1 px-2 rounded-lg border border-gray-400 lg:px-4 lg:py-2'{...register('bio')}/>
          </div>
          <div  className='flex flex-col gap-y-1'>
            <label htmlFor='phone' className='text-sm'>
              Phone
            </label>
            <input type='text' placeholder='Enter your phone...' className='py-1 px-2 rounded-lg border border-gray-400 lg:px-4 lg:py-2' {...register('phone')} />
          </div>
          <div  className='flex flex-col gap-y-1'>
            <label htmlFor='email' className='text-sm'>
              Email
            </label>
            <input type='email' placeholder='Enter your email...' className='py-1 px-2 rounded-lg border border-gray-400 lg:px-4 lg:py-2' {...register('email')} />
          </div>
          <div  className='flex flex-col gap-y-1'>
            <label htmlFor='password' className='text-sm'>
              Password
            </label>
            <input type='password' placeholder='Enter your password...' className='py-1 px-2 rounded-lg border border-gray-400 lg:px-4 lg:py-2' {...register('password')} />
          </div>
        </div>
        <button className='bg-blue-500 text-white w-full rounded-lg p-2 text-semibold mt-4 max-w-[80px] lg:mt-6 lg:mb-4 lg:mx-4'>Save</button>
      </form>
      </div>
    </div>
  )
}

export default EditMenu
