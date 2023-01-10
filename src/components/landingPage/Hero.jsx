import React from 'react';
import hero from '../../assets/hero.svg';

const Hero = () => {
  return (
    <div className="flex gap-5 lg:gap-0 flex-col lg:flex-row items-center justify-center my-10 h-[50rem]">
      <div className="w-full text-white">
        <h1 className="text-5xl lg:text-7xl font-bold w-full">
          Expense Manager
        </h1>
        <p className="text-2xl">
          Manage all your personal finances in one place
        </p>
        <a href="/login">
          <button className="bg-neon2 px-4 py-2 rounded-md my-4 font-bold text-2xl hover:bg-bg duration-150">
            Get Started
          </button>
        </a>
      </div>
      <img src={hero} alt="hero" className="w-full md:w-2/3 lg:w-1/2 filter" />
    </div>
  );
};

export default Hero;
