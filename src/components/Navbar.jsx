import React from 'react';

const Navbar = ({ setIsAuth }) => {
  const logOut = () => {
    setIsAuth(false);
    localStorage.clear();
  };

  return (
    <div className="bg-body z-[1] flex text-center sticky top-0 items-center justify-between px-5 md:px-10 lg:px-20">
      <div className="text-white flex items-end justify-center py-2 gap-2">
        <h1 className="font-bold text-4xl">EM</h1>
        <h2 className="hidden md:block">Expense Manager</h2>
      </div>
      <nav>
        <ul className="text-white flex gap-5">
          {/* <li className="hover:border-b border-b-neon2 cursor-pointer ease-in-out duration-75">
            Dashboard
          </li>
          <li className="hover:border-b border-b-neon2 cursor-pointer ease-in-out duration-75">
            Account
          </li> */}
          <li
            onClick={logOut}
            className="hover:border-b border-b-neon2 cursor-pointer ease-in-out duration-75"
          >
            Log Out
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
