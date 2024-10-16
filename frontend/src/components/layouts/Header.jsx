import React from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const Header = () => {

  return (
    <header>
      <NavBar/>
      <nav className="flex flex-col md:flex-row items-center justify-between py-4 relative z-10 px-6 bg-white shadow-md">

        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Link to="/" className="inline-block">
            <img
              width="100px"
              height="50px"
              src="/u-r-header-logo-transparent.svg"
              alt="Urban Resource Logo"
            />
          </Link>
        </div>

        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Search />
        </div>

        <div className="w-full md:w-1/3 flex items-center justify-center md:justify-end space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </Link>
          <div className="flex items-center space-x-1">
            <span id="cart" className="cursor-pointer">
              Cart
            </span>
            <span id="cart_count" className="text-sm bg-gray-200 rounded-full px-2 py-1">
              2
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
