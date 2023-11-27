import React from 'react'
import { IoMail } from "react-icons/io5";

const EmailInput = ({formData, handleChange, setFormData}) => {
  return (
      <div className='flex items-center p-2.5 border border-gray-300 rounded-lg gap-x-4'>
          <IoMail className='w-6 h-6 text-gray-500'/>
          <input type='email' className='w-full outline-none' placeholder='Email' name='email' onChange={handleChange} value={formData.email}/>
      </div>
  )
}

export default EmailInput
