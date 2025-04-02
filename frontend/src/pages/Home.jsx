import React from 'react';

const Home = () => {
  return (
    <div
      id='home'
      className='text-white flex w-full min-h-screen justify-between items-center p-10 md:p-20 bg-fixed bg-cover bg-center'
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      <div className='md:w-2/4 md:pt-10 p-2 md:p-3 lg:p-6'>
        <h1 className='text-5xl md:text-6xl lg:text-8xl font-bold'>FlyHelp</h1>
        <p className='text-lg md:text-lg lg:text-2xl pt-4'>Predict flight delays using machine learning algorithms.</p>
      </div>
    </div>
  );
};

export default Home;
