import React from 'react';
import { AiFillPhone, AiOutlineClockCircle } from 'react-icons/ai';
import Logo from '/urban_logo.svg';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <nav className="bg-white flex justify-between items-center px-4 py-2 shadow-sm">
      <div className="flex items-center" style={{ fontSize: '1rem' }}>
        <Link to='/'>
          <img src={Logo} alt="Urban Logo" className="h-6" />
        </Link>
      </div>
      <div className="flex items-center">
        {/* Time Section */}
        <div className="hidden md:flex items-center mx-3">
          <AiOutlineClockCircle size={15} className="mr-2" />
          <p className="text-gray-700 mb-0" style={{ fontSize: '0.9rem' }}>8am - 9am</p>
        </div>
        {/* Phone Section */}
        <div className="hidden md:flex items-center mx-3">
          <AiFillPhone size={15} className="text-violet-800 mr-2" />
          <p className="text-gray-700 mb-0" style={{ fontSize: '0.9rem' }}>123-456-7890</p>
        </div>
        {/* Button */}
        <button className="bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm px-3 py-1 rounded">
          Get Amazed
        </button>
      </div>
    </nav>
  );
};

export default Topbar;
