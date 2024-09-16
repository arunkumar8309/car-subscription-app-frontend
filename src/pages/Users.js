// src/pages/Users.js
import React, { useState } from 'react';
import SubscriptionTable from './../components/SubscriptionTable';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/`);
  };

  return (
    <div className="text-gray-900 dark:text-white w-[100%] flex item-center justify-center flex-col">
      {/* Go Back button (Top Right) */}
      <div className="absolute top-[80px] right-[85px] mb-[50px]">
        <button 
          onClick={handleBack}
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Home
        </button>
      </div>
      
      <SubscriptionTable />
  
    </div>
  );
};

export default Users;
