import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const SocialGithubLogo = ({name}) => {
  return (
    <div className='w-11 h-11 relative cursor-pointer' onClick={() => signIn(name, { callbackUrl: 'http://localhost:3000/profile' })}>
      <img src='https://i.postimg.cc/vZ9Ckf79/github.png' alt='github'/>
    </div>
  )
}

export default SocialGithubLogo
