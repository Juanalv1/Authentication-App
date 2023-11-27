import { useState } from 'react'
import React from 'react'
import EmailInput from '../components/EmailInput'
import PasswordInput from '../components/PasswordInput'
import PrimaryBtn from '../components/PrimaryBtn'
import SocialLoginList from '../components/SocialLoginList'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Credits from '../components/Credits'

const Login = () => {
  const [formData, setFormData] = useState(
    {
      email: '',
      password: '',
    })
    const handleChange = (e) => {
      console.log(e.target)
      const { name, value} = e.target
      setFormData({...formData, [name]: value})
    }
    const handleSubmit = async () => {
      if(formData.email && formData.password){
        try{
          console.log('este es el form', formData)
          const req = await fetch('/api/users', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const res = await req.json()
          console.log(res)
        }catch(e){
          console.error(e)
        }
      }
      
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='max-w-[470px] rounded-xl border border-gray-500 md:p-4'>
      <Navbar />
      <div className='p-4'>
        <div className='text-primary w-full pr-4'>
          <h1 className='font-lg font-semibold text-lg ml-2'>Login</h1>
        </div>
        <div className='mt-6 w-full flex flex-col gap-y-3'>
        <EmailInput formData={formData} handleChange={handleChange} setFormData={setFormData}/>
        <PasswordInput formData={formData} handleChange={handleChange} setFormData={setFormData}/>
        <button className='bg-blue-500 text-white w-full rounded-lg p-2 text-semibold mt-4' onClick={handleSubmit}>Start coding now</button>
        </div>
        <div className='flex flex-col items-center w-full text-gray-400 mt-8 pb-6'> 
         <p className='text-sm mb-4'>or continue with these social profile</p>
         <SocialLoginList />
         <p className='text-sm mt-4'>Dont have an account yet? <Link href={'/register'} className='text-blue-400'>Register</Link></p>
        </div>
        <Credits />
      </div>
      </div>
    </div>
  )
}
}
export default Login
