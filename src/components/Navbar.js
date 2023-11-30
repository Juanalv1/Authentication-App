"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import NavProfile from './NavProfile'
import { useSession, signIn} from "next-auth/react"

const Navbar = ({login}) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState({}
  )
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.user) {
          const res = await fetch(`/api/users/${session.user.email}`)
          const resJSON = await res.json()
          // console.log(resJSON)
          setUser(resJSON)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [session])


  // console.log(session)
  
  return (
    <div className='flex w-full  p-4 justify-between items-center'>
      <div className='w-2/5 relative h-[18px] max-w-[130px]'>
        <Image src='./devchallenges-dark.svg' fill={true} alt='logo'/>
      </div>
      {!login && session?.user && (<NavProfile user={user} />)}
      {!login && !session?.user && (<button onClick={() => signIn()} className='px-1 py-2 rounded '>Sign In</button>)}
    </div>
  )
}

export default Navbar
