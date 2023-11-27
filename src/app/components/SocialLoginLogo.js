import Image from 'next/image'
import React from 'react'

const SocialLoginLogo = ({name}) => {
  return (
    <div className='w-11 h-11 relative'>
      <Image src={`./${name}.svg`} fill={true} alt={name}/>
    </div>
  )
}

export default SocialLoginLogo
