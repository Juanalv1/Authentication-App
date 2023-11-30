import React from 'react'
import { useThemeContext } from '../app/context/theme'
import Credits from './Credits'

const PersonalInfo = ({user, isEditMenuOpen, setIsEditMenuOpen }) => {

  const handleclick = () => {
    isEditMenuOpen ? setIsEditMenuOpen(false) : setIsEditMenuOpen(true)
  }
  return (
    <div className='flex flex-col w-full justify-center items-center max-w-[840px] lg:mt-20'>
    <div className='flex flex-col w-full'>
      <div className='flex flex-col  w-full mx-auto text-center'>
        <h1 className=' text-2xl lg:text-3xl lg:mb-2'>Personal info</h1>
        <h2 className='text-[#828282] text-sm '>Basic info, like your name and photo</h2>
      </div>
     
    </div>
    <div className='flex flex-col w-full mt-8  lg:border border-gray-400 rounded-lg'>
     <div className='flex justify-between  lg:border-b border-gray-400 lg:mt-0 mt-10 lg:py-6'>
        <div className='flex flex-col w-[60%] pr-10 px-4'>
          <h2 className='text-xl mb-1'>Profile</h2>
          <p className='text-gray-400 text-xs'>Some info may be visible to other people
          </p>
        </div>
        <div className='w-[40%] flex justify-center lg:justify-end items-center lg:px-12'>      
            <button className='border border-gray-400 rounded-lg p-1.5 px-4 text-[#828282] font-medium lg:px-8' onClick={handleclick}>Edit</button>
        </div>
      </div>
        <div className='flex justify-between p-2 border-b border-b-gray-400 w-full px-4 py-4'>
          <div className='text-xs text-gray-400 items-center flex'>PHOTO</div>
          <div className=' flex items-center justify-center pr-6  lg:w-2/3 lg:justify-start'>
            {user.img ? (<img src={user.img} className='w-16 h-16 rounded'/>) : (<img src='./test-pic.png' className='w-16 h-16 rounded'/>)}
          </div>
        </div>
        <div className='flex p-2 py-4 border-b border-b-gray-400 w-full justify-between px-4'>
          <div className='w-1/3 text-xs text-gray-400 items-center  flex'>NAME</div>
          <div className='w-2/3 pr-6 text-end lg:justify-start lg:text-start'>
            {user.name ? (<span>{user.name}</span>) : (<span>Unknown</span>)}
          </div>
        </div>
        <div className='flex p-2 py-4 border-b border-b-gray-400 w-full justify-between px-4 '>
          <div className='w-1/3 text-xs text-gray-400 items-center  flex'>BIO</div>
          <div className='w-2/3 pr-6 text-end lg:justify-start lg:text-start'>
            {user.bio ? (<span>{user.bio}</span>) : (<span>Unknown</span>)}
            </div>
          </div>
        <div className='flex p-2 py-4 border-b border-b-gray-400 w-full justify-between px-4 '>
          <div className='w-1/3 text-xs text-gray-400 items-center  flex'>Phone</div>
          <div className='w-2/3 pr-6 text-end lg:justify-start lg:text-start'>
            {user.phone ? (<span>{user.phone}</span>) : (<span>Unknown</span>)}
          </div>
        </div>
        <div className='flex p-2 py-4 border-b border-b-gray-400 w-full justify-between px-4 '>
          <div className='w-1/3 text-xs text-gray-400 items-center  flex'>Email</div>
          <div className='w-2/3 pr-6 text-end lg:justify-start lg:text-start'>
            {user.email ? (<span>{user.email}</span>) : (<span>Unknown</span>)}
          </div>
        </div>
        <div className='flex p-2 py-4 border-b border-b-gray-400 w-full justify-between px-4 '>
          <div className='w-1/3 text-xs text-gray-400 items-center flex '>PASSWORD</div>
          <div className='w-2/3 pr-6 text-end lg:w-2/3 lg:justify-start lg:text-start'>************</div>
        </div>
    </div>
    <Credits />
  </div>
  )
}

export default PersonalInfo
