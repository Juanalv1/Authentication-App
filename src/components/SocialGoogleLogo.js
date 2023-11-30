import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const SocialGoogleLogo = ({name}) => {
  return (
    <div className='w-11 h-11 relative cursor-pointer' onClick={() => signIn(name, { callbackUrl: 'http://localhost:3000/profile' })}>
      <Image src='https://i.postimg.cc/7LkjkhXR/google.png' fill={true} alt='google'/>
    </div>
  )
}

export default SocialGoogleLogo
