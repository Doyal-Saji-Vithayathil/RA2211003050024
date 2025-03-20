import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Social Media Analytics</h1>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
            }
          >
            Top Users
          </NavLink>
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
            }
          >
            Trending Posts
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
            }
          >
            Feed
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;