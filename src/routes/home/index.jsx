import React from 'react';
import { Button } from '@/components/ui/button';
import PanToolIcon from '@mui/icons-material/PanTool';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleDiagnoseNow = () => {
    const infoPath = `/${user ? user.id : userId || 'me'}/info`;
    if (isSignedIn && user) {
      navigate(infoPath);
    } else {
      navigate(`/sign-in?redirect_url=${encodeURIComponent(infoPath)}`);
    }
  };

  return (
    <div className='bg-[#FF6B6B] px-60'>
      <div className="py-40 flex w-full h-screen gap-12 justify-between">
        {/* Text Section */}
        <div className="flex-1 flex flex-col items-center text-center justify-center gap-8">
          <div className='text-gray-50'>An AI Powered Health App</div>
          <div className='text-gray-50 text-xs ml-auto'>Revolutionizing Healthcare: Comprehensive, Rapid AI Diagnostic App for Accurate Multi-Disease Detection, Prevention with Mental Health Support chatbot.</div>
          <Button className="w-1/2 bg-red-700" onClick={handleDiagnoseNow}> Diagnose Now </Button>
        </div>

        {/* Image Section */}
        <div className='flex-1 flex items-center justify-center p-4 rounded-lg shadow-lg bg-red-300'>
          <img
            className="rounded-lg"
            src="https://as1.ftcdn.net/v2/jpg/02/68/84/80/1000_F_268848009_j3m4yVKfh3MDdFLynVa8b9G2u7LN0ilZ.jpg" // Replace with actual path or import
            alt="Health app blocks"
          />
        </div>
      </div>

      {/* Detail section  */}
      <div className=''>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus quod asperiores ipsa incidunt ad repudiandae quis cupiditate consequuntur quas totam doloribus laudantium recusandae consectetur quos natus quidem modi saepe, soluta iste doloremque? Perferendis perspiciatis ipsum quisquam reiciendis necessitatibus consequatur! Ad laudantium illum maxime veniam, voluptatem dolorum aperiam impedit modi placeat eos? Velit laudantium debitis doloremque id nulla labore iste, maiores aliquid iure nostrum fuga nam qui ea ducimus officia, accusantium inventore iusto eaque, esse laboriosam. Voluptatem quas porro totam aliquid eum officia itaque autem dicta! Labore aspernatur laboriosam animi quia nam et maiores quidem molestias libero tempore. Voluptatem eos iusto nam rerum incidunt illo, beatae non fugit temporibus cupiditate voluptas est quisquam maxime accusantium sint blanditiis magni ullam numquam voluptatum suscipit nihil? Odit commodi, placeat saepe totam cum mollitia minus quo accusantium consequatur eveniet expedita corporis ea, sint pariatur in magni sit quis reiciendis fugit. Similique esse itaque asperiores voluptatibus?
      </div>

      {/* Features Section */}
      <div className='py-20 flex items-center justify-evenly gap-8'>
        <div className='flex flex-col bg-gray-100 p-10 rounded-lg justify-evenly items-center'>Precaution<PanToolIcon fontSize='large' ></PanToolIcon></div>
        <div className='flex flex-col bg-gray-100 p-10 rounded-lg justify-evenly items-center'>Remedies<VaccinesIcon fontSize='large' ></VaccinesIcon></div>
        <div className='flex flex-col bg-gray-100 p-10 rounded-lg justify-evenly items-center'>Exercise<DirectionsRunIcon fontSize='large'></DirectionsRunIcon></div>
        <div className='flex flex-col bg-gray-100 p-10 rounded-lg justify-evenly items-center'>Diet<RestaurantMenuIcon fontSize='large'></RestaurantMenuIcon></div>
      </div>
    </div>
  );
};

export default Home; 