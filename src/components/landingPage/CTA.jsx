import React from 'react';

const CTA = () => {
  return (
    <div className="bg-neon2 px-2 md:p-4 self-center md:2/3 lg:w-1/2 rounded-md h-[15rem] flex flex-col items-center justify-center text-center">
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
        Start using Expense Manager!
      </h2>
      <p className="text-md sm:text-lg md:text-xl text-bg">
        And make tracking your finances easy.
      </p>

      <a href="/login">
        <button className="bg-bg px-4 py-1 md:py-2 rounded-md my-4 font-bold text-xl md:text-2xl w-52 hover:brightness-150 duration-150">
          Get Started
        </button>
      </a>
    </div>
  );
};

export default CTA;
