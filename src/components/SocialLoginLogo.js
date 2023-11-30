import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const SocialLoginLogo = ({name}) => {
  return (
    <div className='w-11 h-11 relative cursor-pointer' onClick={() => signIn(name, { callbackUrl: 'http://localhost:3000/profile' })}>
      <Image src={`./${name}.svg`} fill={true} alt={name}/>
    </div>
  )
}

export default SocialLoginLogo
