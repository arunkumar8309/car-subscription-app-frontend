import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiX, HiMenu } from "react-icons/hi";
import { FaHome, FaUsers, FaUser } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Default to collapsed state for mobile view

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-300 dark:bg-gray-900 p-4 transition-all duration-300 ${
        isOpen ? "w-[195px]" : "w-16"
      }`}
      style={{ overflowX: "hidden" }} // Ensures horizontal overflow is hidden
    >
      <div className="flex items-center justify-between mb-4">
        {/* Toggle button with inline styles */}
        <button
          onClick={toggleSidebar}
          style={{
            overflow: "visible", // Ensures icon is not clipped
            padding: "4px",      // Adds a bit of padding to avoid clipping
            margin: 0,           // Removes margin for better fit
          }}
        >
          {isOpen ? (
            <HiX size={24} className="text-gray-700 dark:text-white" />
          ) : (
            <HiMenu size={24} className="text-gray-700 dark:text-white" />
          )}
        </button>
        <h1
          className={`text-xl text-gray-700 dark:text-white transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Dashboard
        </h1>
      </div>
      <ul className="space-y-4 mt-8">
        <li className="flex items-center space-x-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700 dark:text-white"
              }`
            }
          >
            <FaHome size={24} className="text-gray-700 dark:text-white" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
          </NavLink>
        </li>
        <li className="flex items-center space-x-2">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700 dark:text-white"
              }`
            }
          >
            <FaUsers size={24} className="text-gray-700 dark:text-white" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Users</span>
          </NavLink>
        </li>
        <li className="flex items-center space-x-2">
          <NavLink
            to="/user"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700 dark:text-white"
              }`
            }
          >
            <FaUser size={24} className="text-gray-700 dark:text-white" />
            <span className={`${isOpen ? "block" : "hidden"}`}>User</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
