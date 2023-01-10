import React from 'react';

const Navbar = () => {
  return (
    <div className="text-white flex items-center justify-between ">
      <h2 className="text-4xl py-5 font-bold cursor-pointer">
        <a href="/">EM</a>
      </h2>
      <p className="cursor-pointer hover:border-b border-b-neon2">
        <a href="/login"> Log In</a>
      </p>
    </div>
  );
};

export default Navbar;
