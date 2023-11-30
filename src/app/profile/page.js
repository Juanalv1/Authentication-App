"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import PersonalInfo from '../../components/PersonalInfo'
import EditMenu from '../../components/EditMenu'
import { useThemeContext } from '../context/theme'
import { useSession } from "next-auth/react"
import { RiLogoutBoxRLine } from 'react-icons/ri'

const Profile = () => {
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false)

  const { data: session, status } = useSession()
  const [user, setUser] = useState({}
  )
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.user) {
          const res = await fetch(`/api/users/${session.user.email}`)
          const resJSON = await res.json()
          setUser(resJSON)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [session])



  return (
    <div className='flex flex-col w-full min-h-screen items-center'>
      <Navbar />

      {!isEditMenuOpen && (<PersonalInfo user={user} isEditMenuOpen={isEditMenuOpen} setIsEditMenuOpen={setIsEditMenuOpen}/>)}
      {isEditMenuOpen && (<EditMenu  isEditMenuOpen={isEditMenuOpen} setIsEditMenuOpen={setIsEditMenuOpen} user={user}/>)}

    </div>
  )
}

export default Profile
