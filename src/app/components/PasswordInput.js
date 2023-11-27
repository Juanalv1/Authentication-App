import React from 'react'
import { IoMdLock } from "react-icons/io";

const PasswordInput = ({formData, handleChange, setFormData}) => {
  return (
    <div className='flex items-center p-2.5 border border-gray-300 rounded-lg gap-x-4'>
        <IoMdLock className='w-6 h-6 text-[#828282]'/>
        <input type='text' className='w-full outline-none' placeholder='Password' name='password' onChange={handleChange} value={formData.password}/>
    </div>
  )
}

export default PasswordInput
