import React from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // If you use a custom Button

function Header() {
  return (
    <div className='flex justify-between items-center m-5 text-sm'>
      {/* Header Left */}
      <div>Logo</div>

      {/* Header Center */}
      <div className='flex justify-center space-x-5 text-sm ml-40'>
        <Link to="/">
          <div className="cursor-pointer">Home</div>
        </Link>
        <div>Predictor</div>
        <div>About</div>
      </div>

      {/* Header Right */}
      <div className='flex space-x-4'>
        <SignedOut>
          <Link to="/sign-in">
            <Button className='bg-red-700 text-sm hover:bg-[#FF6B6B] hover:text-gray-200'>Log In</Button>
          </Link>
          <Link to="/sign-up">
            <Button className='text-sm hover:bg-stone-700 hover:text-gray-200'>Sign Up</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;