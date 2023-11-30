import React from 'react'
import SocialLoginLogo from './SocialLoginLogo'

const SocialLoginList = () => {
  return (
    <div className='flex gap-x-4'>
      <SocialLoginLogo name={'google'}/>
      <SocialLoginLogo name={'github'}/>
  </div>
  )
}

export default SocialLoginList
