import React from 'react'
import SocialLoginLogo from './SocialLoginLogo'

const SocialLoginList = () => {
  return (
    <div className='flex gap-x-4'>
      <SocialLoginLogo name={'Google'}/>
      <SocialLoginLogo name={'Facebook'}/>
      <SocialLoginLogo  name={'Twitter'}/>
      <SocialLoginLogo name={'Github'}/>
  </div>
  )
}

export default SocialLoginList
