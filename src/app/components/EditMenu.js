import React, { useState } from 'react'
import PrimaryBtn from './PrimaryBtn'
import { CgArrowLeft, CgCloseR } from 'react-icons/cg'
import { CiCamera } from "react-icons/ci";
import { useThemeContext } from '../context/theme';
import { IoClose } from 'react-icons/io5';


const EditMenu = () => {
  const { isEditMenuOpen, setIsEditMenuOpen } = useThemeContext()
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')
  const [isImageUploaded, setIsImageUploaded] = useState(false)
  const [formData, setFormData] = useState({
    imageURL: '',
    image: {},
    name: '',
    bio: '',
    phone: '',
    email: '',
    password: ''
  })
  const [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    setIsImageUploaded(true)
    setLastUpdated('file')
    setIsUploadPhotoOpen(false)
    // const newFormData = {...formData}
    // newFormData.image = e.target.files[0]
    // setFormData(newFormData)
  }
  const handleChange = (e) => {
    const { name, value} = e.target
    setFormData({...formData, [name]: value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formToSend = new FormData()
      // Agregar campos de texto al FormData
      formToSend.append('name', formData.name);
      formToSend.append('bio', formData.bio);
      formToSend.append('phone', formData.phone);
      formToSend.append('email', formData.email);
      formToSend.append('password', formData.password);
      // Agregar imagen al FormData
      if(formData.image){
        formToSend.append('image', formData.image);
      }
      
      const req = await fetch('api/upload', {
        method: 'POST',
        body: formToSend,
        
        })
        const res = await req.json()
        console.log(res)
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
    
  }
  const handleClick = () => {
    isEditMenuOpen ? setIsEditMenuOpen(false) : setIsEditMenuOpen(true)
  }
  const handleOpenUploadClick = () => {
    isUploadPhotoOpen ? setIsUploadPhotoOpen(false) : setIsUploadPhotoOpen(true)
  }
  const handleUploadClick = () => {
    if  (imageUrl){
      const newFormData = {...formData}
      newFormData.imageURL = imageUrl
      setFormData(newFormData)
      setIsUploadPhotoOpen(false)
    }

  }
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value)
    setLastUpdated('url')
  }
  return (
    
    <div className='flex w-full max-w-[600px] flex-col px-2 py-2 lg:mt-10'>
      {isUploadPhotoOpen && (
           <div className='fixed w-full h-full bg-gray-800/50 z-10 flex justify-center items-center top-0 left-0'>
                <div className='z-20 relative bg-white flex flex-col p-4 rounded-xl'>
                <IoClose className='w-4 h-4 self-end mb-6' onClick={() => {
                  setIsUploadPhotoOpen(false)
                }}/>
                <label htmlFor='image-upload' className='flex flex-col items-center gap-x-4 cursor-pointer mb-6'>
                <input className=' hidden' type='file' id='image-upload' onChange={handleImageChange}/>
                  <div className='flex items-center justify-center p-2 border-gray-400 border rounded bg-slate-100'>
                  {lastUpdated == 'file' && (
                    <>
                      <img src={URL.createObjectURL(imageFile)} className='w-12 h-12 rounded-lg lg:w-20 lg:h-20'/>
                      <CiCamera className='absolute w-8 h-8'/>
                    </>
                    )}
                    {lastUpdated == 'url' && (
                    <>
                        <img src={imageUrl} className='w-12 h-12 rounded-lg lg:w-20 lg:h-20'/>
                        <CiCamera className='absolute w-8 h-8'/>
                    </>
                    )}
                    {!imageFile && !imageUrl &&(
                    <>
                      <img src='./test-pic.png' className='w-12 h-12 rounded-lg lg:w-20 lg:h-20'/>
                      <CiCamera className='absolute w-8 h-8'/>
                </>)}
                   
                  </div>
                </label>      
                  <div className='items-center flex flex-col justify-center'>
                    <label className='mb-2'>Or paste a image URL</label>
                    <input type="text" name="image" className='p-1 border border-gray-400 rounded-lg' placeholder='Enter URL' value={imageUrl} onChange={handleImageUrlChange}/>
                  </div>
                  <button className='bg-blue-500 rounded-xl my-2 mt-6 py-1 text-white' onClick={handleUploadClick}>Upload</button>
              </div>
            </div>
        )}
      <button className='flex text-blue-400 gap-x-1 items-center mb-2' onClick={handleClick}><CgArrowLeft /> Back</button>
      <div className='flex flex-col w-full px-4 py-2 border border-gray-400 rounded-lg '>
      <form onSubmit={(e) => {
          handleSubmit(e)
        }}>
        <div className='mb-6 lg:p-2'>
          <h1 className='text-lg'>Change Info</h1>
          <h2 className='text-xs text-gray-400'>Changes will be reflected to every services</h2>
        </div>
        <div className='flex items-center gap-x-4 lg:px-4' onClick={handleOpenUploadClick}>
            <div className='flex relative items-center justify-center cursor-pointer' >
              {lastUpdated == 'file' && (
              <img src={URL.createObjectURL(imageFile)} className='w-12 h-12 rounded-lg lg:w-20 lg:h-20'/>
              )}
               {lastUpdated == 'url' && (
              <img src={imageUrl} className='w-12 h-12 rounded-lg lg:w-20 lg:h-20'/>
              )}
              {!imageFile && !imageUrl &&(<>
                <img src='./test-pic.png' className='w-12 h-12 rounded-lg lg:w-20 lg:h-20'/>
              </>)}
             
            </div>
            <span className='text-xs text-gray-600 font-semibold'>UPLOAD PHOTO</span>
        </div>
        <div className='mt-4 flex flex-col gap-y-4 lg:gap-y-6 lg:px-4 lg:w'>
          <div className='flex flex-col gap-y-1 lg:mt-2'>
            <label htmlFor='name' className='text-sm'>
              Name
            </label>
            <input id='name' name='name' placeholder='Enter your Name...' className='py-1 px-2 rounded-lg border border-gray-400 lg:px-4 lg:py-2' value={formData.name} onChange={handleChange}/>
          </div>
          <div  className='flex flex-col gap-y-1'>
            <label htmlFor='bio' className='text-sm'>
              Bio
            </label>
            <textarea id='bio' name='bio' placeholder='Enter your bio...' className='py-1 px-2 rounded-lg border border-gray-400 lg:px-4 lg:py-2'  value={formData.bio} onChange={handleChange}/>
          </div>
          <div  className='flex flex-col gap-y-1'>
            <label htmlFor='phone' className='text-sm'>
              Phone
            </label>
            <input id='phone' name='phone' placeholder='Enter your phone...' className='py-1 px-2 rounded-lg border border-gray-400 lg:px-4 lg:py-2'  value={formData.phone} onChange={handleChange}/>
          </div>
          <div  className='flex flex-col gap-y-1'>
            <label htmlFor='email' className='text-sm'>
              Email
            </label>
            <input id='email' name='email' placeholder='Enter your email...' className='py-1 px-2 rounded-lg border border-gray-400 lg:px-4 lg:py-2'  value={formData.email} onChange={handleChange}/>
          </div>
          <div  className='flex flex-col gap-y-1'>
            <label htmlFor='password' className='text-sm'>
              Password
            </label>
            <input id='password' name='password' placeholder='Enter your password...' className='py-1 px-2 rounded-lg border border-gray-400 lg:px-4 lg:py-2'  value={formData.password} onChange={handleChange}/>
          </div>
        </div>
        <button className='bg-blue-500 text-white w-full rounded-lg p-2 text-semibold mt-4 max-w-[80px] lg:mt-6 lg:mb-4 lg:mx-4'>Save</button>
      </form>
      </div>
    </div>
  )
}

export default EditMenu
