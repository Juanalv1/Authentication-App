import React from 'react'
import Image from 'next/image'
import NavProfile from './NavProfile'

const Navbar = () => {
  
  return (
    <div className='flex w-full  p-4 justify-between items-center'>
      <div className='w-2/5 relative h-[18px] max-w-[130px]'>
        <Image src='./devchallenges-dark.svg' fill={true} alt='logo'/>
      </div>
        <NavProfile />
    </div>
  )
}

export default Navbar
