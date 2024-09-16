import React from 'react';
import Subscripation from './../components/SubscriptionForm'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/users`);    
  };

  return (
    <div className="text-gray-900 dark:text-white">
         <div className="absolute top-[80px] right-[85px] mb-[50px]">
          <button 
            onClick={() => handleBack()}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
             Subscription List View
          </button>
        </div>
      <Subscripation/>
    </div>
  );
};

export default Home;
