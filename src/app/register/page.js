"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SocialLoginLogo from '../components/SocialLoginLogo';
import Link from 'next/link';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import PrimaryBtn from '../components/PrimaryBtn';
import SocialLoginList from '../components/SocialLoginList';
import Credits from '../components/Credits';

const page = () => {
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
    
  }
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
    <div className='max-w-[470px] rounded-xl border border-gray-500 md:p-4'>
    <Navbar />
    <div className='p-4'>
      <div className='text-primary w-full pr-4'>
        <h1 className='font-lg font-semibold text-lg mb-4'>
         Join thousands of learners from around the world
        </h1>
        <h2 className='font-xs font-normal'>
          Master web development by making real-life projects. There are multiple paths for you to choose
        </h2>
      </div>
      <div className='mt-10 w-full flex flex-col gap-y-3'>
        <EmailInput formData={formData} handleChange={handleChange} setFormData={setFormData}/>
        <PasswordInput formData={formData} handleChange={handleChange} setFormData={setFormData}/>
        <button className='bg-blue-500 text-white w-full rounded-lg p-2 text-semibold mt-4' onClick={handleSubmit}>Start coding now</button>
      </div>
      <div className='flex flex-col items-center w-full text-gray-400 mt-8 pb-4'>
        <p className='text-sm mb-4'>or continue with these social profile</p>
        <SocialLoginList />
        <p className='text-sm mt-4'>Already a member? <Link href={'/login'} className='text-blue-400'>Sign in</Link></p>
      </div>
      <Credits />
    </div>      
  </div>
    </div>
  )
}

export default page
