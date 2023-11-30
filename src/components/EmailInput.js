import React from 'react'
import { IoMail } from "react-icons/io5";
import { useForm } from 'react-hook-form'

const EmailInput = ({ errors, register }) => {

  return (
      <div className='flex items-center p-2.5 border border-gray-300 rounded-lg gap-x-4'>

          <IoMail className='w-6 h-6 text-gray-500'/>
          <input type='text' className='w-full outline-none' placeholder='Email'{...(register("email", {
            required: "this field is required",
          }))}/>
      </div>
  )
}

export default EmailInput
