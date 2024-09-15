import React from 'react';
import Switch from '@mui/material/Switch';

const Topbar = ({ toggleDarkMode }) => {
  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4 flex justify-between items-center w-full">
      <h1 className="text-2xl dark:text-white flex-1 text-center md:pl-4">Subscription Panel</h1>
      <div className="flex items-center">
        <span className="hidden md:block mr-2 text-gray-700 dark:text-white">Dark Mode</span>
        <Switch onChange={toggleDarkMode} />
      </div>
    </nav>
  );
};

export default Topbar;
