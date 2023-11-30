import React from 'react'
import { IoMdLock } from "react-icons/io";
import { useForm } from 'react-hook-form'

const PasswordInput = ({ errors, register }) => {
  return (
    <div className='flex items-center p-2.5 border border-gray-300 rounded-lg gap-x-4'>
        <IoMdLock className='w-6 h-6 text-[#828282]'/>
        <input className='w-full outline-none' placeholder='Password' type='texts'  {...(register("password", {
            required: "this field is required",
          }))}/>
    </div>
  )
}

export default PasswordInput
