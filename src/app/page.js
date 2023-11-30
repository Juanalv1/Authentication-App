'use client'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
useEffect

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/profile')
  }, [])
  
  return (
    <main className="w-full h-full ">
      <Navbar />
    </main>
  )

}
