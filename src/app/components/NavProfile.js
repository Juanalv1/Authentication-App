"use client"
import React, { useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import NavMenu from './NavMenu';

const NavProfile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleclick = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
  }
  return (
    <div className='flex px-2 gap-x-2 items-center relative'>
      <img src='./test-pic.png' className='w-6 h-6 rounded-lg'/>
      <p className='hidden lg:flex'>Xanthe Neal</p>
      <IoMdArrowDropdown className='hidden lg:flex' onClick={handleclick}/>
      {isMenuOpen && (<NavMenu />)}
      
    </div>
  )
}

export default NavProfile
