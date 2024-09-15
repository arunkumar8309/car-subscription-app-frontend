import React from 'react';
import UserScheduleView from './../components/UserScheduleView';
import CalendarView from './../components/CalendarView';
import {useNavigate } from 'react-router-dom';


const User = () => {
  const navigate = useNavigate();
  const handleBack = (id) => {
    navigate('/users');   
  };
  return (
    <div className="text-gray-900 dark:text-white">
      <div className="absolute top-[80px] right-[85px] mb-[50px]">
          <button 
            onClick={() => handleBack()}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
             List View
          </button>
        </div>
      <CalendarView/>
      <UserScheduleView/>
    </div>
  );
};

export default User;
