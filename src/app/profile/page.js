"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import PersonalInfo from '../components/PersonalInfo'
import EditMenu from '../components/EditMenu'
import { useThemeContext } from '../context/theme'

const profile = () => {
const {isEditMenuOpen} = useThemeContext()


  return (
    <div className='flex flex-col w-full min-h-screen items-center'>
      <Navbar />
      {!isEditMenuOpen && (<PersonalInfo />)}
      {isEditMenuOpen && (<EditMenu />)}

    </div>
  )
}

export default profile
