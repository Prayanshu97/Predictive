import React from 'react';
import { Button } from '@/components/ui/button';

const Home = () => (
  <div className='bg-[#FF6B6B] px-60'>

    <div className="py-40 flex w-full h-screen gap-12">
      
      {/* Text Section */}
      <div className="bg-white flex-1 flex flex-col items-center text-center justify-center gap-8">
          <div>An AI Powered Health App</div>
          <div>Revolutionizing Healthcare: Comprehensive, Rapid AI Diagnostic App for Accurate Multi-Disease Detection, Prevention with Mental Health Support chatbot.</div>
          <Button className="w-1/2"> Diagnose Now </Button>
      </div>

      {/* Image Section */}
      <div className='bg-white flex-1 flex items-center justify-center p-4'>
        <img
          className=""
          src="/your-image-path.png" // Replace with actual path or import
          alt="Health app blocks"
        />
      </div>
    </div>

    {/* Detail section  */}
    <div className=''>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus quod asperiores ipsa incidunt ad repudiandae quis cupiditate consequuntur quas totam doloribus laudantium recusandae consectetur quos natus quidem modi saepe, soluta iste doloremque? Perferendis perspiciatis ipsum quisquam reiciendis necessitatibus consequatur! Ad laudantium illum maxime veniam, voluptatem dolorum aperiam impedit modi placeat eos? Velit laudantium debitis doloremque id nulla labore iste, maiores aliquid iure nostrum fuga nam qui ea ducimus officia, accusantium inventore iusto eaque, esse laboriosam. Voluptatem quas porro totam aliquid eum officia itaque autem dicta! Labore aspernatur laboriosam animi quia nam et maiores quidem molestias libero tempore. Voluptatem eos iusto nam rerum incidunt illo, beatae non fugit temporibus cupiditate voluptas est quisquam maxime accusantium sint blanditiis magni ullam numquam voluptatum suscipit nihil? Odit commodi, placeat saepe totam cum mollitia minus quo accusantium consequatur eveniet expedita corporis ea, sint pariatur in magni sit quis reiciendis fugit. Similique esse itaque asperiores voluptatibus?
    </div>

    {/* Features Section */}
    <div className='p-20 flex items-center justify-center gap-8'>
      <img
          src="/your-image-path.png" // Replace with actual path or import
          alt="Health app blocks"
          className=""
        />
        <img
          src="/your-image-path.png" // Replace with actual path or import
          alt="Health app blocks"
          className=""
        />
        <img
          src="/your-image-path.png" // Replace with actual path or import
          alt="Health app blocks"
          className=""
        />
        <img
          src="/your-image-path.png" // Replace with actual path or import
          alt="Health app blocks"
          className=""
        />
    </div>
  </div>
);

export default Home; 