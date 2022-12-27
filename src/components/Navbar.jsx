import React from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <div className="px-20 bg-blue-800 flex items-center">
      <img src={logo} alt="" className="bg-blue-300 rounded-full h-10 p-1" />
      <h1 className="font-bold text-white text-2xl p-2">Expense Manager</h1>
    </div>
  );
};

export default Navbar;
