import Link from 'next/link';
import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FaUserGroup } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";

const NavMenu = () => {
  return (
    <div className='absolute rounded-lg border border-gray-400  flex flex-col p-3 top-10 right-2 gap-y-2 w-40'>
      <Link href={'/profile'}>
       <div className='p-1 flex items-center gap-x-2'>
        <CgProfile className='w-4 h-4'/> <span>My Profile</span>
       </div>
       </Link>
       <div className='p-1 flex items-center gap-x-2'>
        <FaUserGroup className='w-4 h-4'/> <span className='flex '>Group Chat</span>
       </div>
       <div className='p-1 py-2 pt-4 flex border-t border-gray-400 text-red-600 items-center gap-x-2'>
        <RiLogoutBoxRLine className='w-4 h-4'/> <span>Logout</span>
       </div>
    </div>
  )
}

export default NavMenu
