import React from 'react';
import { useParams } from 'react-router-dom';

const Result = () => {
  const { userId } = useParams();
  return (
    <div className='flex flex-col items-center justify-center min-h-[40vh]'>
      <h1>Result Page</h1>
      <p>User ID: {userId}</p>
    </div>
  );
};

export default Result; 