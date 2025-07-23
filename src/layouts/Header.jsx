import { Button } from '@/components/ui/button'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between m-5'>
      {/* Header Left */}
      <div>
        Logo
      </div>

      {/* Header Center  */}
      <div className='flex space-x-4'>
        <div>Home</div>
        <div>Predictor</div> 
        <div>About</div> 
      </div>

      {/* Header Right */}
      <div className='flex space-x-4'>
        <Button>Log In</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  )
}

export default Header