"use client"
import React, { useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import NavMenu from './NavMenu';

const NavProfile = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleclick = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
  }
  // console.log(user)
  return (
    <div className='flex px-2 gap-x-2 items-center relative cursor-pointer' onClick={handleclick}>
      {user?.img ? (<img src={user.img} className='w-6 h-6 rounded-lg'/>) : (<img src='./test-pic.png' className='w-6 h-6 rounded-lg'/>)}
      {user?.name ? (<p className='hidden md:flex'>{user.name}</p>) :(<p className='hidden lg:flex'>{user.email}</p>) }
      <IoMdArrowDropdown className='hidden lg:flex' />
      {isMenuOpen && (<NavMenu user={user}/>)}
      
    </div>
  )
}

export default NavProfile
