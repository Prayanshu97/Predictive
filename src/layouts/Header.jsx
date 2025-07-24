import { Button } from '@/components/ui/button'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between m-5 text-sm items-center'>
      {/* Header Left */}
      <div>
        Logo
      </div>

      {/* Header Center  */}
      <div className='flex justify-center space-x-5'>
        <div>Home</div>
        <div>Predictor</div> 
        <div>About</div> 
      </div>

      {/* Header Right */}
      <div className='flex space-x-4'>
        <Button className='bg-red-700 text-sm hover:bg-[#FF6B6B] hover:text-gray-200'>Log In</Button>
        <Button className='text-sm hover:bg-stone-700 hover:text-gray-200'>Sign Up</Button>
      </div>
    </div>
  )
}

export default Header