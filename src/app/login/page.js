"use client"
import { useEffect, useState } from 'react'
import React from 'react'
import { useForm } from 'react-hook-form'
import EmailInput from '../../components/EmailInput'
import PasswordInput from '../../components/PasswordInput'
import PrimaryBtn from '../../components/PrimaryBtn'
import SocialLoginList from '../../components/SocialLoginList'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Credits from '../../components/Credits'
import { getProviders, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'


const Login = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const { handleSubmit, formState: {errors}, register } = useForm()
  const onSubmit = async (data) => {
    console.log(data)
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })
    console.log(res)
    if(!res.ok) {
      setError(res.error)
    } else{
        router.push('/profile')
    }
  }
return (
  <div className='w-full min-h-screen flex justify-center items-center'>
    <div className='max-w-[470px] rounded-xl border border-gray-500 md:p-4'>
    <Navbar login={true}/>
    <div className='p-4'>
      <div className='text-primary w-full pr-4'>
        <h1 className='font-lg font-semibold text-lg ml-2'>Login</h1>
      </div>
      <div className='mt-6 w-full flex flex-col gap-y-3'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
          {error && (
          <div className='bg-red-500 text-white p-2 rounded'>
            {error}
          </div>)}
          {errors.email && (<span className='text-red-500 '>{errors.email.message}</span>)}
          <EmailInput errors={errors} register={register}/>
          {errors.password && (<span className='text-red-500 '>{errors.password.message}</span>)}
          <PasswordInput errors={errors} register={register}/>
          <button className='bg-blue-500 text-white w-full rounded-lg p-2 text-semibold mt-4'>Start coding now</button>
        </form>
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
export default Login
