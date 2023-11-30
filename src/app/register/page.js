"use client"
import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import SocialLoginLogo from '../../components/SocialGithubLogo';
import Link from 'next/link';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import PrimaryBtn from '../../components/PrimaryBtn';
import SocialLoginList from '../../components/SocialLoginList';
import Credits from '../../components/Credits';
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'



const Register = () => {
  const router = useRouter()
  const { handleSubmit, formState: {errors}, register } = useForm()
  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/users', {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'Application/json'
        }
       })
       if (res.ok) {
        console.log(res)
        router.push('/login')
       }

    } catch (error) {
      console.error(error)
    }
   
  }
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
    <div className='max-w-[470px] rounded-xl border border-gray-500 md:p-4'>
    <Navbar login={true}/>
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
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
          {errors.email && (<span className='text-red-500 '>{errors.email.message}</span>)}
          <EmailInput errors={errors} register={register}/>
          {errors.password && (<span className='text-red-500 '>{errors.password.message}</span>)}
          <PasswordInput errors={errors} register={register}/>
          <button className='bg-blue-500 text-white w-full rounded-lg p-2 text-semibold mt-4'>Start coding now</button>
        </form>
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

export default Register
