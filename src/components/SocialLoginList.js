import React from 'react'
import SocialGithubLogo from './SocialGithubLogo'
import SocialGoogleLogo from './SocialGoogleLogo'

const SocialLoginList = () => {
  return (
    <div className='flex gap-x-4'>
      <SocialGoogleLogo name={'google'}/>
      <SocialGithubLogo name={'github'}/>
  </div>
  )
}

export default SocialLoginList
