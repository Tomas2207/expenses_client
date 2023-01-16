import React from 'react';

const Navbar = () => {
  return (
    <div className="text-white flex items-center justify-between ">
      <h2 className="text-4xl my-5 p-1 font-bold cursor-pointer border-2 border-neon2">
        <a href="/">EM</a>
      </h2>
      <p className="text-xl cursor-pointer hover:border-b border-b-neon2">
        <a href="/login"> Log In</a>
      </p>
    </div>
  );
};

export default Navbar;
