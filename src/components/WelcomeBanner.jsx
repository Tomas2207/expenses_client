import React from 'react';
import welcome from '../assets/welcome.png';

const WelcomeBanner = () => {
  return (
    <div className="px-20">
      <div className="text-2xl flex font-bold text-bg px-6 py-8 my-4 bg-blue-300 w-1/3 rounded-xl h-28 relative">
        <h1>Good Morning, Tomas</h1>
        <img
          src={welcome}
          alt=""
          className="h-[12rem] absolute -top-10 right-0"
        />
      </div>
    </div>
  );
};

export default WelcomeBanner;
